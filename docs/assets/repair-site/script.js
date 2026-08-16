(() => {
  const menuButton = document.querySelector('[data-menu-button]');
  const navigation = document.querySelector('[data-navigation]');

  if (menuButton && navigation) {
    const closeMenu = ({ restoreFocus = false } = {}) => {
      menuButton.setAttribute('aria-expanded', 'false');
      navigation.removeAttribute('data-open');
      if (restoreFocus) menuButton.focus();
    };

    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        menuButton.setAttribute('aria-expanded', 'true');
        navigation.setAttribute('data-open', '');
      }
    });

    navigation.addEventListener('click', (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navigation.hasAttribute('data-open')) {
        closeMenu({ restoreFocus: true });
      }
    });
  }

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
})();
