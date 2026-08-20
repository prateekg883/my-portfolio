/* Scroll reveal helpers and sticky nav adjustments (accessible) */
(function(){
  'use strict'
  // Reveals for elements with class .reveal
  const revealEls = Array.from(document.querySelectorAll('.reveal'))
  if(revealEls.length){
    const ro = new IntersectionObserver(entries =>{
      entries.forEach(entry=>{
        if(entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, {threshold:0.12})
    revealEls.forEach(e=>ro.observe(e))
  }

  // Close mobile nav on navigation
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('.nav-list a')
    if(a && window.innerWidth <= 720){
      const nav = document.querySelector('.nav')
      if(nav) nav.classList.remove('open')
      const btn = document.getElementById('mobile-toggle')
      if(btn) btn.setAttribute('aria-expanded','false')
    }
  })
})();