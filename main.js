// Words to cycle through
const words = ["Growth", "Investment", "Income"];
let wordIndex = 0;
let letterIndex = 0;
let deleting = false;
const dynamicSpan = document.getElementById('dynamic-word');

function typeEffect() {
  const currentWord = words[wordIndex];
  if (!deleting) {
    // Typing
    dynamicSpan.textContent = currentWord.slice(0, letterIndex + 1);
    letterIndex++;
    if (letterIndex === currentWord.length) {
      // Pause before deleting
      setTimeout(() => { deleting = true; typeEffect(); }, 1000);
      return;
    }
  } else {
    // Deleting
    dynamicSpan.textContent = currentWord.slice(0, letterIndex - 1);
    letterIndex--;
    if (letterIndex === 0) {
      // Move to next word
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(typeEffect, deleting ? 70 : 120);
}

// Start the effect
typeEffect();

//  Animate Reunited Total Assets (0 to 4,500,000)
function animateCount(id, end, duration, options = {}) {
  const el = document.getElementById(id);
  let start = 0;
  let startTime = null;
  function formatNumber(n) {
    if (options.format === 'money') {
      if (n >= 1000000) {
        return (n / 1000000).toFixed(1) + 'M';
      }
      if (n >= 1000) {
        return (n / 1000).toFixed(1) + 'K';
      }
      return n.toLocaleString();
    }
    if (options.format === 'percent') {
      return Math.round(n) + '%';
    }
    if (options.format === 'plus') {
      if (n >= 1000) {
        return Math.round(n / 1000) + 'k';
      }
      return Math.round(n);
    }
    return Math.round(n);
  }
  function step(ts) {
    if (!startTime) startTime = ts;
    const progress = Math.min((ts - startTime) / duration, 1);
    const value = start + (end - start) * progress;
    el.textContent = formatNumber(value);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = formatNumber(end);
      if (options.suffix) el.textContent += options.suffix;
    }
  }
  requestAnimationFrame(step);
}
// Animate all three numbers
animateCount('assets-count', 4500000, 2000, { format: 'money' });
animateCount('satisfaction-count', 90, 1800, { format: 'percent' });
animateCount('proposals-count', 70000, 2000, { format: 'plus' });

// Ensure the banner repeats seamlessly for all screen sizes
(function () {
  const track = document.getElementById('scrollingBannerTrack');
  function adjustBanner() {
    // Ensure at least two items for seamless scroll
    if (track.children.length < 1) {
      track.appendChild(track.children[0].cloneNode(true));
    }
  }
  window.addEventListener('resize', adjustBanner);
  adjustBanner();
})();

// Scroll to section on dot click and update active dot on scroll
document.addEventListener('DOMContentLoaded', function () {
  const dots = document.querySelectorAll('#scroll-nav-dots .scroll-dot');
  const sections = [
    document.getElementById('section-1'),
    document.getElementById('section-2'),
    document.getElementById('section-3')
  ];
  const navDots = document.getElementById('scroll-nav-dots');
  const scrollNavWrapper = document.querySelector('.fusion-scroll-section-nav');

  function setActiveDot(index) {
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', function () {
      sections[idx].scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Helper to get the currently visible section
  function getCurrentSectionIndex() {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    let currentIdx = 0;
    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect();
      const sectionTop = rect.top + scrollY;
      const sectionBottom = sectionTop + sections[i].offsetHeight;
      // Use a threshold so the active dot changes when the section is at least halfway in view
      if (scrollY + windowHeight / 2 >= sectionTop) {
        currentIdx = i;
      }
    }
    return currentIdx;
  }

  // Update active dot on scroll
  window.addEventListener('scroll', function () {
    // Set active dot based on which section is in view
    const idx = getCurrentSectionIndex();
    setActiveDot(idx);

    // Sticky nav logic
    const wrapperRect = scrollNavWrapper.getBoundingClientRect();
    const wrapperTop = wrapperRect.top + window.scrollY;
    const wrapperBottom = wrapperTop + scrollNavWrapper.offsetHeight;
    const navHeight = navDots.offsetHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;

    // When the scroll is within the wrapper, fix the nav
    if (
      scrollY + windowHeight / 2 >= wrapperTop &&
      scrollY + windowHeight / 2 <= wrapperBottom
    ) {
      navDots.classList.add('fixed');
      navDots.classList.remove('absolute-bottom');
    } else if (scrollY + windowHeight / 2 > wrapperBottom) {
      navDots.classList.remove('fixed');
      navDots.classList.add('absolute-bottom');
    } else {
      navDots.classList.remove('fixed');
      navDots.classList.remove('absolute-bottom');
    }
  });

  // Initial position
  window.dispatchEvent(new Event('scroll'));
});
