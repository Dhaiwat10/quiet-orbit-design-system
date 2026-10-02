import { enter, mountShelf, mountPopover, mountDraggable } from '../js/motion.js';

const cleanups = [];
document.querySelectorAll('[data-qo-shelf]').forEach(root => cleanups.push(mountShelf(root)));
document.querySelectorAll('[data-qo-popover]').forEach(trigger => {
  cleanups.push(mountPopover(trigger, document.getElementById(trigger.getAttribute('aria-controls'))));
});
document.querySelectorAll('[data-qo-drag]').forEach(element => cleanups.push(mountDraggable(element)));

let cancelEntrance = () => {};
document.querySelectorAll('[data-replay]').forEach(button => button.addEventListener('click', () => {
  cancelEntrance(); cancelEntrance = enter(document.getElementById(button.dataset.replay));
}));
const previewForm = document.querySelector('[data-preview-form]');
previewForm?.addEventListener('submit', event => {
  event.preventDefault();
  const value = new FormData(previewForm).get('thought').trim();
  previewForm.querySelector('[data-preview-status]').textContent = value ? `A thought kept in this preview: “${value}”` : 'Add a thought first.';
});
previewForm?.addEventListener('reset', () => { previewForm.querySelector('[data-preview-status]').textContent = ''; });

const noteForm = document.querySelector('[data-note-form]');
noteForm?.addEventListener('submit', event => {
  event.preventDefault();
  const value = new FormData(noteForm).get('note').trim();
  if (!value) return;
  const li = document.createElement('li'); li.textContent = value;
  document.querySelector('[data-notes]').append(li);
  cancelEntrance(); cancelEntrance = enter(li);
  noteForm.reset();
  noteForm.querySelector('[data-note-status]').textContent = 'Added to loose ends in this preview.';
});
// pagehide cleans up when navigating away. BFCache restores require a fresh mount.
window.addEventListener('pagehide', () => { cancelEntrance(); cleanups.forEach(fn => fn()); });
window.addEventListener('pageshow', event => { if (event.persisted) location.reload(); });
