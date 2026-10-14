// Formulář: demo režim neodesílá nic, ostrý režim posílá na endpoint ze site.json (data-endpoint).
(function () {
  document.querySelectorAll('form.formular').forEach(function (f) {
    var stav = f.querySelector('.formular-stav');
    f.addEventListener('submit', function (e) {
      var endpoint = f.getAttribute('data-endpoint');
      var demo = f.getAttribute('data-demo') === '1';
      if (f.querySelector('.past input').value) { e.preventDefault(); return; }   // robot
      if (demo || !endpoint) {
        e.preventDefault();
        stav.textContent = 'Form preview: nothing is sent. After launch your request will arrive at order@cibitrans.eu.';
        return;
      }
      e.preventDefault();
      stav.textContent = 'Sending…';
      fetch(endpoint, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); f.reset(); stav.textContent = 'Thank you, your request was sent.'; })
        .catch(function () { stav.textContent = 'Sending failed. Please write to us by e-mail.'; });
    });
  });
})();

// Tlačítko „Request this“ předvybere službu ve formuláři.
document.querySelectorAll('[data-sluzba]').forEach(function (a) {
  a.addEventListener('click', function () {
    var sel = document.getElementById('f-sluzba');
    if (sel) sel.value = a.getAttribute('data-sluzba');
  });
});
