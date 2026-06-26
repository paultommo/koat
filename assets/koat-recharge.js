(function () {
  var STYLES = [
    '.rc-purchase-option.rc-purchase-option__subscription {',
    '  background-color: #0000ff !important;',
    '  color: #fff !important;',
    '}',
    '.rc-purchase-option.rc-purchase-option__subscription * {',
    '  color: #fff !important;',
    '}',
    'button,',
    '[class*="rc-btn"],',
    '[class*="rc-button"],',
    '[type="submit"] {',
    '  background: #ffcc00 !important;',
    '  color: #181818 !important;',
    '  border: 2px solid #181818 !important;',
    '  border-radius: 999px !important;',
    '  box-shadow: 3px 3px 0 #181818 !important;',
    '  font-family: "Hanken Grotesk", sans-serif !important;',
    '  font-weight: 700 !important;',
    '}'
  ].join('\n');

  function injectStyles(root) {
    var existing = root.querySelector('#koat-rc-styles');
    if (existing) { existing.textContent = STYLES; return; }
    var style = document.createElement('style');
    style.id = 'koat-rc-styles';
    style.textContent = STYLES;
    root.appendChild(style);
  }

  function attachToWidget(widget) {
    var root = widget.shadowRoot;
    if (!root) return;
    injectStyles(root);
    new MutationObserver(function () {
      injectStyles(root);
    }).observe(root, { childList: true, subtree: false });
  }

  function findAndAttach() {
    var widgets = document.querySelectorAll('recharge-subscription-widget');
    widgets.forEach(attachToWidget);
    return widgets.length > 0;
  }

  var attempts = 0;
  function poll() {
    if (findAndAttach()) return;
    if (attempts++ < 40) setTimeout(poll, 250);
  }

  new MutationObserver(function () {
    findAndAttach();
  }).observe(document.body, { childList: true, subtree: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', poll);
  } else {
    poll();
  }
})();
