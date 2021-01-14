'use strict'

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', ()=> {
  //console.log(`navbarHeight: ${navbarHeight}`); // 100.9375
  if(window.scrollY > navbarHeight){
    navbar.classList.add('navbar--dark');
  }else{
    navbar.classList.remove('navbar--dark');
  }
});


// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  //console.log(event.target.dataset.link);
  const target = event.target;
  const link = target.dataset.link;
  if(link == null) {
    return;
  }else  {
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
    selectNavItem(target);
  }
});

//Navbar toggle button for small screen 일때 
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

// Handle contact button on home
const homeBtn = document.querySelector('.home__contact');
homeBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});


// 스크롤 내릴 때 홈부분 천천히 fade out
const home = document.querySelector('.home__content');
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  //console.log(`homeHeight: ${homeHeight}`); // 676.66015625
  home.style.opacity = 1- window.scrollY/ homeHeight;
});



//Show arrow up button when scrolling down  
// const arrowUp= document.querySelector('.arrow-up-btn');
// arrowUp.addEventListener('click', ()=> {
//     scrollIntoView('#home');
// });

// Show arrow up button when scrolling down
const arrowUp = document.querySelector('.arrow-up-btn');
document.addEventListener('scroll', () => {
  if(window.scrollY > homeHeight / 2){
    arrowUp.classList.add('visible');
    
  }else{
    arrowUp.classList.remove('visible');
  }
});

// Handle click one the 'Arrow up' button
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
})

//Projects filtering
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project'); //querySelectorAll은 배열로 가져와줍니다.

workBtnContainer.addEventListener('click', (e) => {
  // || 뒷부분 category__btn 부분은 data설정이 안되어 있어서 아래와  같은 방식으로 가져온다.
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if(filter == null){
    return;
  }

  //Remove selection from the previous item and select the new one
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  // 기존 target은 category__btn 부분인데 category__count 부분을 클릭하면 버튼이 아니라 오류가 발생
  // 그래서 span의 parentNode가 button임을 이용해서 아래와 같이 문제 해결
  const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('selected');

  projectContainer.classList.add('anim-out');
  
  //애니메이션이 적용되면서 필터링된 작업물이 나와야 되기때문에
  // setTimeout을 사용해서 간격을 둠으로써 자연스러운 애니메이션이 됩니다.
  setTimeout(() => {
    projects.forEach((project) => {
      //console.log(project.dataset.type);
      if(filter === '*' || filter === project.dataset.type){
        project.classList.remove('invisible');
      } else{
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');
  }, 300);
});
// intersectionobserver 패턴 적용하기
// 1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다.
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 야이템을 활성화 시킨다.

const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#testimonials',
  '#contact',
];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id=> 
  document.querySelector(`[data-link="${id}"]`));
//console.log(sections);
//console.log(navItems);

let selectedNavIndex= 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

function scrollIntoView(selector){
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: "smooth"});
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,  // null은 viewport
  rootMargin: '0px',
  threshold: 0.3,
}
const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    // 빠져 나갈 때  
    // testimonials 가 표시 되는 이유는 intersectionratio가 0 시작하자마자 섹션들이 밖으로 나가서 발생하는 현상
    if(!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      //console.log(index, entry.target.id);
      // -값은 스크롤링이 아래로 되어서 페이지가 올라옴
      if(entry.boundingClientRect.y < 0){
        selectedNavIndex = index + 1;
      }else {
        //페이지가 내려가는 경우
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

// 윈도우가 클 때 home과 contact은 적용 안되는 문제가 발생
// 스크롤 이벤트는 스크롤 될 때마다 발생 클릭했을 때 발생하는 스크롤
// wheel 이벤트는 사용자가 직접 스코롤 할 때 발생

window.addEventListener('wheel', () => {
  if(window.scrollY === 0 ) {
    selectedNavIndex = 0;
  } else if (
    // window의 scroll Y와 보여지는 window의 높이(view port) 의 합이 
    // document의 전체 높이와 같을 경우 (사용자가 페이지의 마지막까지 wheel 했을 경우) 
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight
    ) {
      //  navItems의 길이(6)에서 1을 뺀 5번째의 인덱스를 선택
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});
