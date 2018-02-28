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
            { nameValue: "9", value: 9 },
            { nameValue: "8", value: 8 },
            { nameValue: "7", value: 7 },
            { nameValue: "6", value: 6 },
            { nameValue: "5", value: 5 },
            { nameValue: "4", value: 4 },
            { nameValue: "3", value: 3 },
            { nameValue: "2", value: 2 }
        ];

        const suits = [
            { suit: "club", rank: 1 },
            { suit: "spade", rank: 2 },
            { suit: "heart", rank: 3 },
            { suit: "diamond", rank: 4 },
        ];

        for (let suit in suits) {
            for (let value in values) {
                this.deck.push(card(suits[suit], values[value]));
            }
        }
        return this.deck;
    }

    // Create card as a node
    createNode(suitName, nameValue) {
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

    printDeck() {
        const deck = this.deck;
        if (deck.length === 0) {
            return deck;
        } 
        else {
            for (let card in deck) {
                let suitName = deck[card].suits.suit;
                let nameValue = deck[card].values.nameValue;
                let newcardNode = this.createNode(suitName, nameValue);
            }
            return deck;
        }
    }

    // Draw cards from deck
    drawCards(numOfCards) {       
        const currentDeck = this.deck;
        if (numOfCards > currentDeck.length) {
            return 'You have less cards in your deck than the entered number.';
        }
        else if (numOfCards < 0) {
            return 'You have entered a negative number.';
        }
        else if (!(numOfCards == parseInt(numOfCards, 10))) {
            return 'Enter a positive integer number.';
        }
        else if (currentDeck.length !== 0) {
            for (let c = 0; c < numOfCards; c++) {
                let randomIndex = Math.floor(Math.random() * currentDeck.length);
                let drawnCard = currentDeck[randomIndex];
                this.drawnCardsArr.push(drawnCard);
                currentDeck.splice(randomIndex, 1);
            }
        }
        else {
            return 'No Cards to draw from deck. Deck is empty.';
        }
        return this.drawnCardsArr;
    }

    // Sort the shuffled deck
    sortDeck() {
        this.deck.sort(function (a, b) {
            return a.suits.rank - b.suits.rank || b.values.value - a.values.value;
        });
        return this.deck;
    }

    // Sort the drawn cards
    sortDrawnCards() {
        let sortedCards = this.drawnCardsArr.sort(function (a, b) {
            return a.suits.rank - b.suits.rank || b.values.value - a.values.value;
        });

        if (sortedCards.length == 0) {
            return "No card has drawn";
        }
        else {
            for (let card in sortedCards) {
                let suitName = sortedCards[card].suits.suit;
                let nameValue = sortedCards[card].values.nameValue;
                let newcardNode = this.createNode(suitName, nameValue);
            }
        }
        return sortedCards;
    }
}

module.exports = Deck;
