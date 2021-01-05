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

