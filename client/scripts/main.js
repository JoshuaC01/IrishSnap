var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: scenes.game,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {},
      debug: false
    }
  },
};

var game = new Phaser.Game(config);
