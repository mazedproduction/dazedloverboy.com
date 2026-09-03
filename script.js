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
    aboutBio: "Nathan Martel - aka Dazed Lover Boy - is a storyteller based in Paris. He shares, through his art, a universe that allows him to escape, to understand himself and to face his fears. At heart, Nathan is an artist, with an extensive background in writing, photography and theater. The words as cure for the soul, the image as exploration of the world. Between curiosity and ambition, these desires are born of a craving for elsewhere.",
    selectedWork: 'SELECTED WORK', prints: 'PRINTS', about: 'ABOUT',
    books: 'BOOKS', photography: 'PHOTOGRAPHY', exhibitions: 'EXHIBITIONS',
    films: 'FILMS', blank: 'BLANK',
    navigation: 'Main navigation', home: 'Dazed Lover Boy home',
    description: 'Dazed Lover Boy — selected work, prints and about.'
  },
  fr: {
    aboutBio: "Nathan Martel - alias Dazed Lover Boy - est un conteur basé à Paris. Il partage, à travers son art, un univers qui lui permet de s'évader, de se comprendre et d'affronter ses peurs. Passioné, Nathan est un artiste, doté d'une vaste expérience en écriture, photographie et théâtre. Les mots pour une guérison de l'âme, les images pour l'exploration du monde. Entre curiosité et ambition, ces envies naissent d'une envie pour l'ailleurs.",
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
