import './style.css'

export const metadata = {
  title: 'CDSJ5 Wiki',
  description: 'A clean community wiki for CDSJ5.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  )
}
