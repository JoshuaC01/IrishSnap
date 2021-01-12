const CARD_LIST = []
const SUITES = ["clubs", "diamonds", "hearts", "spades"];
const CARDS = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];

const WEBSOCKET_URL = "ws://localhost:8888/"

for (const suite of SUITES) {
  for (const card of CARDS) {
    CARD_LIST.push({
      suite: suite,
      val: card,
      ref_name: "cards_" + suite + "_" + card
    });
  }
}

class CardDeck {
  constructor(numDecks) {
    this.numDecks = numDecks;
    this.cards = [];
    for(var i = 0; i < this.numDecks; i++) {
      this.cards = this.cards.concat(CARD_LIST);
    }
  }

  getCardList() {
    return this.cards;
  }

  shuffle() {
    var currentIndex = this.cards.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temporaryValue;
    }
  }

  getPlayerDecks(numPlayers) {
    var players = [];
    for(var i = 0; i < numPlayers; i++) {
      players[i] = [];
    }

    for(var i = 0; i < this.cards.length; i++) {
      players[i % numPlayers].push(this.cards[i]);
    }

    return players;
  }
}

class PlayerConnection {
  socket;
  id;
  constructor() {
    this.initSocket();
  }

  initSocket() {
    this.socket = new WebSocket(WEBSOCKET_URL);
    this.socket.addEventListener("open", this.onSocketOpen, false);
    this.socket.addEventListener("message", this.onSocketMessage, false);
    this.socket.addEventListener("close", this.onSocketClose, false);
    this.socket.addEventListener("error", this.onSocketError, false);
    this.id = 0;
  }

  onSocketOpen(event) {
    console.log("Player Socket Opened");
  }

  onSocketMessage(event) {
    const data = JSON.parse(event.data);
    console.log("Player Recieved", data);
  }

  onSocketClose(event) {
    console.log("Player Socket Closed");
  }

  onSocketError(event) {
    console.log("Player Socket Error");
  }

  sendMessage(msg) {
    this.socket.send(JSON.stringify({
      msg: msg,
      player: this.id,
    }));
  }
}

scenes.game = {
  preload: function() {
    console.log("Preload");
    this.backgroundColor = "#04911E";
    //Load card images
    for (card of CARD_LIST) {
      this.load.image(card.ref_name, "assets/img/cards/" + card.val + "_" + card.suite + "_white.png");
    }
    this.objects = {};
    this.objects.camera = this.cameras.add(0, 0, 800, 600);
  },

  create: function() {
    console.log("Create");
    this.objects.camera.setBackgroundColor(this.backgroundColor);

    this.objects.clubsCard = this.add.sprite(400, 300, 'cards_clubs_2').setInteractive();

    this.playerCon = new PlayerConnection();

    this.objects.clubsCard.on('pointerdown', function(pointer) {
      console.log("Card Clicked");
      this.scene.playerCon.sendMessage("Test Message");
    })
  },

  update: function() {
    //console.log("Update");
    //this.objects.clubsCard.x = game.input.activePointer.x;
    //this.objects.clubsCard.y = game.input.activePointer.y;
  }
}
