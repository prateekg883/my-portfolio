/* Contact form validation and simple client-side handling */
(function(){
  'use strict'
  const form = document.getElementById('contact-form')
  if(!form) return
  const nameEl = document.getElementById('name')
  const emailEl = document.getElementById('email')
  const subjectEl = document.getElementById('subject')
  const messageEl = document.getElementById('message')

  function isEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) }

  form.addEventListener('submit',(e)=>{
    e.preventDefault()
    let ok=true
    // name
    if(!nameEl.value || nameEl.value.trim().length < 2){ ok=false; document.getElementById('err-name').textContent='Please enter your name' } else document.getElementById('err-name').textContent=''
    // email
    if(!isEmail(emailEl.value)){ ok=false; document.getElementById('err-email').textContent='Please enter a valid email' } else document.getElementById('err-email').textContent=''
    // subject
    if(!subjectEl.value || subjectEl.value.trim().length<2){ ok=false; document.getElementById('err-subject').textContent='Please add a subject' } else document.getElementById('err-subject').textContent=''
    // message
    if(!messageEl.value || messageEl.value.trim().length < 10){ ok=false; document.getElementById('err-message').textContent='Message should be at least 10 characters' } else document.getElementById('err-message').textContent=''

    if(!ok) return

    // Simple, secure client-side stub: send to server endpoint or email provider in production
    // For now show success message and reset form
    alert('Thanks! Your message has been validated locally. Integrate with an email/service to send it in production.')
    form.reset()
  })
})();