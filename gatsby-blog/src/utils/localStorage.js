export function getValueFromLocalStorage(key) {
  if (typeof window === 'undefined') return;
  try { return JSON.parse(window.localStorage.getItem(key)); } catch { return null; }
}

export function setValueToLocalStorage(key, value) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
  if (key === 'isDarkMode') {
    window.dispatchEvent(new Event("theme"));
  }
}
