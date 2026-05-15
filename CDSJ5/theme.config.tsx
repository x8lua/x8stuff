import type { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>CDSJ5 Wiki</span>,
  project: {
    link: 'https://github.com/x8lua/x8stuff'
  },
  docsRepositoryBase: 'https://github.com/x8lua/x8stuff/tree/main/CDSJ5',
  footer: {
    text: 'CDSJ5 Community Archive'
  },
  search: {
    placeholder: 'Search CDSJ5...'
  },
  sidebar: {
    defaultMenuCollapseLevel: 1
  }
}

export default config
