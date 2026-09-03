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
