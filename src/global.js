export const Global = {
    gravity: 700,
    world : {
        width : 1194,
        firstLvl :{
            height : 1917  
        },
        secondLvl :{
            height: 1886
        },
        thirdLvl :{
            height : 1776
        },
        fourthLvl :{
            height : 2126 
        },
        fifthLvl : {
            height : 2154
        }

    }
};



export function AddCustomBounds(level){
    switch(level) {
        case 1 :
            return new Phaser.Geom.Rectangle(0, 0, Global.world.width, Global.world.firstLvl.height);
            break;

        case 2 :
            return new Phaser.Geom.Rectangle(0, 0, Global.world.width, Global.world.secondLvl.height);
            break;
        case 3 :
            return new Phaser.Geom.Rectangle(0, 0, Global.world.width, Global.world.thirdLvl.height);
            break;
        case 4 :
            return new Phaser.Geom.Rectangle(0, 0, Global.world.width, Global.world.fourthLvl.height);
            break;
        case 5 :
            return new Phaser.Geom.Rectangle(0, 0, Global.world.width, Global.world.fifthLvl.height);
            break;
        default :
            console.log('default');
            break;
    }
}





export function AddBg(scene,level){
    let lvlHeight;
    switch(level) {
        case 1 :
            lvlHeight = Global.world.firstLvl.height;
            break;

        case 2 :
            lvlHeight = Global.world.secondLvl.height;
            break;
        
        case 3 :
            lvlHeight = Global.world.thirdLvl.height;
            break;

        case 4 :
            lvlHeight = Global.world.fourthLvl.height;
            break;
        
        case 5 :
            lvlHeight = Global.world.fifthLvl.height;
            break;

        default :
            console.log('default');
            break;
    }
    scene.bg = scene.add.tileSprite(0,0, Global.world.width, lvlHeight, 'background').setOrigin(0,0);
}





export class Preload {
    static create(scene){
        
        scene.load.image('floor', 'assets/obstacle_block.png');
        scene.load.image('background', 'assets/bg_block.png');
        scene.load.image('obstacle', 'assets/obstacle_block.png');
        scene.load.image('ladder', 'assets/ladder_block.png');
        scene.load.image('obstacle_small', 'assets/one_way_block.png');
        scene.load.image('spikes', 'assets/spikes_block.png');
        scene.load.image('obstacle_half', 'assets/obstacle_half_block.png');
        scene.load.spritesheet('lava', 'assets/lava_block.png', {frameWidth : 54, frameHeight : 28});
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
    scene.spikes = scene.physics.add.staticGroup();
    scene.lavas = scene.physics.add.staticGroup();
    scene.halfObstacles = scene.physics.add.staticGroup();
    }

    static reset(scene){
    scene.floor?.clear(true);
    scene.obstacles?.clear(true);
    scene.smallObstacles?.clear(true);
    scene.walls?.clear(true);
    scene.ladders?.clear(true);
    scene.lanterns?.clear(true);
    scene.spikes?.clear(true);
    scene.lavas?.clear(true);
    scene.halfObstacles?.clear(true);
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
    scene.cursors = this.cursors;

    this.lastKey = 'right';
    this.scene = scene;
  }

  update() {
    this.setVelocityX(0);

    const touching = this.scene.physics.overlap(this, this.scene.ladders);
    if (this.cursors.right.isUp && this.lastKey === 'right') {
      this.setVelocityX(0);
      if(!HasTouchedFloor.hasTouchedFloor){
        this.anims.play('standingRight', false);

      }else{
        this.anims.play('standingRight', true);
      }
    }

    if (this.cursors.left.isUp && this.lastKey === 'left') {
      this.setVelocityX(0);
      this.anims.play('standingLeft', true);
    }
    if(HasTouchedFloor.hasTouchedFloor){
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
    
    
        if (this.cursors.up.isDown && this.body.touching.down) {
          this.setVelocityY(-600);
        }
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
        
        case 'obstacle_half_up' :
            block = scene.halfObstacles.create(blockX, blockY, 'obstacle_half').setOrigin(0,0);
            block.refreshBody();
            break;

        case 'obstacle_half_down' :
            block = scene.halfObstacles.create(blockX, blockY, 'obstacle_half').setOrigin(0,-1);
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
        
        case 'spikes_down':
            block = scene.spikes.create(blockX, blockY, 'spikes').setOrigin(0,-2.8);
            block.refreshBody();
            break;

        case 'spikes_up':
            block = scene.spikes.create(blockX, blockY, 'spikes').setOrigin(0,-0.9);
            block.refreshBody();
            break;

        case 'lava_up':
            block = scene.lavas.create(blockX, blockY, 'lava').setOrigin(0,0).setScale(2);
            block.refreshBody();
            break;
        
        case 'lava_down':
            block = scene.lavas.create(blockX, blockY, 'lava').setOrigin(0,-0.95).setScale(2);
            block.refreshBody();
            break;

        default :
            console.log('default');
            break;
        }

    }
}





export class CreateAnims {
    static create(scene){

        if(!scene.anims.exists('standingLeft')){
            scene.anims.create({
                key: 'standingLeft',
                frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
                frameRate: 7,
                repeat: -1
            });
        }

        if(!scene.anims.exists('standingRight')){
            scene.anims.create({
                key: 'standingRight',
                frames: scene.anims.generateFrameNumbers('player', { start: 6, end:7 }),
                frameRate: 7,
                repeat: -1
            });

        }
        if(!scene.anims.exists('left')){
            scene.anims.create({
                key: 'left',
                frames: scene.anims.generateFrameNumbers('player', { start: 2, end: 5 }),
                frameRate: 10,
                repeat: -1
            });
            
        }
        if(!scene.anims.exists('right')){
            scene.anims.create({
                key: 'right',
                frames: scene.anims.generateFrameNumbers('player', { start: 8, end:11 }),
                frameRate: 10,
                repeat: -1
            });
            
        }
        if(!scene.anims.exists('lantern')){
            scene.anims.create({
                key: 'lantern',
                frames: scene.anims.generateFrameNumbers('lantern', { start: 0, end: 1 }),
                frameRate: 7,
                repeat: -1
            });

        }
        if(!scene.anims.exists('lava')){
            scene.anims.create({
                key : 'lava',
                frames : scene.anims.generateFrameNumbers('lava', {
                start : 0, end : 2}),
                frameRate : 7,
                repeat : -1
            });
        }
    }
}





export class SetDefaultCollider {
    
    static create(scene){
        scene.defaultCollider = [];
        
    }

    static update(scene){
        
        if(HasTouchedFloor.hasTouchedFloor){
            if(scene.defaultCollider.length == 0){
                scene.defaultCollider.push(scene.physics.add.collider(scene.player, scene.obstacles));
                scene.defaultCollider.push(scene.physics.add.collider(scene.player, scene.walls));
            }

        }
    }
    static reset(scene){
        scene.defaultCollider.forEach(collider => collider.destroy());
        scene.defaultCollider = [];   
    }
}





export class SetCameras{
    static create(scene, level){
        let lvlHeight;
        switch(level) {
        case 1 :
            lvlHeight = Global.world.firstLvl.height;
            break;

        case 2 :
            lvlHeight = Global.world.secondLvl.height;
            break;
        
        case 3 :
            lvlHeight = Global.world.thirdLvl.height;
            break;

        case 4 :
            lvlHeight = Global.world.fourthLvl.height;
            break;
        
        case 5 :
            lvlHeight = Global.world.fifthLvl.height;
            break;

        default :
            console.log('default');
            break;
    }

        scene.cameras.main.setBounds(0, 0, Global.world.width, lvlHeight);
        scene.cameras.main.startFollow(scene.player);
        scene.cameras.main.setFollowOffset(0, 0);
    }
}





export class HasTouchedFloor {
    
    static hasTouchedFloor = false;

    static create(scene){
        this.hasTouchedFloor = false;

        scene.physics.add.collider(scene.player, scene.floor, () => {
            this.hasTouchedFloor = true;
        });    
    }

    static update(scene){
        
        if (this.hasTouchedFloor) {
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

            scene.physics.add.collider(scene.player, scene.halfObstacles);
        }
    }

    static reset(scene){
    this.hasTouchedFloor = false;
    }
}

export class HasTouchedRestartBlock {
    static create(scene){
        this.scene = scene;
        scene.hasTouchedSpikes = false;
        scene.hasTouchedLava = false;
        scene.hasRestarted = false;
        scene.restartBlockColliders = [];
        
    }
    
    static update(scene){ 
        if(HasTouchedFloor.hasTouchedFloor){

            if(scene.restartBlockColliders.length == 0){
                
                scene.restartBlockColliders.push(
                    scene.physics.add.collider(scene.player, scene.spikes, ()=>{
                    scene.hasTouchedSpikes = true;
                }));
        
                scene.restartBlockColliders.push(
                    scene.physics.add.collider(scene.player, scene.lavas, ()=>{
                    scene.hasTouchedLava = true;
                }));
            }
            
            
    
        }
        if((scene.hasTouchedSpikes || scene.hasTouchedLava) && !scene.hasRestarted){
            SceneReset.resetAll(scene);
            scene.scene.start(scene.scene.key);
            scene.hasRestarted = true;
        }
    }

    static reset(scene){
        scene.hasTouchedSpikes = false;
        scene.hasTouchedLava = false;
        scene.hasRestarted = false;
    }
}


class SceneReset{
    static resetAll(scene){
        HasTouchedRestartBlock.reset(scene);
        StaticGroups.reset(scene);
        SetDefaultCollider.reset(scene);
        HasTouchedFloor.reset(scene);
    }
}