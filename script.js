/**
 * TAMILARASAN KS — Identity Portfolio Interactions
 * Smooth Scroll, Scrollspy, Clipboard Actions, Subtle Reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initClipboard();
  initScrollspy();
});

function initNavbar() {
  const nav = document.querySelector('.editorial-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  });
}

function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 160;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

function initClipboard() {
  const copyElements = document.querySelectorAll('[data-copy]');
  copyElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const text = el.getAttribute('data-copy');
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          showEditorialToast(`Copied to clipboard: ${text}`);
        }).catch(() => {
          showEditorialToast(`${text}`);
        });
      }
    });
  });
}

function showEditorialToast(message) {
  let toast = document.getElementById('editorialToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'editorialToast';
    toast.className = 'editorial-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span style="color: #e59f24;">✦</span> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
