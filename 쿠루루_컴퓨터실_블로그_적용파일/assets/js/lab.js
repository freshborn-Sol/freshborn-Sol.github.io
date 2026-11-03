const menu = document.querySelector('.menu-toggle');
menu?.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(expanded));
  menu.textContent = expanded ? '메뉴 닫기' : '메뉴 열기';
  document.querySelector('.sidebar')?.classList.toggle('is-open', expanded);
});
