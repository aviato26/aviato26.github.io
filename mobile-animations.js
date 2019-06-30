
let articles = {
  nodes: [...document.querySelectorAll('.mobile-mode article')],
  clientY: 0,
  clientX: 0,
  rotate: 0,
  flipped: false,
  activeCard: 0,
  switchCard(int){
    if(this.clientY < -30){
      this.nodes.forEach((c, i) => {
        if(c.className === 'card currentCard'){
          c.className = 'card flipback'
          c.style.setProperty('--posY', this.clientY)
          c.style.setProperty('--rotX', this.rotate)
        } else if(c.className === 'card'){
          c.className = 'card currentCard'
        } else if(c.className === 'contactCard'){
          c.className = 'card'
        }
      })
    }
  },
  flipCard(){
    /*
      if the client swipes over the articles element the card will start to flip
      and the velocity (adding 5 for velocity) will be added to the flip speed
    */
    return (this.clientY < 0) ? this.rotate+=15 : this.rotate = 0
  }
}

// var for traversing upon events
let navbar = document.querySelector('nav');
let selectedPage = document.querySelector('.infoContainer');
let mobileContainer = document.querySelectorAll('.mobile-active');

// events for hover in desktop mode

articles.nodes.map((c, i) => {
  c.addEventListener('touchstart', (e) => {
    articles.activeCard = i;
    articles.flipped = false;
  })

  c.addEventListener('touchmove', (e) => {
    articles.clientY = e.changedTouches[0].clientY - e.changedTouches[0].screenY - 200;
    articles.clientX = e.changedTouches[0].clientX - window.innerWidth / 2;
    articles.flipped = true
    /*
      as the client moves up the y axis we will update the activated article node
      with the events current position
    */

    articles.nodes[i].style.transform = `translateY(${articles.clientY}px) rotateX(${articles.rotate}deg)`
    articles.flipCard()
  })

  c.addEventListener('touchend', (e) => {
    // as the event ends we will switch the z-index of the current and next article nodes

    // created flipped key so when card is touched the switchCard method will not fire until touchmove event is activated
    if(articles.flipped){
       articles.switchCard(i)
    } else {
      // once the card is clicked and not flipped that cards modal window will display

      mobileContainer[i].className = 'mobile-container'
    }
  })

  c.addEventListener('animationend', (e) => {

    //after animation ends resetting position
    c.style.transform = 'translateY(0%) rotateX(0deg)'
    c.className = 'contactCard'
  })
})

// event listener to close the modal window
mobileContainer.forEach((c, i) => {
  c.addEventListener('touchstart', (e) => {
    if(e.target.textContent === 'X'){
      c.className = 'mobile-active'
    }
  })
})
