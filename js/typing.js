/* Simple typing animation for hero subtitle cycling through items */
(function(){
  const el = document.getElementById('typed')
  if(!el) return
  const items = [
    'B.Tech CSE (AI & ML) Student',
    'Aspiring AI/ML Engineer',
    'Software Developer',
    'Problem Solver & Learner'
  ]
  let idx=0, char=0, forward=true

  function type(){
    const current = items[idx]
    if(forward){
      char++
      el.textContent = current.slice(0,char)
      if(char === current.length){ forward=false; setTimeout(type,900); return }
    } else {
      char--
      el.textContent = current.slice(0,char)
      if(char===0){ forward=true; idx=(idx+1)%items.length }
    }
    setTimeout(type, forward ? 48 : 32)
  }
  // Start slightly after load for smoothness
  window.addEventListener('load', ()=>setTimeout(type,500))
})();