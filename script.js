document.querySelector('.bottom-monogram')?.remove();

const tabLinks = document.querySelectorAll('[data-tab-link]');
const tabPanels = document.querySelectorAll('[data-tab-panel]');

function showTab(name){
  tabLinks.forEach(link => {
    const active = link.dataset.tabLink === name;
    link.classList.toggle('active', active);
  });

  tabPanels.forEach(panel => {
    const active = panel.dataset.tabPanel === name;
    panel.classList.toggle('active', active);
    panel.setAttribute('aria-hidden', String(!active));
  });
}

tabLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    showTab(link.dataset.tabLink);
  });
});

showTab('selected-work');

const translations = {
  en: {
    aboutBio: "Dazed Lover Boy is a Paris-based storyteller working across writing, photography and theatre. Through his art, he creates worlds through which he can escape, understand himself and confront his fears. Words become a way of healing the soul; images, a way of exploring the world. Driven by curiosity, his work is born from a constant longing for elsewhere.",
    selectedWork: 'SELECTED WORK', prints: 'PRINTS', about: 'ABOUT',
    books: 'BOOKS', photography: 'PHOTOGRAPHY', exhibitions: 'EXHIBITIONS',
    films: 'FILMS', blank: 'BLANK',
    navigation: 'Main navigation', home: 'Dazed Lover Boy home',
    description: 'Dazed Lover Boy — selected work, prints and about.'
  },
  fr: {
    aboutBio: "Dazed Lover Boy est un conteur basé à Paris, dont le travail se déploie entre l’écriture, la photographie et le théâtre. À travers son art, il crée des univers qui lui permettent de s’évader, de se comprendre et d’affronter ses peurs. Les mots deviennent un moyen de guérir l’âme ; les images, une manière d’explorer le monde. Porté par la curiosité, son travail naît d’un désir constant d’ailleurs.",
    selectedWork: 'SÉLECTION', prints: 'TIRAGES', about: 'À PROPOS',
    books: 'LIVRES', photography: 'PHOTOGRAPHIE', exhibitions: 'EXPOSITIONS',
    films: 'FILMS', blank: 'VIDE',
    navigation: 'Navigation principale', home: 'Accueil Dazed Lover Boy',
    description: 'Dazed Lover Boy — sélection de travaux, tirages et à propos.'
  }
};

const languageToggle = document.querySelector('.language-toggle');

function setLanguage(language){
  const copy = translations[language];
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    element.textContent = copy[element.dataset.i18n];
  });
  document.querySelector('.top-nav').setAttribute('aria-label', copy.navigation);
  document.querySelector('.dlb-logo').setAttribute('aria-label', copy.home);
  document.querySelector('meta[name="description"]').setAttribute('content', copy.description);
  const isFrench = language === 'fr';
  languageToggle.textContent = isFrench ? 'EN' : 'FR';
  languageToggle.lang = isFrench ? 'en' : 'fr';
  languageToggle.setAttribute('aria-label', isFrench ? 'Switch site to English' : 'Passer le site en français');
}

languageToggle.addEventListener('click', () => {
  setLanguage(document.documentElement.lang === 'fr' ? 'en' : 'fr');
});
