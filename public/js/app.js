
(() => {
  // Cookie consent
  const KEY = 'consent_v1';
  const banner = document.getElementById('cookie-banner');
  const stored = localStorage.getItem(KEY);
  if (!stored) banner.hidden = false;

  banner?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-consent]');
    if (!btn) return;
    const action = btn.getAttribute('data-consent');
    if (action === 'accept')
      localStorage.setItem(
        KEY,
        JSON.stringify({
          essential: true,
          analytics: true,
          marketing: true,
          ts: Date.now(),
        })
      );
    if (action === 'reject')
      localStorage.setItem(
        KEY,
        JSON.stringify({
          essential: true,
          analytics: false,
          marketing: false,
          ts: Date.now(),
        })
      );
    if (action === 'manage') {
      alert('Only essential cookies are used on this site.');
      return;
    }
    banner.hidden = true;
  });

  // Minimal carousel
  const carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const slides = track.children;
    let index = 0;
    const setIndex = (i) => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
    };
    carousel
      .querySelector('[data-prev]')
      ?.addEventListener('click', () => setIndex(index - 1));
    carousel
      .querySelector('[data-next]')
      ?.addEventListener('click', () => setIndex(index + 1));
  });

  // Mailchimp inline confirmation via hidden iframe
  const form = document.getElementById('mc-form');
  const statusEl = document.getElementById('mc-status');
  let submitted = false;
  form?.addEventListener('submit', () => {
    submitted = true;
    statusEl.hidden = false;
    statusEl.textContent = 'Submitting…';
  });
  // When the hidden iframe loads after submission, show a success.
  window.addEventListener('load', () => {
    const iframe = document.getElementsByName('mc-embedded-subscribe')[0];
    iframe?.addEventListener('load', () => {
      if (!submitted) return;
      statusEl.textContent =
        'Thanks! Please check your email to confirm subscription.';
      submitted = false;
    });
  });
})();
