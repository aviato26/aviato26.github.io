
let list = document.querySelectorAll('li');
let infoPage = document.querySelector('.hide');
let container = document.querySelector('.container');
let liButtons = document.querySelectorAll('article')

let navAnimation = () => {
  anime({
    targets: list,
    translateX: -(container.offsetWidth / 2) / 2,
    delay: anime.stagger(200)
  })
}

list.forEach((c, i) => {
  c.addEventListener('click', (e) => {
    // we will manipulate this int for the bouncing animation when the li links are clicked

    let timer = 1500;

    // sliding animation for the nav bar
    navAnimation()

    /*
      we will set all articles to display none and then set clicked element to display block
      while also resetting the timer int so the setTimeout function will run every time the
      li links are clicked
    */
    liButtons.forEach((c, i) => {
      c.style.display = 'none';
    })
    liButtons[i].style.display = 'block'
    liButtons[i].className = 'box'
    if(infoPage.className === 'stage bounce-7'){
      infoPage.className = 'stage'
      timer = 100
    }

  // after a second and a half this will display the main section element
    setTimeout(() => {
      infoPage.className = 'stage bounce-7'
    }, timer)
  })
})
