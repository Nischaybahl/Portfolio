/* ===== TYPEWRITER ===== */
const typewriterTexts = ['Full Stack Developer', 'MERN Stack Specialist', 'Frontend Engineer', 'Campus Ambassador @Google', 'Creator of CampX'];
let twIndex = 0, charIndex = 0, isDeleting = false;
const typewriterEl = document.getElementById('typewriter-text');
function typewrite() {
  const current = typewriterTexts[twIndex];
  if (isDeleting) {
    typewriterEl.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) { isDeleting = false; twIndex = (twIndex + 1) % typewriterTexts.length; setTimeout(typewrite, 400); return; }
    setTimeout(typewrite, 40);
  } else {
    typewriterEl.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) { isDeleting = true; setTimeout(typewrite, 1800); return; }
    setTimeout(typewrite, 80);
  }
}
typewrite();

/* ===== NAVBAR ===== */
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const scrollProgress = document.getElementById('scroll-progress');
const sections = document.querySelectorAll('section[id]');

hamburger.addEventListener('click', () => { hamburger.classList.toggle('active'); navMenu.classList.toggle('open'); });
navLinks.forEach(link => link.addEventListener('click', () => { hamburger.classList.remove('active'); navMenu.classList.remove('open'); }));

/* ===== SCROLL ===== */
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = (scrollTop / docHeight * 100) + '%';
  navbar.classList.toggle('scrolled', scrollTop > 60);
  let current = '';
  sections.forEach(s => { if (scrollTop >= s.offsetTop - 200) current = s.id; });
  navLinks.forEach(l => { l.classList.remove('active'); if (l.getAttribute('href') === '#' + current) l.classList.add('active'); });
});

/* ===== REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) { setTimeout(() => entry.target.classList.add('active'), i * 100); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));

/* ===== CLIPBOARD ===== */
const toast = document.getElementById('copy-toast');
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => { toast.textContent = '✓ Copied: ' + text; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2000); });
}

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) { e.preventDefault(); const t = document.querySelector(this.getAttribute('href')); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
});
