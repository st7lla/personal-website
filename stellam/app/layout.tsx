import type { Metadata } from 'next'
import { Great_Vibes } from 'next/font/google'

const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'], variable: '--font-cursive' })
import { Lora } from 'next/font/google'

const lora = Lora({ subsets: ['latin'], variable: '--font-serif' })
import { Space_Mono, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceMono = Space_Mono({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono"
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif"
});

export const metadata: Metadata = {
  title: 'stella migmar | 18, toronto',
  description: 'Personal portfolio',
  
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${greatVibes.variable} lora.variable`} className={lora.variable}>
      <body className={`${spaceMono.variable} ${playfair.variable} font-mono antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
