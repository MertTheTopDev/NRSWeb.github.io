(function () {
  const header = document.querySelector('[data-header]');
  const nav = document.querySelector('[data-nav]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const year = document.querySelector('[data-year]');
  const filterButtons = document.querySelectorAll('[data-filter]');
  const appCards = document.querySelectorAll('.app-card');
  const videoCards = document.querySelectorAll('[data-youtube-id]');
  const appIcons = document.querySelectorAll('.app-card__icon img');

  if (year) year.textContent = new Date().getFullYear();

  function setNavigationState(isOpen) {
    navToggle?.setAttribute('aria-expanded', String(isOpen));
    navToggle?.classList.toggle('is-active', isOpen);
    nav?.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
  }

  function closeNavigation() {
    setNavigationState(false);
  }

  navToggle?.addEventListener('click', (event) => {
    event.stopPropagation();
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    setNavigationState(!isExpanded);
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNavigation);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNavigation();
  });

  document.addEventListener('click', (event) => {
    if (!document.body.classList.contains('nav-open')) return;
    if (nav?.contains(event.target) || navToggle?.contains(event.target)) return;
    closeNavigation();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) closeNavigation();
  });

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter || 'all';

      filterButtons.forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');

      appCards.forEach((card) => {
        const categories = card.dataset.category || '';
        const shouldShow = filter === 'all' || categories.split(/\s+/).includes(filter);
        card.hidden = !shouldShow;
      });
    });
  });

  function markIconAsFallback(img) {
    const holder = img.closest('.app-card__icon');
    if (!holder) return;
    holder.classList.add('is-fallback');
    img.remove();
  }

  appIcons.forEach((img) => {
    img.addEventListener('error', () => markIconAsFallback(img), { once: true });

    if (img.complete && img.naturalWidth === 0) {
      markIconAsFallback(img);
    }
  });

  videoCards.forEach((card) => {
    const videoId = (card.dataset.youtubeId || '').trim();
    const thumb = card.querySelector('.video-card__thumb');
    const fallback = card.querySelector('.video-card__fallback');

    if (!thumb) return;
    if (!videoId) {
      if (fallback) fallback.textContent = 'Add YouTube ID';
      return;
    }

    const youtubeUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
    const imageUrl = `https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg`;

    thumb.href = youtubeUrl;
    thumb.setAttribute('aria-label', `Watch ${card.querySelector('h3')?.textContent || 'video'} on YouTube`);
    thumb.style.backgroundImage = `linear-gradient(180deg, rgba(7, 10, 18, 0.02), rgba(7, 10, 18, 0.48)), url('${imageUrl}')`;
    thumb.classList.add('has-thumbnail');

    if (fallback) {
      fallback.textContent = 'Watch on YouTube';
    }
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();
