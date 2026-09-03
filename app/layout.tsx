import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'emorce · hexed',
  description: 'Hexed multi-tool suite for emorce. Spotify, Instagram, Discord deep search, Pinterest, GIFs, Cobalt, media vault.',
  themeColor: '#050505',
  icons: {
    icon: 'https://i.pinimg.com/736x/42/de/d5/42ded506cb69f48fad09de00cdf3e54f.jpg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-hex-black text-hex-bone antialiased">
        <div className="noise" />
        {children}
      </body>
    </html>
  );
}
