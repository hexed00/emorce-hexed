import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'emorce ✦ hexed',
  description: 'Hexed multi-tool suite. Spotify · Instagram · Discord · Pinterest · GIFs · Cobalt · Media vault. Built for emorce.',
  themeColor: '#0a0a0a',
  icons: {
    icon: 'https://i.pinimg.com/736x/42/de/d5/42ded506cb69f48fad09de00cdf3e54f.jpg',
  },
  openGraph: {
    title: 'emorce ✦ hexed',
    description: 'Tools for the demons.',
    images: ['https://i.pinimg.com/736x/42/de/d5/42ded506cb69f48fad09de00cdf3e54f.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-hex-black text-hex-bone antialiased">
        <div className="noise" />
        {children}
      </body>
    </html>
  );
}
