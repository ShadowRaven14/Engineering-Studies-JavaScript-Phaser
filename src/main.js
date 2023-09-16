var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 2500 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);


function preload() {
  this.load.setBaseURL('https://labs.phaser.io');

  this.load.image('sky', 'assets/skies/gradient1.png');
  this.load.image('ground', 'assets/sprites/platform.png');
  this.load.image('star', 'assets/sprites/melon.png');
  this.load.image('bomb', 'assets/sprites/mine.png');
  this.load.spritesheet('dude',
    'assets/sprites/dude.png',
    { frameWidth: 32, frameHeight: 48 }
  );
}

let platforms;
let player;

function create() {
  this.add.image(400, 300, 'sky');

  platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  player = this.physics.add.sprite(100, 450, 'dude');

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(player, platforms);
}

function update() {
  const moveSpeed = 500;
  const jumpSpeed = 800;
  if (cursors.left.isDown) {
    player.setVelocityX(moveSpeed * -1);

    player.anims.play('left', true);
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(moveSpeed);

    player.anims.play('right', true);
  }
  else {
    player.setVelocityX(0);

    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(jumpSpeed * -1);
  }
}