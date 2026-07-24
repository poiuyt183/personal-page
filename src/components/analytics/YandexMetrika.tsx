import Script from "next/script";

const COUNTER_ID =
  process.env.NEXT_PUBLIC_YM_COUNTER_ID ?? "110755248";

export default function YandexMetrika() {
  if (!COUNTER_ID) return null;

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function (m, e, t, r, i, k, a) {
            m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
            m[i].l = 1 * new Date();
            for (var j = 0; j < e.scripts.length; j++) {
              if (e.scripts[j].src === r) { return; }
            }
            k = e.createElement(t);
            a = e.getElementsByTagName(t)[0];
            k.async = 1;
            k.src = r;
            a.parentNode.insertBefore(k, a);
          })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=${COUNTER_ID}', 'ym');

          ym(${JSON.stringify(Number(COUNTER_ID))}, 'init', {
            ssr: true,
            webvisor: true,
            clickmap: true,
            ecommerce: "dataLayer",
            accurateTrackBounce: true,
            trackLinks: true
          });
        `}
      </Script>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${COUNTER_ID}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
