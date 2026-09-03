import Header from '@/components/Header';
import Tabs from '@/components/Tabs';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Tabs />
      <footer className="mt-auto border-t border-hex-smoke/40 py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-hex-muted font-mono">
            ✦ emorce hexed · built for the circle
          </p>
          <p className="text-[10px] text-hex-muted/70 font-mono">
            no tracking · no accounts · public links only
          </p>
        </div>
      </footer>
    </main>
  );
}
