/* Lightweight particles implementation using Canvas. Vanilla JS and optimized for performance. */
(function(){
  'use strict'
  const canvas = document.getElementById('particles-canvas')
  if(!canvas) return
  const ctx = canvas.getContext('2d')
  let w=canvas.width=window.innerWidth
  let h=canvas.height=window.innerHeight
  const particles = []
  const count = Math.max(6, Math.floor((w*h)/90000))

  function rand(min,max){return Math.random()*(max-min)+min}

  function init(){
    particles.length=0
    for(let i=0;i<count;i++){
      particles.push({x:rand(0,w),y:rand(0,h),r:rand(20,120),vx:rand(-0.1,0.1),vy:rand(-0.05,0.05),alpha:rand(0.06,0.18)})
    }
  }

  function resize(){w=canvas.width=window.innerWidth;h=canvas.height=window.innerHeight;init()}
  window.addEventListener('resize', ()=>{resize()})

  function draw(){
    ctx.clearRect(0,0,w,h)
    particles.forEach(p=>{
      p.x += p.vx; p.y += p.vy
      if(p.x<-200) p.x = w+200; if(p.x> w+200) p.x=-200
      if(p.y<-200) p.y = h+200; if(p.y> h+200) p.y=-200
      const grad = ctx.createRadialGradient(p.x,p.y,p.r*0.2,p.x,p.y,p.r)
      grad.addColorStop(0, 'rgba(124,58,237,'+ (p.alpha*1.0) +')')
      grad.addColorStop(0.5, 'rgba(6,182,212,'+ (p.alpha*0.6) +')')
      grad.addColorStop(1, 'rgba(6,182,212,0)')
      ctx.globalCompositeOperation = 'lighter'
      ctx.fillStyle = grad
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill()
    })
    requestAnimationFrame(draw)
  }

  init(); draw();
})();