import Script from "next/script";

const COUNTER_ID = process.env.NEXT_PUBLIC_HT_COUNTER_ID;

export default function HtTag() {
  if (!COUNTER_ID) return null;

  return (
    <Script id="ht-tag" strategy="afterInteractive">
      {`
        (function (m, e, t, r, i, k, a) {
          m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
          m[i].l = 1 * new Date();
          k = e.createElement(t);
          a = e.getElementsByTagName(t)[0];
          k.async = 1;
          k.src = r;
          a.parentNode.insertBefore(k, a);
        })(window, document, 'script', 'http://0.0.0.0:8000/ht-tag/_build/public/watch.js', 'ht');

        ht(${JSON.stringify(COUNTER_ID)}, 'init', {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: false
        });
      `}
    </Script>
  );
}
