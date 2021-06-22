const ranks = ["Ace",'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'J', 'Q', 'K'];
const suits =[
    {
        suit: 'Hearts',
        icon: `<i class="fas fa-heart"></i>`,
        color: 'red',
    },{
        suit: 'Diamonds',
        icon: `<i class="fas fa-diamond"></i>`,
        color: 'red',
    },{
        suit: 'Spades',
        icon:`<i class="fas fa-spade"></i>`,
        color: 'black',
    },{
        suit: 'Clubs',
        icon: `<i class="fas fa-club"></i>`,
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
                suit: suits[x].suit
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

function firstCards() {

}

function checkBusted() {

}

function hit(){

}

function stand(){

}

function countPoints(){

}

function comparePoints(){

}

function keepPlaying() {

}

function clearHands(){

}