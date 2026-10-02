import { motion, spring } from './motion-tokens.js';

const preference = () => matchMedia('(prefers-reduced-motion: reduce)');

/** Run once on entry. Return and call the cleanup on unmount. */
export function enter(element) {
  const media = preference();
  if (media.matches || !element.animate) return () => {};
  const styles = getComputedStyle(element);
  const value = name => styles.getPropertyValue(`--qo-motion-${name}`).trim() || motion[name];
  const duration = value('enter');
  const milliseconds = parseFloat(duration) * (duration.endsWith('ms') ? 1 : 1000);
  const animation = element.animate(
    [{ opacity: 0, transform: `translateY(${value('distance')})` }, { opacity: 1, transform: 'translateY(0)' }],
    { duration: milliseconds, easing: value('ease') },
  );
  const stop = () => animation.cancel();
  media.addEventListener('change', stop);
  animation.finished.catch(() => {}).finally(() => media.removeEventListener('change', stop));
  return () => { stop(); media.removeEventListener('change', stop); };
}

/** Enhance native horizontal scrolling; card widths may vary. */
export function mountShelf(root) {
  const track = root.querySelector('[data-qo-track]');
  const prev = root.querySelector('[data-qo-prev]');
  const next = root.querySelector('[data-qo-next]');
  const position = root.querySelector('[data-qo-position]');
  if (!track || !prev || !next) throw new Error('Quiet Orbit shelf is missing its track or controls.');

  const controller = new AbortController();
  const { signal } = controller;
  let announceTimer;
  const targets = () => {
    const left = track.getBoundingClientRect().left;
    const padding = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    return [...track.children].map(card => card.getBoundingClientRect().left - left + track.scrollLeft - padding);
  };
  const index = values => values.reduce((nearest, value, i) =>
    Math.abs(value - track.scrollLeft) < Math.abs(values[nearest] - track.scrollLeft) ? i : nearest, 0);
  function update() {
    const values = targets();
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    const controls = root.querySelector('.qo-shelf-controls');
    if (controls) controls.hidden = !values.length;
    clearTimeout(announceTimer);
    announceTimer = setTimeout(() => {
      if (position) position.textContent = values.length ? `${index(values) + 1} / ${values.length}` : '';
    }, 120);
  }
  function move(direction) {
    const values = targets();
    if (!values.length) return;
    const target = Math.max(0, Math.min(values.length - 1, index(values) + direction));
    track.scrollTo({ left: values[target], behavior: preference().matches ? 'instant' : 'smooth' });
  }
  prev.addEventListener('click', () => move(-1), { signal });
  next.addEventListener('click', () => move(1), { signal });
  track.addEventListener('scroll', update, { signal, passive: true });
  track.addEventListener('keydown', event => {
    if (event.target !== track || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    move(event.key === 'ArrowRight' ? 1 : -1);
  }, { signal });
  const resize = new ResizeObserver(update);
  resize.observe(track);
  const mutation = new MutationObserver(update);
  mutation.observe(track, { childList: true });
  update();
  return () => {
    controller.abort(); resize.disconnect(); mutation.disconnect(); clearTimeout(announceTimer);
  };
}

/** A short textual note. For menus/dialogs, use the host app's appropriate primitive. */
export function mountPopover(trigger, panel) {
  const wrapper = trigger.parentElement;
  const controller = new AbortController();
  const { signal } = controller;
  let pinned = false;
  let closeTimer;
  function setOpen(open) {
    clearTimeout(closeTimer);
    panel.hidden = !open;
    trigger.setAttribute('aria-expanded', String(open));
    if (open) {
      panel.style.marginLeft = '0px';
      const rect = panel.getBoundingClientRect();
      const shift = rect.left < 16 ? 16 - rect.left : Math.min(0, innerWidth - rect.right - 16);
      panel.style.marginLeft = `${shift}px`;
    }
  }
  trigger.addEventListener('click', () => { pinned = !pinned; setOpen(pinned); }, { signal });
  wrapper.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') setOpen(true); }, { signal });
  wrapper.addEventListener('pointerleave', () => {
    if (!pinned) closeTimer = setTimeout(() => setOpen(false), 150);
  }, { signal });
  document.addEventListener('pointerdown', event => {
    if (!wrapper.contains(event.target)) { pinned = false; setOpen(false); }
  }, { signal });
  wrapper.addEventListener('focusout', event => {
    if (!wrapper.contains(event.relatedTarget)) { pinned = false; setOpen(false); }
  }, { signal });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) {
      pinned = false; setOpen(false); trigger.focus({ preventScroll: true });
    }
  }, { signal });
  window.addEventListener('resize', () => { if (!panel.hidden) setOpen(true); }, { signal });
  return () => { controller.abort(); clearTimeout(closeTimer); setOpen(false); };
}

/** The element's parent must be positioned. This helper owns the element's transform. */
export function mountDraggable(element, { returnOnRelease = true, onChange } = {}) {
  const controller = new AbortController();
  const { signal } = controller;
  const media = preference();
  let x = 0, y = 0, vx = 0, vy = 0, frame = 0, last = 0, pointer = null;
  const originalTransform = element.style.transform;
  function apply() {
    element.style.transform = `translate(${x}px, ${y}px)`;
    onChange?.({ x, y });
  }
  function bound(nx, ny) {
    const parent = element.parentElement.getBoundingClientRect();
    const rect = element.getBoundingClientRect();
    const originX = rect.left - x, originY = rect.top - y;
    x = Math.max(parent.left - originX, Math.min(parent.right - originX - rect.width, nx));
    y = Math.max(parent.top - originY, Math.min(parent.bottom - originY - rect.height, ny));
    apply();
  }
  function finish() {
    cancelAnimationFrame(frame); frame = 0;
    x = y = vx = vy = 0; apply();
  }
  function tick(now) {
    const dt = Math.min((now - last) / 1000 || .016, .032);
    last = now;
    vx += (-spring.stiffness * x - spring.damping * vx) / spring.mass * dt;
    vy += (-spring.stiffness * y - spring.damping * vy) / spring.mass * dt;
    x += vx * dt; y += vy * dt;
    apply();
    if (Math.hypot(x, y) < spring.restDistance && Math.hypot(vx, vy) < spring.restSpeed) finish();
    else frame = requestAnimationFrame(tick);
  }
  function reset() {
    cancelAnimationFrame(frame); frame = 0; pointer = null;
    if (media.matches || document.hidden) finish();
    else { last = performance.now(); frame = requestAnimationFrame(tick); }
  }
  element.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    event.preventDefault(); cancelAnimationFrame(frame); frame = 0; vx = vy = 0;
    element.focus({ preventScroll: true });
    pointer = { x: event.clientX - x, y: event.clientY - y };
    element.setPointerCapture(event.pointerId);
  }, { signal });
  element.addEventListener('pointermove', event => {
    if (pointer) bound(event.clientX - pointer.x, event.clientY - pointer.y);
  }, { signal });
  const release = () => {
    if (!pointer) return;
    pointer = null;
    if (returnOnRelease) reset();
  };
  for (const event of ['pointerup', 'pointercancel', 'lostpointercapture']) element.addEventListener(event, release, { signal });
  element.addEventListener('keydown', event => {
    const shift = { ArrowLeft: [-12, 0], ArrowRight: [12, 0], ArrowUp: [0, -12], ArrowDown: [0, 12] }[event.key];
    if (shift) {
      event.preventDefault(); cancelAnimationFrame(frame); frame = 0; vx = vy = 0;
      bound(x + shift[0], y + shift[1]);
    }
    if (event.key === 'Escape' || event.key === 'Home') { event.preventDefault(); reset(); }
  }, { signal });
  element.addEventListener('blur', () => { if (returnOnRelease) reset(); }, { signal });
  media.addEventListener('change', () => { if (frame && media.matches) finish(); }, { signal });
  document.addEventListener('visibilitychange', () => { if (frame && document.hidden) finish(); }, { signal });
  return () => { controller.abort(); cancelAnimationFrame(frame); element.style.transform = originalTransform; };
}
