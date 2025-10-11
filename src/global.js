export const Global = {
    gravity: 700,
    world : {
        width : 1194,
        height : 1917
    }
};

export const AddCustomBounds = {
    create : new Phaser.Geom.Rectangle(0, 0, Global.world.width, Global.world.height)
}





export class Preload {
    static create(scene){
        
        scene.load.image('floor', 'assets/obstacle_block.png');
        scene.load.image('background', 'assets/bg_block.png');
        scene.load.image('obstacle', 'assets/obstacle_block.png');
        scene.load.image('ladder', 'assets/ladder_block.png');
        scene.load.image('obstacle_small', 'assets/one_way_block.png');
        scene.load.spritesheet('player', 'assets/character_ilab.png', { frameWidth: 54, frameHeight: 59 });
        scene.load.spritesheet('lantern', 'assets/lantern_block.png', { frameWidth : 54, frameHeight : 54});
    }
}





export class StaticGroups {
    static create(scene){
    scene.floor = scene.physics.add.staticGroup();
    scene.obstacles = scene.physics.add.staticGroup();
    scene.smallObstacles = scene.physics.add.staticGroup();
    scene.walls = scene.physics.add.staticGroup();
    scene.ladders = scene.physics.add.staticGroup();
    scene.lanterns = scene.physics.add.staticGroup();
    }
}





export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, bounds) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setScale(1.5).refreshBody();
    this.setGravityY(Global.gravity);

    if (bounds) {
      this.body.setBoundsRectangle(bounds);
    }

    this.cursors = scene.input.keyboard.createCursorKeys();
    this.lastKey = 'right';
    this.scene = scene;
  }

  update() {
    this.setVelocityX(0);

    const touching = this.scene.physics.overlap(this, this.scene.ladders);

    if (!touching) {
      this.setGravityY(Global.gravity);
    } else {
      this.setGravityY(0);
      this.setVelocityY(0);
      if (this.cursors.up.isDown) {
        this.setVelocityY(-300);
      }
      if (this.cursors.down.isDown) {
        this.setVelocityY(300);
      }
    }

    if (this.cursors.left.isDown) {
      this.setVelocityX(-300);
      this.anims.play('left', true);
      this.lastKey = 'left';
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(300);
      this.anims.play('right', true);
      this.lastKey = 'right';
    }

    if (this.cursors.right.isUp && this.lastKey === 'right') {
      this.setVelocityX(0);
      this.anims.play('standingRight', true);
    }

    if (this.cursors.left.isUp && this.lastKey === 'left') {
      this.setVelocityX(0);
      this.anims.play('standingLeft', true);
    }

    if (this.cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-600);
    }
  }
}





export function placeOnGrid (scene, x, y, type, count){

    let blockX, blockY;
    for (let i = x; i < (count || x + 1); i++) {
        blockX = 108 * i;
        blockY = 108 * y;

        let block;
        switch (type) {
        case 'floor':
            block = scene.floor.create(blockX, blockY, 'floor').setOrigin(0, 0);
            block.refreshBody();
            break;

        case 'obstacle':
            block = scene.obstacles.create(blockX, blockY, 'obstacle').setOrigin(0, 0);
            block.refreshBody();
            break;

        case 'obstacle_small':
            block = scene.smallObstacles.create(blockX, blockY, 'obstacle_small').setOrigin(0, 0);
            block.refreshBody();
            break;

        case 'wall':
            block = scene.walls.create(blockX, blockY, 'obstacle').setOrigin(0, 0);
            block.refreshBody();
            break;

        case 'ladder':
            block = scene.ladders.create(blockX, blockY, 'ladder').setOrigin(0, 0);
            block.refreshBody();
            block.body.immovable = true;
            break;

        case 'lantern':
            block = scene.lanterns.create(blockX, blockY, 'lantern').setOrigin(0, 0).setScale(1.5);
            block.refreshBody();
            break;
        }

    }
}





export class CreateAnims {
    static create(scene){
        scene.anims.create({
            key: 'standingLeft',
            frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
            frameRate: 7,
            repeat: -1
        });

        scene.anims.create({
            key: 'standingRight',
            frames: scene.anims.generateFrameNumbers('player', { start: 6, end:7 }),
            frameRate: 7,
            repeat: -1
        });

        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers('player', { start: 2, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers('player', { start: 8, end:11 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'lantern',
            frames: scene.anims.generateFrameNumbers('lantern', { start: 0, end: 1 }),
            frameRate: 7,
            repeat: -1
        });
    }
}





export class SetDefaultCollider {
    
    static create(scene){
        scene.physics.add.collider(scene.player, scene.obstacles);
        scene.physics.add.collider(scene.player, scene.walls);    
    }
}





export class SetCameras{
    static create(scene){
        scene.cameras.main.setBounds(0, 0, Global.world.width, Global.world.height);
        scene.cameras.main.startFollow(scene.player);
        scene.cameras.main.setFollowOffset(0, 0);
    }
}





export class HasTouchedFloor {
    static create(scene){
        
        scene.hasTouchedFloor = false;

        scene.physics.add.collider(scene.player, scene.floor, () => {
            scene.hasTouchedFloor = true;
        });    
    }

    static update(scene){
        
        if (scene.hasTouchedFloor) {
            scene.smallObstacles.children.entries.forEach(obstacle => {
                
                const playerBottom = scene.player.body.y + scene.player.body.height;
                const obstacleTop = obstacle.body.y;

                if (playerBottom <= obstacleTop + 5 && scene.player.body.velocity.y >= 0) {
                    
                    if (!obstacle.collider) {
                        obstacle.collider = scene.physics.add.collider(scene.player, obstacle);
                    }

                } else {
                    
                    if (obstacle.collider) {
                        obstacle.collider.destroy();
                        obstacle.collider = null;
                    }
                }

                if (
                    Math.abs(playerBottom - obstacleTop) <= 5 &&
                    scene.player.body.velocity.y <= 120 &&
                    scene.cursors.down.isDown
                ) {
                    obstacle.body.checkCollision.up = false;
                } else {
                    obstacle.body.checkCollision.up = true;
                }
            });
        }
    }
}
