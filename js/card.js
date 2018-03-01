class Deck {
    constructor() {
        this.deck = [];
        this.drawnCardsArr = [];
    }

    // Generate a deck of cards
    createDeck() {
        this.drawnCardsArr = [];
        const card = (suits, values) => {
            this.name = values.nameValue + ' of ' + suits.suit;
            this.suits = suits;
            this.values = values;

            return {
                name: this.name,
                suits: this.suits,
                values: this.values
            }
        }

        const values = [
            { nameValue: "A", value: 14 },
            { nameValue: "K", value: 13 },
            { nameValue: "Q", value: 12 },
            { nameValue: "J", value: 11 },
            { nameValue: "10", value: 10 },
            { nameValue: "9",  value: 9 },
            { nameValue: "8",  value: 8 },
            { nameValue: "7",  value: 7 },
            { nameValue: "6",  value: 6 },
            { nameValue: "5",  value: 5 },
            { nameValue: "4",  value: 4 },
            { nameValue: "3",  value: 3 },
            { nameValue: "2",  value: 2 }
        ];

        const suits = [
            { suit: "club", rank: 1 },
            { suit: "spade", rank: 2 },
            { suit: "heart",  rank: 3 },
            { suit: "diamond", rank: 4 },
        ];
  
        for (let suit in suits) {
            for (let value in values) {
                this.deck.push(card(suits[suit], values[value]));
            }
        }
    }

    // Create card as a node
    createNode(suitName,nameValue) {
        let card = document.createElement("div");
        let value = document.createElement("div");
        let suit = document.createElement("div");
        card.className = `card ${suitName}`;
        value.className = "card__value";
        suit.className = `card__suit card__suit-${suitName}`;
        value.innerHTML = nameValue;
        card.appendChild(value);
        card.appendChild(suit);
        return card;
    }

    // Render/print the generated deck of cards
    printDeck() {
        const deck = this.deck;
        let renderDeck = document.getElementById("renderDeck");
        let showDeck = document.getElementById("showDeck");
        let createDeckBtn = document.getElementById("createDeck");
        let shuffleCardsBtn = document.getElementById("shuffleCards");
        let drawnCardNumSubmit = document.getElementById("drawnCardNumSubmit");
        let sortCardsBtn = document.getElementById("sortCards");

        if (deck.length === 0) {
            let alertNode = document.createElement("div");
            alertNode.innerHTML = '<span class="alert">No card in deck</span>';
            renderDeck.appendChild(alertNode);
            showDeck.innerHTML = `<h3 class="render-container__cards-total">Number of cards in deck: ${deck.length} </h3>`;
            createDeckBtn.disabled = false;
            shuffleCardsBtn.disabled = true;
            sortCardsBtn.disabled = true;
            drawnCardNumSubmit.disabled = true;
        } 
        else {
            for(let card in deck) {
                let suitName = deck[card].suits.suit;
                let nameValue = deck[card].values.nameValue;
                let newcardNode = this.createNode(suitName, nameValue);
                renderDeck.appendChild(newcardNode);               
                showDeck.innerHTML = `<h3 class="render-container__cards-total">Number of cards in deck: ${deck.length} </h3>`;
            }

            createDeckBtn.disabled = true;
            shuffleCardsBtn.disabled = false;
            sortCardsBtn.disabled = false;
            drawnCardNumSubmit.disabled = false;
            document.getElementsByClassName("drawn-cards-area")[0].style.display = "block";
        }
    }

    // Shuffle the deck
    shuffleDeck() {
        let deck = this.deck;
        let currentIndex = deck.length,
            tempValue, randIndex;

        while (0 != currentIndex) {
            randIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            tempValue = deck[currentIndex];
            deck[currentIndex] = this.deck[randIndex];
            deck[randIndex] = tempValue;
        }
    }

    // Draw cards from deck
    drawCards(numOfCards) {
        let showDrawnCards = document.getElementById('showDrawnCards');
        let alertMessage = document.getElementById("drawnCardsMsg");
        let alertMsg = document.getElementById("alert"); 
        let currentDeck = this.deck;

        if(alertMsg) {
            alertMsg.innerHTML = "";
        }
        
        if (numOfCards > currentDeck.length) {
            alertMessage.innerHTML = 'You have less cards in your deck than the entered number.';
        }
        else if (numOfCards < 0) {         
            alertMessage.innerHTML = 'You have entered a negative number.';
        }
        else if (!(numOfCards == parseInt(numOfCards, 10))) {
            alertMessage.innerHTML = 'Enter a positive integer number.';
        }
        else if (currentDeck.length !== 0) { 
                alertMessage.innerHTML = '';
                for (let c = 0; c < numOfCards; c++) {
                    let randomIndex = Math.floor(Math.random() * currentDeck.length);
                    let drawnCard = currentDeck[randomIndex];
                    this.drawnCardsArr.push(drawnCard);
                    currentDeck.splice(randomIndex, 1);
                    let suitName = drawnCard.suits.suit;
                    let nameValue = drawnCard.values.nameValue;
                    let card = this.createNode(suitName, nameValue);
                    showDrawnCards.appendChild(card);                    
                }
            }
            else {
                alertMessage.innerHTML = 'No Cards to draw from deck. Deck is empty.';
            }
        return this.drawnCardsArr;
    }

    // Sort the shuffled deck
    sortDeck() {
        this.deck.sort(function (a, b) {
            return a.suits.rank - b.suits.rank || b.values.value - a.values.value;
        });
    }   

    // Sort the drawn cards
    sortDrawnCards() {
        let showDrawnCards = document.getElementById("showDrawnCards");
        let sortedCards = this.drawnCardsArr.sort(function (a, b) {
            return a.suits.rank - b.suits.rank || b.values.value - a.values.value;
        });

        if (sortedCards.length == 0) {
            showDrawnCards.innerHTML = '<span class="alert" id="alert">No card has drawn</span>'; 
        } else {
            for(let card in sortedCards) {
                let suitName = sortedCards[card].suits.suit;
                let nameValue = sortedCards[card].values.nameValue;
                let newcardNode = this.createNode(suitName, nameValue);
                showDrawnCards.appendChild(newcardNode);   
            }
        }
    }

    // Clear the deck
    clearDeck() {
        let renderDeck = document.getElementById('renderDeck');
        while (renderDeck.firstChild) {
            renderDeck.removeChild(renderDeck.firstChild);
        }        
    }

    // Clear drawn cards 
    clearDrawnCards() {
        let drawnCards = document.getElementById('showDrawnCards');
        while (drawnCards.firstChild) {
            drawnCards.removeChild(drawnCards.firstChild);
        }       
    }
}





// Object creation
let deck = new Deck();

// Call to action
const createBtn = document.getElementById('createDeck');
createBtn.addEventListener("click", function() {
  deck.clearDrawnCards();
  deck.clearDeck();
  deck.createDeck();
  deck.printDeck();
});

const shuffleBtn = document.getElementById('shuffleCards');
shuffleBtn.addEventListener('click', function () {
    deck.clearDeck();
    deck.shuffleDeck();
    deck.printDeck();
});

const sortBtn = document.getElementById('sortCards');
sortBtn.addEventListener('click', function () {
    deck.clearDeck();
    deck.sortDeck();
    deck.printDeck();
});

const drawnBtn = document.getElementById('drawnCardNumSubmit');
drawnBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let drawnCardsNum = document.getElementById('drawnNumInput').value;
    deck.drawCards(drawnCardsNum);
    deck.clearDeck();
    deck.printDeck();
});

const sortDrawnBtn = document.getElementById('sortDrawnCard');
sortDrawnBtn.addEventListener('click', function () {
    deck.clearDrawnCards();
    deck.sortDrawnCards();
});
