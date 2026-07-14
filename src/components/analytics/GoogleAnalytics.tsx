import Script from "next/script";

/** Measurement ID do Google Analytics 4 (público — pode viver no bundle). */
const GA_MEASUREMENT_ID = "G-NVHQXXW9RW";

/**
 * Google Analytics (gtag.js) via next/script. O loader externo carrega com
 * `afterInteractive` (default recomendado pra tags de analytics) e o init
 * inline registra o `config`. Fica no root layout, então roda em todas as
 * rotas — Next garante que o script carrega uma única vez entre navegações.
 */
export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
