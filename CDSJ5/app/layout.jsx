import 'nextra-theme-docs/style.css'
import { Layout, Navbar, Footer } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'

export const metadata = {
  title: 'CDSJ5 Wiki',
  description: 'A clean community wiki for CDSJ5.'
}

const navbar = <Navbar logo={<b>CDSJ5 Wiki</b>} />
const footer = <Footer>CDSJ5 Community Archive</Footer>

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap()

  return (
    <html lang="zh-Hant" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          footer={footer}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/x8lua/x8stuff/tree/main/CDSJ5"
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
