document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const email = form.querySelector('input[name="email_address"]').value;
    const btn   = form.querySelector('button');
    btn.textContent = '…';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email_address=${encodeURIComponent(email)}`,
      });
      if (res.ok) {
        form.closest('.newsletter-inner').innerHTML =
          '<span class="newsletter-success">Almost there — check your inbox to confirm.</span>';
      } else {
        btn.textContent = 'Subscribe';
        btn.disabled = false;
      }
    } catch {
      form.submit();
    }
  });
});
