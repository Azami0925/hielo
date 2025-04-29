
import type {Metadata} from 'next';
import { Inter } from 'next/font/google'; // Import Inter font
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

// Configure Inter font
const inter = Inter({
  variable: '--font-inter', // Define CSS variable for the font
  subsets: ['latin'],
});


export const metadata: Metadata = {
  title: 'HieloYa App',
  description: 'Generado por Firebase Studio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* Apply Inter font variable to the body */}
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
