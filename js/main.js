const controller = new ScrollMagic.Controller();
const sections = document.querySelectorAll(".visual, .record_memo, .last_visual, .film, .last_top, last_bottom");

sections.forEach((section) => {
  TweenLite.set(section, { opacity: 0, y: 100 });

  const sectionTween = TweenMax.to(section, 1, {
    opacity: 1,
    y: 0,
    ease: Power2.easeOut,
  });

  new ScrollMagic.Scene({
    triggerElement: section,
    triggerHook: 0.5,
    reverse: true,
  })
    .setTween(sectionTween)
    .addTo(controller);
});



document.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.querySelector(".gnb_li");
    const modal = document.getElementById("form");
    const bg = document.querySelector("#form .bg"); 
    const cancelBtn = document.querySelector('input[type="reset"]'); 
    const submitBtn = document.querySelector('input[type="submit"]'); 

    openBtn.addEventListener("click", function (e) {
        e.preventDefault();
        modal.style.display = "block";
    });

    function closeModal() {
        modal.style.display = "none";
    }

    cancelBtn.addEventListener("click", function () {
        closeModal();
    });

    submitBtn.addEventListener("click", function (e) {
        e.preventDefault();
        alert("신청이 완료되었습니다.");
        closeModal();
    });

    bg.addEventListener("click", function () {
        closeModal();
    });
});




//sec2 스크롤
const scrollSection = document.querySelector('.horizontal-scroll__section');
const scrollContent = document.querySelector('.horizontal-scroll__content');
const lastItem = document.querySelector('.about__item:last-child'); // 마지막 요소 선택
const nextSection = document.querySelector('.film'); // 다음 섹션 선택
const prevSection = document.querySelector('.visual'); // 위쪽의 이전 섹션 선택

const lastItemOffset = lastItem.offsetLeft + lastItem.clientWidth;
const maxScroll = lastItemOffset - window.innerWidth;
let lastScrollTop = 0; // 마지막 스크롤 위치 저장
let isTransitioning = false; // 중복 실행 방지

document.addEventListener('scroll', () => {
  if (isTransitioning) return;

  const scrolled = window.pageYOffset;
  const sectionOffset = Math.min(maxScroll, Math.abs(scrollSection.offsetTop - scrolled));
  const notReachedBottom = Math.max(0, scrollSection.getBoundingClientRect().bottom - window.innerHeight);

  if (scrollSection.offsetTop <= scrolled && notReachedBottom) {
    gsap.to(scrollContent, { x: -sectionOffset });


    if (sectionOffset >= maxScroll - 0 && scrolled > lastScrollTop) {
      isTransitioning = true;
      nextSection.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        isTransitioning = false;
      }, 1000);
    }
  }

  // **위로 스크롤 시 `.horizontal-scroll__section`에서 벗어날 수 있도록 허용**
  if (scrolled < lastScrollTop && scrolled < scrollSection.offsetTop) {
    // 강제로 `.horizontal-scroll__section`로 이동하지 않고, 자연스럽게 이전 섹션으로 이동 가능
    isTransitioning = false;
  }

  lastScrollTop = scrolled <= 0 ? 0 : scrolled; // 현재 스크롤 위치 업데이트
});


const heroScene = new ScrollMagic.Scene({
  triggerElement: '.visual',
  triggerHook: 0,
  duration: maxScroll // 마지막 요소까지만 가로 스크롤
});




//sec3 스와이퍼
document.addEventListener("DOMContentLoaded", function () {
  // Swiper 초기화
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    centeredSlides: false,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    }
  });
});


//스크롤 효과
const lenis = new Lenis({
  duration: 2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

//sec3-모달
const card_image = document.getElementById('card_image');
const modalCloseButton = document.getElementById('modalCloseButton');
const modal = document.getElementById('modalContainer');
card_image.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

modalCloseButton.addEventListener('click', () => {
  modal.classList.add('hidden');
});

window.addEventListener('click', function (event) {
  if (event.target === modal) {
    modal.classList.add('hidden');
  }
});

//헤드
const he_modalContainer = document.getElementById('he_modalContainer');
const he_modalCloseButton = document.getElementById('he_modalCloseButton');
const gnb_li = document.getElementById('gnb_li');

gnb_li.addEventListener('click', () => {
  he_modalContainer.classList.remove('he_hidden');
});

he_modalCloseButton.addEventListener('click', () => {
  he_modalContainer.classList.add('he_hidden');
});

window.addEventListener('click', function (event) {
  if (event.target === he_modalContainer) {
    he_modalContainer.classList.add('he_hidden');
  }
});




