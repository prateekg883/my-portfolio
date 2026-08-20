/* Main JS: handles UI interactions, mobile nav, back-to-top, loading screen, skill animations, spotlight */
(function(){
  'use strict'

  // DOM helpers
  const $ = (sel, ctx=document) => ctx.querySelector(sel)
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel))

  // Mobile nav toggle
  const mobileToggle = $('#mobile-toggle')
  const nav = $('.nav')
  if(mobileToggle){
    mobileToggle.addEventListener('click', ()=>{
      const expanded = mobileToggle.getAttribute('aria-expanded') === 'true'
      mobileToggle.setAttribute('aria-expanded', String(!expanded))
      nav.classList.toggle('open')
    })
  }

  // Back to top and year
  const back = $('#back-to-top')
  const yearEls = ['year','year2','year3','year4']
  const y = new Date().getFullYear()
  yearEls.forEach(id=>{const el=document.getElementById(id); if(el) el.textContent = y})

  // Smooth scroll for in-page links
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a[href^="#"]')
    if(!a) return
    const href = a.getAttribute('href')
    if(href === '#') return
    e.preventDefault()
    const target = document.querySelector(href)
    if(target){
      target.scrollIntoView({behavior:'smooth',block:'start'})
    }
  })

  // Loading screen
  window.addEventListener('load', ()=>{
    const loader = document.getElementById('loading-screen')
    if(loader){
      loader.style.opacity = '0'
      setTimeout(()=>loader.style.display='none',450)
    }
  })

  // Highlight active nav link based on scroll
  const sections = $$('main section[id], main > section')
  const navLinks = $$('.nav-list a')
  const sectionObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      const id = entry.target.id
      const link = navLinks.find(a=>a.getAttribute('href') === '#'+id || a.getAttribute('href') === 'index.html#'+id)
      if(link){
        if(entry.isIntersecting){
          navLinks.forEach(n=>n.classList.remove('active'))
          link.classList.add('active')
        }
      }
    })
  }, {threshold:0.35})
  sections.forEach(s=>sectionObserver.observe(s))

  // Spotlight mouse effect
  const spotlight = document.getElementById('spotlight')
  if(spotlight){
    document.addEventListener('mousemove', (e)=>{
      spotlight.style.setProperty('--mx', e.clientX + 'px')
      spotlight.style.setProperty('--my', e.clientY + 'px')
    })
  }

  // Simple reveal on scroll for elements with slide-left class
  const slideEls = $$('.slide-left')
  const slideObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add('show-slide')
    })
  }, {threshold:0.2})
  slideEls.forEach(e=>slideObserver.observe(e))

  // Back to top visibility
  const fBack = ()=>{ if(window.scrollY>400) back.style.opacity='1'; else back.style.opacity='0' }
  window.addEventListener('scroll', fBack); fBack()

})();