(function () {
  var MAX_ATTEMPTS = 30;
  var INTERVAL = 200;
  var attempts = 0;

  function injectStyles(root) {
    if (root.querySelector('#koat-rc-styles')) return;
    var style = document.createElement('style');
    style.id = 'koat-rc-styles';
    style.textContent = [
      '.rc-purchase-option,',
      '[class*="rc-purchase-option"] {',
      '  background-color: #0000ff !important;',
      '  color: #fff !important;',
      '  border-color: #fff !important;',
      '}',
      '.rc-purchase-option *,',
      '[class*="rc-purchase-option"] * {',
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
    root.appendChild(style);
  }

  function tryInject() {
    var widget = document.querySelector('recharge-subscription-widget');
    if (widget && widget.shadowRoot && widget.shadowRoot.children.length > 0) {
      injectStyles(widget.shadowRoot);
      return;
    }
    if (attempts < MAX_ATTEMPTS) {
      attempts++;
      setTimeout(tryInject, INTERVAL);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInject);
  } else {
    tryInject();
  }
})();
