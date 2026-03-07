;(function(){
  /* loader fade out */
  var loader = document.getElementById('loader');
  if (loader && window.gsap) {
    gsap.to(loader,{
      opacity: 0,
      duration: 0.6,
      delay: 0.9,
      ease: 'power2.out',
      onComplete: function(){
        loader.style.display = 'none';
      }
    });
  }

  /* smooth scrolling with Lenis */
  if (window.Lenis) {
    var lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      smoothTouch: false
    });

    function raf(time){
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    document.querySelectorAll('nav a[href^="#"]').forEach(function(link){
      link.addEventListener('click',function(e){
        var href = link.getAttribute('href');
        if(!href || href.charAt(0) !== '#') return;
        var id = href.slice(1);
        var target = document.getElementById(id);
        if(!target) return;
        e.preventDefault();
        lenis.scrollTo(target,{ offset:-80 });
      });
    });
  }

  /* hero entrance animation */
  if (window.gsap) {
    gsap.from('.notebook',{
      duration:1,
      y:40,
      opacity:0,
      ease:'power3.out'
    });
    gsap.from('.doodle',{
      duration:1,
      y:18,
      opacity:0,
      rotation:-6,
      stagger:0.12,
      ease:'power2.out',
      delay:0.1
    });
    gsap.from('.notebook-name',{
      duration:1,
      y:16,
      opacity:0,
      ease:'power3.out',
      delay:0.2
    });
  }

  /* section reveal with GSAP */
  if (window.gsap && 'IntersectionObserver' in window) {
    var reveals = document.querySelectorAll('.reveal');
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        gsap.fromTo(entry.target,
          {opacity:0,y:26},
          {opacity:1,y:0,duration:0.7,ease:'power2.out'}
        );
      });
    },{threshold:0.2});

    reveals.forEach(function(el){ obs.observe(el); });
  }
})();

