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
 * Take two cards from the bottom of the deck, 
 * and give it (print) for the player
 */
function playerFirstCards() {
    let playerCards = document.getElementById('player-cards');
    for (let i = 0; i <= 1 ; i++){
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
}

/**
 * Take two cards from the bottom of the deck, 
 * and give it (print) for the dealer
 */
function dealerFirstCards(){
    let dealerCards = document.getElementById('dealer-cards');
    for (let i = 0; i <= 1 ; i++){
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
}

function checkBusted() {

}

function hit(){

}

function stand(){

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