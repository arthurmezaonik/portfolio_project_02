//  VARIABLES

//Audio
let bgAudio = document.getElementById('bgaudio');
let winAudio = document.getElementById('winaudio');
let loseAudio = document.getElementById('loseaudio');

//Deck
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
    // Add listeners to buttons
    let buttons = document.getElementsByTagName('button');

    for(let button of buttons){
        button.addEventListener('click', function(){

            // Start game button
            if(this.getAttribute('data-type') === 'start-game'){

                // Start background music
                bgAudio.play();
                bgAudio.volume = .5;

                // Check if the form is not empty
                let playerName = document.getElementById('fname').value;
                let playrChips = document.getElementById('chips').value;
                if(playerName === "" || playrChips === ""){
                    this.disabled = true;
                    this.disabled = false;

                }else if (parseInt(playrChips) < 50) {
                    this.disabled = true;
                    this.disabled = false;
                } else {
                    this.disabled = false;

                    // Turn off the message                    
                    let messageContainer=document.getElementsByClassName('first-message')[0];
                    messageContainer.style.display = 'none';

                    //Display game table
                    let gameTable = document.getElementsByClassName('game-table')[0];
                    gameTable.style.display = 'block'
                    
                    //Run the game
                    runGame();
                }

            // Instruction button
            }else if (this.getAttribute('data-type') === 'instruction'){
                instructions();
            
            // Reload button
            } else if (this.getAttribute('data-type') === 'reload'){
                location.reload();

            // Settings button
            };
        });
    };
});

/**
 * Run the game.
 */
function runGame(){

    displayTableContent()

   //Create and shuffle the deck 
    createDeck();
    //printDeck(); (not done yet)
    shuffleDeck();

    //setTimeout(function(){
        //moveCards() (not done yet)

        setTimeout(function(){
            playerFirstCards();
            dealerFirstCards();
            displayPoints();
            choices();
            checkPlayerBusted();
            
        }, 1000);
    //},500)
}

/**
 * Display the table content
 */
function displayTableContent(){
    let table = document.getElementsByClassName('player-dealer')[0];
    let name = document.getElementById('fname').value;

    table.innerHTML = `
        <!-- Dealer side -->
        <div class="dealer">
            <h2 class="subtitle">Dealer's Hand</h2>
            <div class = "dealer-hand">
                <div class="dealer-cards" id='dealer-cards'>
                
                </div>
                <p><span class = "hand-points">0</span> points</p>
            </div>                
        </div>

        <hr>

        <!-- Player side -->
        <div class="player">
            <h2 class="subtitle">${name}'s Hand</h2>
            <div class = "player-hand">
                <div class="player-cards" id="player-cards">
                
                </div>
                <p><span class = "hand-points">0</span> points</p>
            </div>
            <div class="player-choices">
                <button data-type='hit' class="circle-btn hit--btn">
                    <i class="fas fa-hand-point-up"></i>
                    <p>Hit</p>
                </button>
                <button data-type='stand' class="circle-btn stand--btn">
                    <i class="fas fa-hand-paper"></i>
                    <p>Stand</p>
                </button>
            </div>                
        </div>

        <!-- How to add a card:
            <div class="card">
                <span class="number top">A</span>
                <p class="suit"><i class="fas fa-heart"></i></p>
                <span class="number bottom">A</span>
            </div>
        -->

        <div id="deck">
            
        </div>
    `;
}



// DECK FUNCTIONS
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
    deckContainer.innerHTML = ` `

    for (let i = 0; i < deck.length; i++){
        if(deck[i].suit.color === 'red'){
            let cardEl = `
                <div class="deck-card red">
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
                <div class="deck-card">
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
    positionDeck()
}

/**
 * Position the cards on the screen
 */
function positionDeck(){
    let cards = document.getElementsByClassName('deck-card');
    let container = document.getElementById('deck');
    let containerWidth = container.clientWidth;
    let cardLeft = 0;
    let cardTop = 0;

    for (let i = 0; i < cards.length; i++){
      if(cardLeft < containerWidth){
        cards[i].style.left = cardLeft + 'px';
        cards[i].style.top = cardTop + 'px';
        cards[i].style.transition = 'top 1s linear, left 1s linear';

        cardLeft += 100;

      } else if (cardLeft => containerWidth){
        cardLeft = 0
        cardTop += 125

        cards[i].style.left = cardLeft + 'px';
        cards[i].style.top = cardTop + 'px';
        cards[i].style.transition = 'top 1s linear, left 1s linear';
    }
  }
}

/**
 * Move the all the cards for the same place
 */
function moveCards(){
    let cards = document.getElementsByClassName('deck-card');
    for (let i=0; i < cards.length; i++){
        let cardRank = cards[i].children[0].innerText;
        let cardSuit = cards[i].children[1].innerText;
        

        let deck = shuffleDeck();
        for (let x=0; x < deck.length ;x++){
            if (deck[x].ranks === cardRank && deck[x].suit.icon === cardSuit){
                setTimeout(function(){
                    cards[x].style.left = 50 + 'px';
                    cards[x].style.top = 50 + 'px';
                    cards[x].style.transition = 'top 0.5s linear, left 0.5s linear';
                }, i * 100);
            } else {
                continue;
            }
        }
    }
}



//PLAYER FUNCTIONS
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
 * Give (print) two cards to the player
 */
 function playerFirstCards() {
    for (let i = 0; i <= 1 ; i++){
        playerCard();
    }
}

/**
 * Give action for the player buttons
 */
 function choices(){
    let buttons = document.getElementsByTagName('button');

    for(let button of buttons){
        button.addEventListener('click', function(){            
            //Hit button
            if(button.getAttribute('data-type') === 'hit'){
                hit();
            //Stand button
            }else if(button.getAttribute('data-type') === 'stand'){
                stand();
            }
        })
    }
}

/**
 * Give one more card to player, 
 * uptade the points, and check if the player goes busted
 */
 function hit(){
    playerCard();
    displayPoints();
    checkPlayerBusted();
}

/**
 * End player round and start dealer's
 */
function stand(){
    displayPoints();
    dealerTime();
};

/**
 * Check if the player is busted.
 */
 function checkPlayerBusted() {
    let points = parseInt(document.getElementsByClassName('hand-points')[1].innerText);
    // If points grater than 21
    if (points > 21){
        let messageContainer = document.getElementsByClassName("message-container")[0];
        
        //Show message
        messageContainer.style.display = 'block';
        messageContainer.innerHTML = `
            <h2><span class ="red-bold">YOU ARE BUSTED!</span> More luck next time.</h2>
            <p>Do you want to keep playing?</p>
            <div class= "btn-container">                
                <button data-type="yes" class="btn yes--btn">
                    <i class="fas fa-thumbs-up"></i>    
                    <p>Yes</p>
                </button>
                <button data-type="no" class="btn no--btn">
                    <i class="fas fa-thumbs-down"></i>
                    <p>No</p>
                </button>
            </div>        
        `;
        yesOrNo();
        
        // Updating points
        let loseContainer = document.getElementById('lose');
        let score = parseInt(loseContainer.innerText);
        score += 1;
        loseContainer.innerText = score;
    }
}

/**
 * Give action to the Yes and No buttons to keep playing
 */
function yesOrNo(){
    let buttons = document.getElementsByTagName('button');
    for(let button of buttons){
        button.addEventListener('click', function(){

            // Yes button
            if(this.getAttribute('data-type') === 'yes'){
                let messageContainer=document.getElementsByClassName('message-container')[0];
                messageContainer.style.display = 'none'               
        
                // Clear deck and hands
                deck = [];
                clearHands();
                
                // Run the game
                runGame();
            
            // No button
            }else if(this.getAttribute('data-type') === 'no'){
                let messageContainer = document.getElementsByClassName('message-container')[0];
                let buttons = document.getElementsByClassName('btn');
                
                // Display a thank you message
                messageContainer.innerHTML = `<p>Thanks For Playing With Us!</p>`;

                for(let button of buttons){
                    if(this.getAttribute('data-type') === 'yes' || this.getAttribute('data-type') === 'no'){
                        button.style.display='none';
                    }                    
                }
            }
        })
    }
}

/**
 * Count de cards based on its values and return the sum.
 * fot the player. 
 */
 function playerCountPoints(){
    let cards = document.getElementsByClassName('p_card_value');
    let points = 0;
    let aceCard = 0;

    for(let i = 0; i< cards.length; i++){
        card=cards[i].innerText;
        if(card === "K" || card === "Q" || card === "J"){
            points += 10;
        } else if(card === "A"){
            aceCard += 1 ;        
        } else{
            cardValue = parseInt(card);
            points += cardValue;
        }        
    }
    
    // Check the value if A = 1 or A = 11. Choses the better option.
    if (aceCard > 0){
        let minCalc = points + (aceCard * 1);
        let maxCalc = points + (aceCard * 11);

        if(maxCalc > 21){
            points = minCalc;
        } else if (maxCalc <= 21){
            points = maxCalc;
        };
    }
    return points;
}



//DEALER FUNCTIONS
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
 * Display a unknown card for the dealer
 */
function dealerFakeCard(){
    let dealerCards = document.getElementById('dealer-cards');
    dealerCards.innerHTML += `
        <div class="fake-card">
            <span class="number top">
                ?
            </span>
            <p class="suit">
                ?
            </p>
            <span class="number bottom">
                ?
            </span>
        </div>
    `;
}

/**
 * Give it (print) the fake and one more card to the dealer
 */
function dealerFirstCards(){
    dealerFakeCard();
    dealerCard();
}

/**
 * Check if the dealer is busted.
 */
 function checkDealerBusted() {
    let points = parseInt(document.getElementsByClassName('hand-points')[0].innerText);
    if (points > 21){
        let messageContainer = document.getElementsByClassName("message-container")[0];
        
        //Show message
        messageContainer.style.display = 'block';
        messageContainer.innerHTML = `
            <h2><span class ="red-bold">WELL DONE!</span> You beat us.</h2>
            <p>Do you want to keep playing?</p>
            <div class= "btn-container">                
                <button data-type="yes" class="btn yes--btn">
                    <i class="fas fa-thumbs-up"></i>    
                    <p>Yes</p>
                </button>
                <button data-type="no" class="btn no--btn">
                    <i class="fas fa-thumbs-down"></i>
                    <p>No</p>
                </button>
            </div>       
        `;
        yesOrNo();

        // Updating points
        let winContainer = document.getElementById('win');
        let score = parseInt(winContainer.innerText);
        score += 1;
        winContainer.innerText = score;
    }

}

/**
 * Give one more card to the dealer, until it reaches 17 points or more.
 * After that, compare the points to check the winner.
 */
function dealerTime(){
    // Display the fake card as none
    let fakeCard = document.getElementsByClassName('fake-card')[0];    
    fakeCard.style.display = 'none';
    
    // Give the second card to the dealer and uptdate the points
    dealerCard();
    displayPoints();
    let dealerPoint = parseInt(document.getElementsByClassName('hand-points')[0].innerText);

    while(dealerPoint < 17){
        dealerCard()
        displayPoints()
        dealerPoint = parseInt(document.getElementsByClassName('hand-points')[0].innerText);
        checkDealerBusted();
    }

    comparePoints();  
}

/**
 * Count de cards based on its values and return the sum.
 * Dealer. 
 */
 function dealerCountPoints(){
    let cards = document.getElementsByClassName('d_card_value');
    let points = 0;
    let aceCard = 0;

    for(let i = 0; i< cards.length; i++){
        card=cards[i].innerText;
        if(card === "K" || card === "Q" || card === "J"){
            points += 10;
        } else if(card === "A"){
            aceCard += 1;            
        } else{
            cardValue = parseInt(card);
            points += cardValue;
        }        
    }

    if (aceCard > 0){
        let minCalc = points + (aceCard * 1);
        let maxCalc = points + (aceCard * 11);

        if(maxCalc > 21){
            points = minCalc;
        } else if (maxCalc <= 21){
            points = maxCalc;
        };
    }    
    return points;
}



//BOTH FUNCTIONS
/**
 * Display hand points.
 */
function displayPoints(){
    let pointContainer = document.getElementsByClassName('hand-points');
    pointContainer[0].innerText = dealerCountPoints();
    pointContainer[1].innerText = playerCountPoints();
}

/**
 * Compare the player and dealer points and return a winner.
 */
function comparePoints(){
    let points = document.getElementsByClassName("hand-points");

    let dpoint = points[0].innerText;
    let ppoint = points[1].innerText;

    if(ppoint > dpoint && ppoint <= 21 || dpoint > 21){
        //Just display the message.
        //Points already updated on checkDealerBusted function
        if(dpoint > 21){
            //Display message
            winMessage();
        
            //Display message and update points
        } else{
            //Display message
            winMessage();
        
            // Updating points
            let winContainer = document.getElementById('win');
            let score = parseInt(winContainer.innerText);
            score += 1;
            winContainer.innerText = score;
        }    
        
    } else if(dpoint > ppoint && dpoint <= 21 || ppoint > 21){
        //Display message
        loseMessage();

        // Updating points
        let loseContainer = document.getElementById('lose');
        let score = parseInt(loseContainer.innerText);
        score += 1;
        loseContainer.innerText = score;

    } else{
        //Display message
        tieMessage();
        
        //Updating points
        let tieContainer = document.getElementById('tie');
        let score = parseInt(tieContainer.innerText);
        score += 1;
        tieContainer.innerText = score;
    }
}

/**
 * Display a message if the player win
 */
function winMessage(){
    let messageContainer = document.getElementsByClassName("message-container")[0];
    
    //Show message
    messageContainer.style.display = 'block';
    messageContainer.innerHTML = `
        <h2><span class ="red-bold">WELL DONE!</span> You beat us.</h2>
        <p>Do you want to keep playing?</p>
        <div class= "btn-container">                
            <button data-type="yes" class="btn yes--btn">
                <i class="fas fa-thumbs-up"></i>    
                <p>Yes</p>
            </button>
            <button data-type="no" class="btn no--btn">
                <i class="fas fa-thumbs-down"></i>
                <p>No</p>
            </button>
        </div>        
    `;
    yesOrNo();
}

/**
 * Display a message if the player lose
 */
function loseMessage(){
    let messageContainer = document.getElementsByClassName("message-container")[0];
    
    //Show message
    messageContainer.style.display = 'block';
    messageContainer.innerHTML = `
        <h2><span class ="red-bold">YOU LOSE!</span> More luck next time.</h2>
        <p>Do you want to keep playing?</p>
        <div class= "btn-container">                
            <button data-type="yes" class="btn yes--btn">
                <i class="fas fa-thumbs-up"></i>    
                <p>Yes</p>
            </button>
            <button data-type="no" class="btn no--btn">
                <i class="fas fa-thumbs-down"></i>
                <p>No</p>
            </button>
        </div>        
    `;        
    yesOrNo();
}

/**
 * Display a message if there is a tie.
 */
function tieMessage(){
    let messageContainer = document.getElementsByClassName("message-container")[0];
    
    //Show message
    messageContainer.style.display = 'block';
    messageContainer.innerHTML = `
        <h2>We have a <span class ="red-bold">TIE!</span></h2>
        <p>Do you want to keep playing?</p>
        <div class= "btn-container">                
            <button data-type="yes" class="btn yes--btn">
                <i class="fas fa-thumbs-up"></i>    
                <p>Yes</p>
            </button>
            <button data-type="no" class="btn no--btn">
                <i class="fas fa-thumbs-down"></i>
                <p>No</p>
            </button>
        </div>        
    `;        
    yesOrNo();
}

/**
 * Clears player and dealer hand, and point"
 */
function clearHands(){
    let dealer = document.getElementById('dealer-cards');
    dealer.innerHTML = "";

    let dpoints = document.getElementsByClassName('hand-points')[0]
    dpoints.innerText = '0';

    let player = document.getElementById('player-cards');
    player.innerHTML = "";

    let ppoints = document.getElementsByClassName('hand-points')[1]
    ppoints.innerText = '0'; 
}



//PAGE FUNCTIONS
/**
 * Display list with game instructions
 */
function instructions(){
    let instructionContainer = document.getElementsByClassName("instruction-container")[0];
    
    //Display instructions
    instructionContainer.style.display = "block";
    instructionContainer.innerHTML = `
        <div id="up-list" class = "wrapper">
            <ul>
                <li>
                    <input type="checkbox" id="list-item-1">
                    <label for="list-item-1" class="first subtitle">Objective</label>
                    <ul>
                        <li>The main goal is to get as close to 21 points as you can.</li>
                        <li>Be careful, if you pass 21 points you will lose the game.</li>
                    </ul>
                </li>
                <li>
                    <input type="checkbox" id="list-item-2">
                    <label for="list-item-2" class="subtitle">Card Points</label>
                    <ul>
                        <li>Cards from 2-10: the points corresponde the card value.</li>
                        <li>The J, Q and K: 10 points.</li>
                        <li>Aces: 1 point or 11 points.</li>
                    </ul> 
                </li>
                <li>
                    <input type="checkbox" id="list-item-3">
                    <label for="list-item-3" class="subtitle">Player Options</label>
                    <ul>
                        <li>Hit: Get another card.</li>
                        <li>Stand: The player doesn't want more cards.</li>
                    </ul>
                </li>
                <li>
                    <input type="checkbox" id="list-item-4">
                    <label for="list-item-4" class="last subtitle">The Game</label>
                    <ul>
                        <li>The player and the dealer will receive two cards each.</li>
                        <li>One of the dealer card will be hidden and all the other cards will face up. </li>
                        <li>The player choses between Stand or Hit.</li>
                        <li>If the player choses to stand, or goes busted, it'll start the dealer round. </li>
                        <li>The dealer turns up the hidden card.
                        <li>The dealer must "buy" cards until he has 17 points or more on his hand.</li>
                        <li>If no one goe busted, the winner is who has more points on the hand.</li>
                        <li>If both have the same points, or both got a blackjeck, it's a tie.</li>
                    </ul>
                </li>
            </ul>

            <p class="info">*Those are the rules for this game, you can find different ways to play in another websites or casinos, be aware of the rules from were you are playing.</p>

            <button data-type="close" class = "circle-btn"><i class="far fa-times-circle"></i></button>
        </div>
    `;
    
    //Close button
    let buttons = document.getElementsByTagName('button');
    for(let button of buttons){
        button.addEventListener('click', function(){
            if(this.getAttribute('data-type') === 'close'){
                instructionContainer.style.display = 'none';
            }
        })
    }
}
