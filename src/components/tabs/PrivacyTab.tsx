export function PrivacyTab() {
  return (
    <section className="space-y-4">
      <article className="glass-card rounded-3xl border border-white/15 p-6 sm:p-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-white/70">Effective date: 2026-04-27</p>
        <p className="mt-4 text-white/85">
          BadHabits is an abstinence tracking app for alcohol and cigarettes. This policy explains
          what data is processed and how it is used.
        </p>

        <section className="mt-6 space-y-2">
          <h2 className="text-lg font-semibold">Data We Store</h2>
          <ul className="list-disc space-y-1 pl-6 text-white/85">
            <li>Daily checkmarks and streak records</li>
            <li>Relapse records (date/time and optional note)</li>
            <li>UI preferences (language and theme)</li>
          </ul>
          <p className="text-white/85">
            This data is stored locally in your browser using IndexedDB and localStorage. No
            registration is required.
          </p>
        </section>

        <section className="mt-6 space-y-2">
          <h2 className="text-lg font-semibold">Advertising</h2>
          <p className="text-white/85">
            The app may display ads via Google AdSense. AdSense may process technical data (for
            example browser/device identifiers, IP, and interaction signals) according to Google
            policies.
          </p>
          <p className="text-white/85">
            See{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-dotted underline-offset-4"
            >
              Google Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://support.google.com/adsense/answer/1348695"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-dotted underline-offset-4"
            >
              AdSense Program Policies
            </a>
            .
          </p>
        </section>

        <section className="mt-6 space-y-2">
          <h2 className="text-lg font-semibold">How To Delete Data</h2>
          <p className="text-white/85">
            You can clear local app data anytime by removing site storage in browser settings
            (IndexedDB/localStorage) or by uninstalling app storage on your device.
          </p>
        </section>

        <section className="mt-6 space-y-2">
          <h2 className="text-lg font-semibold">Contact</h2>
          <p className="text-white/85">
            For privacy questions, contact: <code>support@your-domain.com</code>
          </p>
        </section>
      </article>
    </section>
  );
}
