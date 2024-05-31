import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

const heavitas = localFont({ src: '../fonts/Heavitas/Heavitas.ttf', variable: '--font-heavitas' });
const helvetica = localFont({
  src: '../fonts/Helvetica/Helvetica.ttf',
  variable: '--font-helvetica'
});
export const metadata: Metadata = {
  title: 'Stakebee',
  description: 'Defi Restaking'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(heavitas.variable, helvetica.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
