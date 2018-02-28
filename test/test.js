const Deck = require('./index');

test('Deck is a class', () => {
    expect(typeof Deck.prototype.constructor).toEqual('function');
});

test('Deck can create an array of length 52', () => {
    const deck = new Deck();
    const arr = deck.createDeck();
    expect(arr.length).toEqual(52);
});

test('createNode() can create an html node element', () => {
    const deck = new Deck();
    const node = deck.createNode();
    expect(node && node.nodeType && node.nodeType === 1).toEqual(true);
});

test('printDeck() returns all cards as array', () => {
    const deck = new Deck();
    deck.createDeck();
    const arr = deck.printDeck();
    expect(arr.length).toEqual(52); 
});

test('drawCards() returns an array of random cards drawn of given number', () => {
    const deck = new Deck();
    deck.createDeck();
    const arr = deck.drawCards(5);
    expect(arr.length).toEqual(5);
});

test('drawCards() returns error message for negative number input', () => {
    const deck = new Deck();
    deck.createDeck();
    expect(deck.drawCards(-10)).toEqual("You have entered a negative number.");
});

test('drawCards() returns error message for string input', () => {
    const deck = new Deck();
    deck.createDeck();
    expect(deck.drawCards("abc")).toEqual("Enter a positive integer number.");
});

test('drawCards() returns error message for float input', () => {
    const deck = new Deck();
    deck.createDeck();
    expect(deck.drawCards(12.56)).toEqual("Enter a positive integer number.");
});

test('drawCards() returns error message if drawn cards number is greater than number of cards in the deck', () => {
    const deck = new Deck();
    deck.createDeck();
    expect(deck.drawCards(80)).toEqual("You have less cards in your deck than the entered number.");
});

test('sortDeck() returns sorted deck. First with suit, then with values.', () => {
    const deck = new Deck();
    deck.createDeck();
    const arr = deck.sortDeck();
    expect(arr[0].name).toEqual("A of club");
    expect(arr[13].name).toEqual("A of spade");
    expect(arr[26].name).toEqual("A of heart");
    expect(arr[51].name).toEqual("2 of diamond");
    expect(arr[10].name).toEqual("4 of club");
    expect(arr[35].name).toEqual("5 of heart");
});

test('sortDrawnCards() returns array of sorted drawn cards', () => {
    const deck = new Deck();
    deck.createDeck();
    deck.drawCards(52);
    const arr = deck.sortDrawnCards();
    expect(arr[0].name).toEqual("A of club");
    expect(arr[13].name).toEqual("A of spade");
    expect(arr[27].name).toEqual("K of heart");
    expect(arr[33].name).toEqual("7 of heart");
    expect(arr[39].name).toEqual("A of diamond");
    expect(arr[49].name).toEqual("4 of diamond");
});

