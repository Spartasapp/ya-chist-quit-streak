import { useEffect } from "react";
import { useIntl } from "../hooks/intl/useIntl";
import { TRANSLATION_KEY } from "../hooks/intl/translationKeys";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdBanner() {
  const t = useIntl();
  const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID as string | undefined;
  const slotId = import.meta.env.VITE_ADSENSE_SLOT_ID as string | undefined;
  const isReady = Boolean(clientId && slotId);

  useEffect(() => {
    if (!isReady) return;

    const scriptId = "adsense-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // no-op
    }
  }, [clientId, isReady]);

  return (
    <aside className="glass-card rounded-2xl border border-amber-200/40 bg-amber-200/10 p-3 text-sm text-amber-50">
      <p className="mb-2 font-medium">{t(TRANSLATION_KEY.ADSENSE_BANNER_TITLE)}</p>
      {isReady ? (
        <ins
          className="adsbygoogle block min-h-[50px] w-full"
          style={{ display: "block" }}
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <p className="text-amber-50/80">{t(TRANSLATION_KEY.ADSENSE_NOT_CONFIGURED)}</p>
      )}
    </aside>
  );
}
