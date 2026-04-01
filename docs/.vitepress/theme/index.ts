import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import './custom.css'
import LandingPage from './components/LandingPage.vue'
import NavSponsor from './components/NavSponsor.vue'
import SiteFooter from './components/SiteFooter.vue'
import SkillDetailPage from './components/SkillDetailPage.vue'
import SkillsCatalogPage from './components/SkillsCatalogPage.vue'
import SkillsCollectionPage from './components/SkillsCollectionPage.vue'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(NavSponsor),
      'nav-screen-content-after': () => h(NavSponsor, { mobile: true }),
      'layout-bottom': () => h(SiteFooter)
    }),
  enhanceApp({ app }) {
    app.component('LandingPage', LandingPage)
    app.component('SkillDetailPage', SkillDetailPage)
    app.component('SkillsCatalogPage', SkillsCatalogPage)
    app.component('SkillsCollectionPage', SkillsCollectionPage)
  }
} satisfies Theme
