document.querySelector('.bottom-monogram')?.remove();

const tabLinks = document.querySelectorAll('[data-tab-link]');
const tabPanels = document.querySelectorAll('[data-tab-panel]');

function showTab(name){
  const parentTab = name === 'le-vide-dune-ame-blanche-tournant-au-vert' ? 'selected-work' : name;
  tabLinks.forEach(link => {
    const active = link.dataset.tabLink === name || (link.closest('.top-nav') && link.dataset.tabLink === parentTab);
    link.classList.toggle('active', active);
  });

  tabPanels.forEach(panel => {
    const active = panel.dataset.tabPanel === name;
    panel.classList.toggle('active', active);
    panel.setAttribute('aria-hidden', String(!active));
    if(active) panel.scrollTop = 0;
  });
}

tabLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    showTab(link.dataset.tabLink);
    history.replaceState(null, '', `#${link.dataset.tabLink}`);
  });
});

const initialTab = window.location.hash.slice(1);
showTab(document.querySelector(`[data-tab-panel="${initialTab}"]`) ? initialTab : 'selected-work');

const gallerySlides = [...document.querySelectorAll('.project-gallery figure')];
const galleryCount = document.querySelector('.gallery-count');
let galleryIndex = 0;

function showGallerySlide(index){
  galleryIndex = (index + gallerySlides.length) % gallerySlides.length;
  gallerySlides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === galleryIndex));
  galleryCount.textContent = `${galleryIndex + 1} / ${gallerySlides.length}`;
}

document.querySelector('.gallery-prev')?.addEventListener('click', () => showGallerySlide(galleryIndex - 1));
document.querySelector('.gallery-next')?.addEventListener('click', () => showGallerySlide(galleryIndex + 1));

const translations = {
  en: {
    aboutBio: "Dazed Lover Boy is a Paris-based storyteller working across writing, photography and theatre. Through his art, he creates worlds through which he can escape, understand himself and confront his fears. Words become a way of healing the soul; images, a way of exploring the world. Driven by curiosity, his work is born from a constant longing for elsewhere.",
    selectedWork: 'SELECTED WORK', prints: 'PRINTS', about: 'ABOUT',
    books: 'BOOKS', photography: 'PHOTOGRAPHY', exhibitions: 'EXHIBITIONS',
    films: 'FILMS', blank: 'BLANK',
    leVideDescriptionOne: '<em>Le Vide d’Une Ame Blanche Tournant au Vert</em> is the poetic journal of a soul that surrendered itself to love until it could no longer tell what still belonged to it. Written over several years, its poems and fragments trace an inner journey shaped by idealisation, dependence, anxiety, solitude and moments of realisation. Language searches for itself, thoughts repeat, and words scatter across the page as their author tries to understand what he feels and what he is becoming.',
    leVideDescriptionTwo: 'Innocent, empty, almost numb, the soul finds itself confronted by its own demons. Yet in the space left by the other’s disappearance, something slowly begins to grow. This collection is the archive of a metamorphosis: that of a boy who sought in another person a reason to live and who discovers, through writing, a way to exist.',
    leVideGallery: 'Book gallery', previousImage: 'Previous image', nextImage: 'Next image',
    navigation: 'Main navigation', home: 'Dazed Lover Boy home',
    description: 'Dazed Lover Boy — selected work, prints and about.'
  },
  fr: {
    aboutBio: "Dazed Lover Boy est un conteur basé à Paris, dont le travail se déploie entre l’écriture, la photographie et le théâtre. À travers son art, il crée des univers qui lui permettent de s’évader, de se comprendre et d’affronter ses peurs. Les mots deviennent un moyen de guérir l’âme ; les images, une manière d’explorer le monde. Porté par la curiosité, son travail naît d’un désir constant d’ailleurs.",
    selectedWork: 'SÉLECTION', prints: 'TIRAGES', about: 'À PROPOS',
    books: 'LIVRES', photography: 'PHOTOGRAPHIE', exhibitions: 'EXPOSITIONS',
    films: 'FILMS', blank: 'VIDE',
    leVideDescriptionOne: '<em>Le Vide d’Une Ame Blanche Tournant au Vert</em> est le journal poétique d’une âme qui s’est abandonnée à l’amour au point de ne plus savoir ce qui lui appartient. Écrits au fil de plusieurs années, ses poèmes et fragments suivent un mouvement intérieur fait d’idéalisation, de dépendance, d’angoisse, de solitude et de prises de conscience. La langue se cherche, les pensées se répètent, les mots se dispersent sur la page tandis que leur auteur tente de comprendre ce qu’il ressent et ce qu’il devient.',
    leVideDescriptionTwo: 'Innocente, vide, presque anesthésiée — l’âme se retrouve confrontée à ses propres démons. Mais dans l’espace laissé par la disparition de l’autre, quelque chose commence lentement à germer. Ce recueil est l’archive d’une métamorphose : celle d’un garçon qui cherchait dans l’autre une raison de vivre et qui découvre, à travers l’écriture, une manière d’exister.',
    leVideGallery: 'Galerie du livre', previousImage: 'Image précédente', nextImage: 'Image suivante',
    navigation: 'Navigation principale', home: 'Accueil Dazed Lover Boy',
    description: 'Dazed Lover Boy — sélection de travaux, tirages et à propos.'
  }
};

const languageToggle = document.querySelector('.language-toggle');

function setLanguage(language){
  const copy = translations[language];
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const value = copy[element.dataset.i18n];
    if (value.includes('<em>')) element.innerHTML = value;
    else element.textContent = value;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    element.setAttribute('aria-label', copy[element.dataset.i18nAria]);
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
