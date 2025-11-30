$w.onReady(function () {
  // LinkedIn Insight Tag - injected programmatically to avoid JSX/HTML parsing errors
  (function() {
    var PARTNER_ID = "8362812";

    // Ensure partner id array exists and avoid duplicates
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    if (window._linkedin_data_partner_ids.indexOf(PARTNER_ID) === -1) {
      window._linkedin_data_partner_ids.push(PARTNER_ID);
    }

    // Ensure lintrk queue exists
    if (!window.lintrk) {
      window.lintrk = function(a,b){ (window.lintrk.q = window.lintrk.q || []).push([a,b]); };
      window.lintrk.q = window.lintrk.q || [];
    }

    // Inject the external LinkedIn script
    if (!document.querySelector('script[data-lk="insight"]')) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
      s.setAttribute('data-lk', 'insight');
      document.getElementsByTagName('head')[0].appendChild(s);
    }

    // Optional: append a noscript fallback (only useful if you can rely on HTML output)
    if (!document.getElementById('li-noscript-' + PARTNER_ID)) {
      var ns = document.createElement('noscript');
      ns.id = 'li-noscript-' + PARTNER_ID;
      ns.innerHTML = '<img height="1" width="1" style="display:none" alt="" src="https://px.ads.linkedin.com/collect/?pid=' + encodeURIComponent(PARTNER_ID) + '&fmt=gif" />';
      document.body.appendChild(ns);
    }
  })();

  // Write your JavaScript here

  // To select an element by ID use: $w('#elementID')

  // Click 'Preview' to run your code
});
