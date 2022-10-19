let cards = document.querySelectorAll('.card_inner')
let firstClick = false
let counter = 0 
let cardPair = []

cards.forEach((card)=>{
    card.state = 'unclicked'
})

shuffle()

for(let i=0; i<cards.length; i++){
    cards[i].addEventListener('click',()=>{
        if(!firstClick){time()}
        firstClick = true        

        if(cards[i].state == 'unclicked'){
            cards[i].style.transform = 'rotateY(180deg)'
            cards[i].state = 'clicked'
            counter++
            cardPair.push(cards[i])
            check()
        }

        else if(cards[i].state == 'clicked'){
            cards[i].style.transform = 'rotateY(0deg)'
            cards[i].state = 'unclicked'
            counter--
            cardPair = []
        }
    })
}

function check(){
    if(counter==2){
        if(cardPair[0].querySelector('img').src==cardPair[1].querySelector('img').src){
            matched()
        }
        else{
            unmatched(cardPair[0],cardPair[1])
        }
    }  
}

function matched(){
    cardPair[0].state='blocked'
    cardPair[1].state='blocked'
    counter = 0
    cardPair = []
    let score = document.querySelector('#score').innerHTML
    score++
    document.querySelector('#score').innerHTML = score
}

function unmatched(x,y){
    setTimeout(()=>{
        x.style.transform = "rotateY(0deg)"
        y.style.transform = "rotateY(0deg)"
    },750)
    cardPair[0].state = 'unclicked'
    cardPair[1].state = 'unclicked'
    counter = 0
    cardPair = []
}

function time(){
    let secs = 0
    let mins = 0
    let SS
    let MM
    setInterval(()=>{
        secs++
        if(secs==60){secs=0; mins++}

        secs<10?SS=`0${secs}`:SS=`${secs}`
        mins<10?MM=`0${mins}`:SS=`${mins}`
        
        document.querySelector('#time').innerHTML = `${MM}:${SS}`
    }, 1000)
}

function shuffle(){
    let images = document.querySelectorAll('img')
    let srcs = ['joker.jpg','arrow.png','batgirl.png','batman.png','captain.jpg','darkseid.png','doctor.jpg','flash.jpg','riddler.jpg','spiderman.jpg','superman.jpg','thor.jpg','joker.jpg','arrow.png','batgirl.png','batman.png','captain.jpg','darkseid.png','doctor.jpg','flash.jpg','riddler.jpg','spiderman.jpg','superman.jpg','thor.jpg']
    
    for(let i=srcs.length-1; i>0; i--){
        let j = Math.floor(Math.random() * i)
        let temp = srcs[i]
        srcs[i] = srcs[j]
        srcs[j] = temp
      }
      
      for(let i=0; i<images.length; i++){
          images[i].src = srcs[i]
      }
}