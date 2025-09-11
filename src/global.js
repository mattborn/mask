
if (location.hostname === 'localhost') document.querySelector('base').href = '/'

const scrollConfig = {
  cleanup: true,
  distance: '20%',
  interval: 100,
  origin: 'bottom',
}
ScrollReveal().reveal('.mask-brand, nav a, .badge, .browser', scrollConfig)
ScrollReveal().reveal('h1, h2, p, section', {
  ...scrollConfig,
  viewOffset: { top: -500 },
})
