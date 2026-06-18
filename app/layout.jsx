import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
})

export const metadata = {
  title: 'DrawingGarden',
  description: 'Cultivate creative drawing prompts from your own garden of ideas.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
