var game = new Phaser.Game(600, 600);
var speed = 500;
var dodger = {
    preload: function() {
        //Chargement image
        this.load.image('fond', 'assets/fond.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('zombie', 'assets/mechant.png');
    },
    create: function() {
        //setup + affichage
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'fond');
        this.player = game.add.sprite(300, 500, 'player');
        this.player.anchor.set(0.5);
        game.physics.arcade.enable(this.player);
        this.cursors = game.input.keyboard.createCursorKeys();
        this.zombie = game.add.group();
        this.timer = game.time.events.loop(200, this.addZombie, this);
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#fff" });
    },
    update: function() {
        //Logique du jeu
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -speed;
        }
        if (this.cursors.right.isDown) {
            this.player.body.velocity.x = speed;
        }
        if (this.cursors.up.isDown) {
            this.player.body.velocity.y = -speed;
        }
        if (this.cursors.down.isDown) {
            this.player.body.velocity.y = speed;
        }
        if (this.player.inWorld == false) {
            this.restart();
        }
        game.physics.arcade.overlap(this.player, this.zombie, this.restart, null, this);
    },
    restart: function() {
        game.state.start('dodger');
    },
    addZombie: function() {
        var pos = Math.floor(Math.random() * 550) + 1;
        var zombie = game.add.sprite(pos, -50, 'zombie');
        game.physics.arcade.enable(zombie);
        zombie.body.gravity.y = 200;

        this.zombie.add(zombie);
        zombie.checkWorldBounds = true;
        zombie.outOfBoundsKill = true;

        this.score += 10;
        this.labelScore.text = this.score
    }
};

game.state.add('dodger', dodger);
game.state.start('dodger');