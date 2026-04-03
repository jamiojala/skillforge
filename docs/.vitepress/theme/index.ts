import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import './styles/index.css'
import CommunityPage from './components/CommunityPage.vue'
import ContributePage from './components/ContributePage.vue'
import DiscoverPage from './components/DiscoverPage.vue'
import LandingPage from './components/LandingPage.vue'
import NavActions from './components/NavActions.vue'
import SiteFooter from './components/SiteFooter.vue'
import SkillDetailPage from './components/SkillDetailPage.vue'
import SkillsCatalogPage from './components/SkillsCatalogPage.vue'
import SkillsCollectionPage from './components/SkillsCollectionPage.vue'
import SupportPage from './components/SupportPage.vue'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(NavActions),
      'nav-screen-content-after': () => h(NavActions, { mobile: true }),
      'layout-bottom': () => h(SiteFooter)
    }),
  enhanceApp({ app }) {
    app.component('CommunityPage', CommunityPage)
    app.component('ContributePage', ContributePage)
    app.component('DiscoverPage', DiscoverPage)
    app.component('LandingPage', LandingPage)
    app.component('SkillDetailPage', SkillDetailPage)
    app.component('SkillsCatalogPage', SkillsCatalogPage)
    app.component('SkillsCollectionPage', SkillsCollectionPage)
    app.component('SupportPage', SupportPage)
  }
} satisfies Theme
