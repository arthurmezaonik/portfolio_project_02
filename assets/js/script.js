const ranks = ["A",'2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suits =[
    {
        suit: 'Hearts',
        icon: '♥️',
        color: 'red',
    },{
        suit: 'Diamonds',
        icon: '♦️',
        color: 'red',
    },{
        suit: 'Spades',
        icon:'♠️',
        color: 'black',
    },{
        suit: 'Clubs',
        icon: '♣️',
        color: 'black',
    }
];
let deck = [];

// Wait for the DOM to finish loading before running the game
//Get the button elements and add event listeners to them
document.addEventListener('DOMContentLoaded', function(){
    let buttons = document.getElementsByTagName('button');

    for(let button of buttons){
        button.addEventListener('click', function(){
            if(this.getAttribute('data-type') === 'yes'){
                let messageContainer=document.getElementsByClassName('message-container')[0];
                messageContainer.style.display = 'none'
                runGame()

            }else if(this.getAttribute('data-type') === 'no'){
                let message=document.getElementById('message-text');
                message.innerText = 'Thanks For Playing With Us!';
                for(let i of buttons){
                    i.style.display='none'
                }

            }else if(this.getAttribute('data-type') === 'hit'){
                playerCard()

            }else if(this.getAttribute('data-type') === 'stand'){
                dealerTime()
            }
        })
    }
})



function runGame(){
    createDeck()
    shuffleDeck()
    playerFirstCards()
    dealerFirstCards()
}

/**
 * From the global arrays, create a shuffled deck with 52 cards * 
 */
function createDeck(){
    for (let x = 0; x < suits.length; x++){
        for (let i = 0; i < ranks.length; i++){
            let card = {
                ranks: ranks[i],
                suit: suits[x]
            }
            deck.push(card);
        }
    }
    return(deck);
}

/**
 * Shuffle the deck array
 */
function shuffleDeck(){
    deck = deck.sort(() => Math.random() - 0.5)
    return(deck);  
}

/**
 * Print the deck on the screen
 */
function printDeck(){
    let deckContainer = document.getElementById('deck');
    for (let i = 0; i < deck.length; i++){
        if(deck[i].suit.color === 'red'){
            let cardEl = `
                <div class="card red">
                    <span class="number top">
                        ${deck[i].ranks}
                    </span>
                    <p class="suit">
                        ${deck[i].suit.icon}
                    </p>
                    <span class="number bottom">
                        ${deck[i].ranks}
                    </span>
                </div>
            `;
            deckContainer.innerHTML += cardEl;
        } else{
            let cardEl = `
                <div class="card">
                    <span class="number top">
                        ${deck[i].ranks}
                    </span>
                    <p class="suit">
                        ${deck[i].suit.icon}
                    </p>
                    <span class="number bottom">
                        ${deck[i].ranks}
                    </span>
                </div>
            `;
            deckContainer.innerHTML += cardEl;
        }
        
    }
}

/**
 * Separete one card to be given to the player
 */
function playerCard(){
    let playerCards = document.getElementById('player-cards');
    let card = deck.pop()
    if(card.suit.color === 'red'){
        playerCards.innerHTML += `
            <div class="card red">
                <span class="number top p_card_value">
                    ${card.ranks}
                </span>
                <p class="suit">
                    ${card.suit.icon}
                </p>
                <span class="number bottom">
                    ${card.ranks}
                </span>
            </div>
        `;
    } else{
        playerCards.innerHTML += `
            <div class="card">
                <span class="number top p_card_value">
                    ${card.ranks}
                </span>
                <p class="suit">
                    ${card.suit.icon}
                </p>
                <span class="number bottom">
                    ${card.ranks}
                </span>
            </div>
        `;
    }
}

/**
 * Separete one card to be given to the dealer
 */
function dealerCard(){
    let dealerCards = document.getElementById('dealer-cards');
    let card = deck.pop()
    if(card.suit.color === 'red'){
        dealerCards.innerHTML += `
            <div class="card red">
                <span class="number top d_card_value">
                    ${card.ranks}
                </span>
                <p class="suit">
                    ${card.suit.icon}
                </p>
                <span class="number bottom">
                    ${card.ranks}
                </span>
            </div>
        `;
    } else{
        dealerCards.innerHTML += `
            <div class="card">
                <span class="number top d_card_value">
                    ${card.ranks}
                </span>
                <p class="suit">
                    ${card.suit.icon}
                </p>
                <span class="number bottom">
                    ${card.ranks}
                </span>
            </div>
        `;
    }
}

/**
 * Give (print) two cards to the player
 */
function playerFirstCards() {
    for (let i = 0; i <= 1 ; i++){
        playerCard()
    }
}

/**
 * Give it (print) two cards to the dealer
 */
function dealerFirstCards(){
    for (let i = 0; i <= 1 ; i++){
        dealerCard()
    }
}

function checkBusted() {

}

function dealerTime(){
    let dealerPoint = parseInt(document.getElementById('dealer-hand-points').innerText);
    while(dealerPoint < 17){
        dealerCard()
        dealerCountPoints()
    }
}

/**
 * Count de cards based on its values and return the sum.
 * Player. 
 */
function playerCountPoints(){
    let cards = document.getElementsByClassName('p_card_value');
    let points = 0;

    for(let i = 0; i< cards.length; i++){
        card=cards[i].innerText;
        if(card === "K" || card === "Q" || card === "J"){
            points += 10
        } else if(card === "A"){
            if( points + 10 > 21){
                points += 1;
            }else{
                points += 11;
            }
            
        } else{
            cardValue = parseInt(card);
            points += cardValue;
        }        
    }
    
    return points
}

/**
 * Count de cards based on its values and return the sum.
 * Dealer. 
 */
 function dealerCountPoints(){
    let cards = document.getElementsByClassName('d_card_value');
    let points = 0;

    for(let i = 0; i< cards.length; i++){
        card=cards[i].innerText;
        if(card === "K" || card === "Q" || card === "J"){
            points += 10
        } else if(card === "A"){
            if( points + 10 > 21){
                points += 1;
            }else{
                points += 11;
            }
            
        } else{
            cardValue = parseInt(card);
            points += cardValue;
        }        
    }
    
    return points
}

function displayPoints(){
    
}

function comparePoints(){

}

function keepPlaying() {

}

function clearHands(){

}