// React hook (TypeScript) that loads the LinkedIn Insight Tag when `consentGranted` is true.
// Usage: const loaded = useLinkedInInsight('8362812', consentGranted);
import { useEffect, useState } from 'react';

export default function useLinkedInInsight(partnerId: string, consentGranted: boolean) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!consentGranted || !partnerId) return;

    // Avoid double-loading
    if (document.querySelector('script[data-lk="insight"]')) {
      setLoaded(true);
      return;
    }

    (function load() {
      // push partner id
      (window as any)._linkedin_data_partner_ids = (window as any)._linkedin_data_partner_ids || [];
      if ((window as any)._linkedin_data_partner_ids.indexOf(partnerId) === -1) {
        (window as any)._linkedin_data_partner_ids.push(partnerId);
      }

      if (!(window as any).lintrk) {
        (window as any).lintrk = function(a: any,b: any){ ((window as any).lintrk.q = (window as any).lintrk.q || []).push([a,b]);};
        (window as any).lintrk.q = (window as any).lintrk.q || [];
      }

      const s = document.getElementsByTagName('script')[0];
      const b = document.createElement('script');
      b.type = 'text/javascript';
      b.async = true;
      b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
      b.setAttribute('data-lk','insight');
      s.parentNode!.insertBefore(b, s);

      // append a noscript fallback to body (optional)
      const nsId = 'li-noscript-' + partnerId;
      if (!document.getElementById(nsId)) {
        const noscript = document.createElement('noscript');
        noscript.id = nsId;
        noscript.innerHTML = '<img height="1" width="1" style="display:none" alt="" src="https://px.ads.linkedin.com/collect/?pid=' + encodeURIComponent(partnerId) + '&fmt=gif" />';
        document.body.appendChild(noscript);
      }

      b.onload = () => setLoaded(true);
      b.onerror = () => setLoaded(false);
    })();

    // we intentionally do not remove the script on unmount because analytics tags are usually persistent.
  }, [partnerId, consentGranted]);

  return loaded;
}