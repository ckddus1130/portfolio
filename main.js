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
    scrollIntoView(link);
  }
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

function scrollIntoView(selector){
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: "smooth"});
}

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

  projects.forEach((project) => {
    console.log(project.dataset.type);
    if(filter === '*' || filter === project.dataset.type){
      project.classList.remove('invisible');
    } else{
      project.classList.add('invisible');
    }
  });
  
})
