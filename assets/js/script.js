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

function runGame(){

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
                <span class="number top player">
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
                <span class="number top player">
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
                <span class="number top">
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
                <span class="number top">
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

/**
 * Give action to the player choices.
 * Hit, give one more card to player.
 * Stand, start dealer time.
 */
function choices(){
    let buttons = document.getElementsByTagName('button');

    for(let button of buttons){
        button.addEventListener('click', function(){
            if(this.getAttribute('data-type') === 'hit'){
                playerCard()
            }else if(this.getAttribute('data-type') === 'stand'){
                dealerTime()
            }
        })
    }
}

function dealerTime(){

}

function countPoints(){
    let cardValue = document.getElementsByClassName('player');
    let points = 0;
    for (let card = 0; card <= cardValue.length; card++){
        if (cardValue[card].innerText === "J" || cardValue[card].innerText ==="Q" || cardValue[card].innerText === "K"){
            points += 10
        }else if (cardValue[card].innerText === 'A'){
            if (points + 10 > 21){
                points +=1
            } else {
                points += 10
            }
        }else {
            points += parseInt(cardValue[card].innerText)
        }
    }
    return points
}

function comparePoints(){

}

function keepPlaying() {

}

function clearHands(){

}