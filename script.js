// script.js

// Card data with basic attributes
const cards = [
    { name: 'Mercury', image: 'images/mercury.jpg', size: 4879, mass: 0.33, temperature: 167, distance: 57.9 },
    { name: 'Venus', image: 'images/venus.jpg', size: 12104, mass: 4.87, temperature: 464, distance: 108.2 },
    { name: 'Earth', image: 'images/earth.jpg', size: 12756, mass: 5.97, temperature: 15, distance: 149.6 },
    { name: 'Mars', image: 'images/mars.jpg', size: 6792, mass: 0.642, temperature: -65, distance: 227.9 },
    { name: 'Jupiter', image: 'images/jupiter.jpg', size: 142984, mass: 1898, temperature: -110, distance: 778.5 },
    { name: 'Saturn', image: 'images/saturn.jpg', size: 120536, mass: 568, temperature: -140, distance: 1434 },
    { name: 'Uranus', image: 'images/uranus.jpg', size: 51118, mass: 86.8, temperature: -195, distance: 2871 },
    { name: 'Neptune', image: 'images/neptune.jpg', size: 49528, mass: 102, temperature: -200, distance: 4495 }
  ];
  
  let player1Deck = [], player2Deck = [];
  let currentPlayer = 1; // Tracks which player's turn it is
  let player1Card, player2Card;
  let attributeSelectionEnabled = false; // Controls if attribute selection is allowed
  
  // Initialize game by shuffling cards and dealing to players
  function initializeGame() {
    const shuffledCards = cards.sort(() => Math.random() - 0.5);
    player1Deck = shuffledCards.slice(0, shuffledCards.length / 2);
    player2Deck = shuffledCards.slice(shuffledCards.length / 2);
    startRound();
  }
  
  // Start a new round, dealing one card to each player
  function startRound() {
    if (player1Deck.length === 0 || player2Deck.length === 0) {
      endGame();
      return;
    }
    player1Card = player1Deck.shift();
    player2Card = player2Deck.shift();
    displayCard('player1-card', player1Card, false);
    displayCard('player2-card', player2Card, false);
    updateTurnIndicator();
    enableActions(true); // Enable attribute selection
  }
  
  // Display card information, hiding stats if not revealed
  function displayCard(elementId, card, showStats) {
    const cardDiv = document.getElementById(elementId);
    cardDiv.innerHTML = `
      <h3>${card.name}</h3>
      <img src="${card.image}" alt="${card.name}">
      ${showStats ? `
      <div class="attributes">
        <ul>
          <li>Size: ${card.size} km</li>
          <li>Mass: ${card.mass} x10²⁴ kg</li>
          <li>Temperature: ${card.temperature}°C</li>
          <li>Distance: ${card.distance} million km</li>
        </ul>
      </div>` : ``}
    `;
  }
  
  // Update display to show current player's turn
  function updateTurnIndicator() {
    document.getElementById('turn-indicator').innerText = `It's Player ${currentPlayer}'s turn to choose an attribute`;
  }
  
  // Enable or disable attribute selection buttons
  function enableActions(enable) {
    attributeSelectionEnabled = enable;
    const actionsDiv = document.getElementById('actions');
    actionsDiv.innerHTML = enable ? `
      <button onclick="selectAttribute('size')">Size</button>
      <button onclick="selectAttribute('mass')">Mass</button>
      <button onclick="selectAttribute('temperature')">Temperature</button>
      <button onclick="selectAttribute('distance')">Distance</button>
    ` : '';
  }
  
  // Handle attribute selection, reveal stats, and compare attributes
  function selectAttribute(attribute) {
    if (!attributeSelectionEnabled) return; // Ignore clicks if selection is disabled
    attributeSelectionEnabled = false; // Disable further selection until the next round
  
    displayCard('player1-card', player1Card, true);
    displayCard('player2-card', player2Card, true);
    enableActions(false); // Disable attribute buttons
    compareAttributes(attribute);
  }
  
  // Compare chosen attribute between players and determine winner
  function compareAttributes(attribute) {
    const player1Value = player1Card[attribute];
    const player2Value = player2Card[attribute];
    let winner = 0;
  
    const higherWins = ['size', 'mass', 'temperature'];
    const lowerWins = ['distance'];
  
    if (higherWins.includes(attribute)) {
      winner = player1Value > player2Value ? 1 : player1Value < player2Value ? 2 : 0;
    } else {
      winner = player1Value < player2Value ? 1 : player1Value > player2Value ? 2 : 0;
    }
  
    const resultDiv = document.getElementById('result');
    if (winner === 1) {
      resultDiv.innerText = 'Player 1 wins this round!';
      player1Deck.push(player1Card, player2Card);
    } else if (winner === 2) {
      resultDiv.innerText = 'Player 2 wins this round!';
      player2Deck.push(player1Card, player2Card);
    } else {
      resultDiv.innerText = "It's a tie!";
      player1Deck.push(player1Card);
      player2Deck.push(player2Card);
    }
  
    showNextRoundButton();
  }
  
  // Display "Next Round" button
  function showNextRoundButton() {
    document.getElementById('next-round').innerHTML = '<button class="game-button" onclick="nextRound()">Next Round</button>';
  }
  
  // Reset for next round, switch player, and start a new round
  function nextRound() {
    document.getElementById('result').innerText = '';
    document.getElementById('next-round').innerHTML = '';
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    startRound();
  }
  
  // End the game and declare the winner based on deck sizes
  function endGame() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerText = player1Deck.length > player2Deck.length
      ? 'Player 1 wins the game!'
      : player1Deck.length < player2Deck.length
        ? 'Player 2 wins the game!'
        : "It's a draw!";
    enableActions(false);
  }
  
  // Initialize the game
  initializeGame();