import { game } from './main.js';

export const Global = {
    gravity: 700,
    lastString : '',
    nextString : '',
    world : {
        width : 1194,
        start : {
            height : 834
        },
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
        case 0 : 
            return new Phaser.Geom.Rectangle(0, 0, Global.world.width, Global.world.start.height);
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
        case 0 :
            lvlHeight = Global.world.start.height;
            break;

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

        case 6 : 
            lvlHeight = Global.world.start.height;
            break;

        default :
            console.log('default');
            break;
    }

    if(level == 0){
        scene.bg = scene.add.sprite(0,0, 'background-ext');
        scene.bg.setOrigin(0,0);
        
    }else{
        scene.bg = scene.add.tileSprite(0,0, Global.world.width, lvlHeight, 'background').setOrigin(0,0);
    }
}





export class Preload {
    static create(scene){
        
        scene.load.image('floor', 'assets/obstacle_block.png');
        scene.load.image('floor-banner', 'assets/banner_block.png');
        scene.load.image('grass', 'assets/grass_block.png');
        scene.load.image('dirt', 'assets/dirt_block.png');
        scene.load.image('tower', 'assets/tower_ext.png');
        scene.load.image('background', 'assets/bg_block.png');
        scene.load.image('door', 'assets/door_question.png');
        scene.load.image('background-ext', 'assets/background-ext.png');
        scene.load.image('obstacle', 'assets/obstacle_block.png');
        scene.load.image('ladder', 'assets/ladder_block.png');
        scene.load.image('obstacle_small', 'assets/one_way_block.png');
        scene.load.image('spikes', 'assets/spikes_block.png');
        scene.load.image('obstacle_half', 'assets/obstacle_half_block.png');
        scene.load.spritesheet('gold', 'assets/gold_coins.png',
            { frameWidth : 108, frameHeight : 108 });
        scene.load.spritesheet('lava', 'assets/lava_block.png', {frameWidth : 54, frameHeight : 28});
        scene.load.spritesheet('player', 'assets/character_ilab.png', { frameWidth: 81.40, frameHeight: 89 });
        scene.load.spritesheet('lantern', 'assets/lantern_block.png', { frameWidth : 54, frameHeight : 54});

        scene.load.spritesheet('orb', 'assets/magic_orb.png', {
            frameWidth : 108, frameHeight: 108
        });
        
        scene.load.spritesheet('axolotl', 'assets/pnj_axolotl.png', {
            frameWidth : 64, frameHeight : 64
        });
        scene.load.spritesheet('dog', 'assets/pnj_dog.png', {
            frameWidth : 64, frameHeight : 64
        });
        scene.load.spritesheet('frog', 'assets/pnj_frog.png', {
            frameWidth : 64, frameHeight : 64
        });
        scene.load.spritesheet('snake', 'assets/pnj_snake.png', {
            frameWidth : 64, frameHeight : 64
        });
        scene.load.spritesheet('snowman', 'assets/pnj_snowman.png', {
            frameWidth : 64, frameHeight : 64
        });

        scene.load.spritesheet('bat-green', 'assets/bat-green.png', {
            frameWidth : 108, frameHeight : 108});
        scene.load.spritesheet('bat-red', 'assets/bat-red.png', {
            frameWidth : 108, frameHeight : 108});
        scene.load.spritesheet('bat-orange', 'assets/bat-orange.png', {
            frameWidth : 108, frameHeight : 108});
        
        scene.load.spritesheet('cat-blue', 'assets/cat-blue.png', {
            frameWidth : 108, frameHeight : 108});
        scene.load.spritesheet('cat-pink', 'assets/cat-pink.png', {
            frameWidth : 108, frameHeight : 108});
        scene.load.spritesheet('cat-yellow', 'assets/cat-yellow.png', {
            frameWidth : 108, frameHeight : 108});
        
        scene.load.spritesheet('eye-blue', 'assets/eye-blue.png', {
            frameWidth : 108, frameHeight : 108});
        scene.load.spritesheet('eye-green', 'assets/eye-green.png', {
            frameWidth : 108, frameHeight : 108});
        scene.load.spritesheet('eye-red', 'assets/eye-red.png', {
            frameWidth : 108, frameHeight : 108});
        
        scene.load.spritesheet('ghost-blue', 'assets/ghost-blue.png', {
            frameWidth : 108, frameHeight : 108});
        scene.load.spritesheet('ghost-yellow', 'assets/ghost-yellow.png', {
            frameWidth : 108, frameHeight : 108});
        scene.load.spritesheet('ghost-white', 'assets/ghost-white.png', {
            frameWidth : 108, frameHeight : 108});
        
        scene.load.spritesheet('rat-grey', 'assets/rat-grey.png', {
            frameWidth : 108, frameHeight : 108});
        scene.load.spritesheet('rat-red', 'assets/rat-red.png', {
            frameWidth : 108, frameHeight : 108});
        scene.load.spritesheet('rat-yellow', 'assets/rat-yellow.png', {
            frameWidth : 108, frameHeight : 108});

        scene.load.spritesheet('pumpkin-orange', 'assets/pumpkin-orange.png', {
            frameWidth : 108, frameHeight : 108});
        scene.load.spritesheet('pumpkin-pink', 'assets/pumpkin-pink.png', {
            frameWidth : 108, frameHeight : 108});
        scene.load.spritesheet('pumpkin-purple', 'assets/pumpkin-purple.png', {
            frameWidth : 108, frameHeight : 108});
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
        scene.gold = scene.physics.add.staticGroup();
        scene.orb = scene.physics.add.staticGroup();
        scene.doors = scene.physics.add.staticGroup();
        scene.characters = scene.physics.add.staticGroup();
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
        scene.gold?.clear(true);
        scene.orb?.clear(true);
        scene.doors?.clear(true);
        scene.characters?.clear(true);
    }
}





export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, bounds) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.refreshBody();
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
          this.body.allowGravity = true;
          this.setGravityY(Global.gravity);
        } else {

          this.body.allowGravity = false;
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

        case 'grass':
            block = scene.floor.create(blockX, blockY, 'grass').setOrigin(0,0);
            block.refreshBody();
            break;

        case 'dirt':
            block = scene.floor.create(blockX, blockY, 'dirt').setOrigin(0,0);
            block.refreshBody();
            break;

        case 'tower' :
            block = scene.add.sprite(blockX,blockY, 'tower');
            block.setOrigin(0,0);

        case 'floor-banner' :
            block = scene.floor.create(blockX, blockY, 'floor-banner').setOrigin(0,0);
            block.refreshBody();
            break;
        
        case 'background' : 
            block = scene.add.image(blockX, blockY, 'background').setOrigin(0,0);
            block.refreshBody();    
            break;

        case 'gold' :
            block = scene.gold.create(blockX, blockY, 'gold').setOrigin(0,0);
            block.refreshBody();
            break;

        case 'orb' :
            block = scene.orb.create(blockX, blockY, 'orb').setOrigin(0,0);
            block.refreshBody();
            break;

        case 'door' :
            block = scene.doors.create(blockX, blockY, 'door').setOrigin(0,0).setScale(2);
            block.refreshBody();
            break;

        case 'axolotl' :
            block = scene.characters.create(blockX, blockY, 'axolotl').setOrigin(0,0).setScale(2);
            block.flipX = true;
            break;
        
        case 'dog' :
            block = scene.characters.create(blockX, blockY, 'dog').setOrigin(0,0).setScale(2);
            block.flipX = true;
            break;

        case 'frog' :
            block = scene.characters.create(blockX, blockY, 'frog').setOrigin(0,0).setScale(2);
            block.flipX = true;
            break;
        
        case 'snake' :
            block = scene.characters.create(blockX, blockY, 'snake').setOrigin(0,0).setScale(2);
            block.flipX = true;
            break;
        
        case 'snowman' :
            block = scene.characters.create(blockX, blockY, 'snowman').setOrigin(0,0).setScale(2);
            block.flipX = true;
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

        if(!scene.anims.exists('bat-left-green')){
            scene.anims.create({
                key : 'bat-left-green',
                frames : scene.anims.generateFrameNumbers('bat-green', {
                start : 0, end : 1}),
                frameRate : 7,
                repeat : -1
            });
        }

        if(!scene.anims.exists('bat-right-green')){
            scene.anims.create({
                key : 'bat-right-green',
                frames : scene.anims.generateFrameNumbers('bat-green', {
                start : 2, end : 3}),
                frameRate : 7,
                repeat : -1
            });
        }

        if(!scene.anims.exists('bat-left-orange')){
            scene.anims.create({
                key : 'bat-left-orange',
                frames : scene.anims.generateFrameNumbers('bat-orange', {
                start : 0, end : 1}),
                frameRate : 7,
                repeat : -1
            });
        }

        if(!scene.anims.exists('bat-right-orange')){
            scene.anims.create({
                key : 'bat-right-orange',
                frames : scene.anims.generateFrameNumbers('bat-orange', {
                start : 2, end : 3}),
                frameRate : 7,
                repeat : -1
            });
        }

        if(!scene.anims.exists('bat-left-red')){
            scene.anims.create({
                key : 'bat-left-red',
                frames : scene.anims.generateFrameNumbers('bat-red', {
                start : 0, end : 1}),
                frameRate : 7,
                repeat : -1
            });
        }

        if(!scene.anims.exists('bat-right-red')){
            scene.anims.create({
                key : 'bat-right-red',
                frames : scene.anims.generateFrameNumbers('bat-red', {
                start : 2, end : 3}),
                frameRate : 7,
                repeat : -1
            });
        }

        if(!scene.anims.exists('orb')){
            scene.anims.create({
                key : 'orb',
                frames : scene.anims.generateFrameNumbers('orb', {
                start : 0, end : 1}),
                frameRate : 7,
                repeat : -1
            });
        }

        if(!scene.anims.exists('gold')){
            scene.anims.create({
                key : 'gold',
                frames : scene.anims.generateFrameNumbers('gold', {
                start : 0, end : 2}),
                frameRate : 7,
                repeat : -1
            });
        }

        if(!scene.anims.exists('axolotl')){
            scene.anims.create({
                key : 'axolotl',
                frames : scene.anims.generateFrameNumbers('axolotl', {
                start : 0, end : 1}),
                frameRate : 7,
                repeat : -1
            });
        }

        if(!scene.anims.exists('dog')){
            scene.anims.create({
                key : 'dog',
                frames : scene.anims.generateFrameNumbers('dog', {
                start : 0, end : 1}),
                frameRate : 7,
                repeat : -1
            });
        }

        if(!scene.anims.exists('frog')){
            scene.anims.create({
                key : 'frog',
                frames : scene.anims.generateFrameNumbers('frog', {
                start : 0, end : 1}),
                frameRate : 7,
                repeat : -1
            });
        }

        if(!scene.anims.exists('snake')){
            scene.anims.create({
                key : 'snake',
                frames : scene.anims.generateFrameNumbers('snake', {
                start : 0, end : 1}),
                frameRate : 7,
                repeat : -1
            });
        }

        if(!scene.anims.exists('snowman')){
            scene.anims.create({
                key : 'snowman',
                frames : scene.anims.generateFrameNumbers('snowman', {
                start : 0, end : 1}),
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
        case 0 :
            lvlHeight = Global.world.start.height;
            break;
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

export class Teleport{
    static create(scene, start, x, y){
        this.scene = scene;
        if(start && x && y){
            this.teleportX = x * 108;
            this.teleportY = y * 108;
            this.tolerance = 0;
            this.start = true;
        }else{
            this.teleportX = Global.world.width;
            this.teleportY = 0;
            this.tolerance = 108;
            this.start = false;
            
        }
        
        this.player = this.scene.player;
    }
    
    static update(scene, question){
        if(HasTouchedFloor.hasTouchedFloor){
            if(this.player.x >= this.teleportX - this.tolerance && this.player.y <= this.teleportY + this.tolerance){
                if(this.start){
                    SceneReset.resetAll(this.scene);
                    scene.scene.start('FirstLevel');
                }   
                else{
                    SceneReset.resetAll(this.scene);
                    scene.scene.start('questionRoom');
                }
            }

            }
        }
        
    }
// Etapes : echelle -> salle de question -> tpNextLvl
//  
// export class TeleportToNext {
//     static create(scene){
//         this.scene = scene;


//         this.scene.nextStringLvl;
//         switch(this.scene.nextLvl){
//             case 2:
//                 this.scene.nextStringLvl = 'SecondLevel';
//                 break;
//         }
//     }
//     static update(scene){
//         SceneReset.resetAll(this);
//         scene.scene.start(this.scene.nextStringLvl);
//     }
// }

export class QuestionRoom{
    
    static create(scene){
        this.scene = scene;
        this.stepConfirmation = 0;
        this.lastDoorInteracted = null;
        this.triggered = false;

        this.questionNumber = scene.questionNumber;
        console.log(this.questionNumber);
        this.question = document.querySelector(`.question--${this.questionNumber}`);

        this.question.style.opacity = 1;
        

        this.scene.doors.children.entries.forEach((door, i) => {
            this.scene.physics.add.overlap(this.scene.player, door, () => {
                
                if (Phaser.Input.Keyboard.JustDown(this.scene.cursors.up)) {
                    
                    if (this.stepConfirmation === 0 || this.lastDoorInteracted !== i) {
                        this.stepConfirmation = 1;
                        this.lastDoorInteracted = i;
                        
                        console.log(`door ${i} selected`);
                        
                    } 
                    
                    else if (this.stepConfirmation === 1 && this.lastDoorInteracted === i) {
                        
                        console.log(`door ${i} confirmed`);
                        
                        this.stepConfirmation = 0;
                        this.lastDoorInteracted = null;

                        SceneReset.resetAll(this.scene);
                        if (this.question) this.question.style.opacity = 0;
                        
                        let targetScene;
                        switch(Global.lastString){
                            case 'FirstLevel' :
                                targetScene = i === 2 ? Global.nextString : Global.lastString;
                                break;
                            case 'SecondLevel' : 
                                targetScene = i === 1 ? Global.nextString : Global.lastString;
                                break;
                            case 'ThirdLevel' :
                                targetScene = i === 0 ? Global.nextString : Global.lastString;
                                break;
                            case 'FourthLevel' : 
                                targetScene = i === 2 ? Global.nextString : Global.lastString;
                                break;
                            case 'FifthLevel' : 
                                targetScene = i === 0 ? Global.nextString : Global.lastString;
                                break;
                        }
                        
                        this.scene.scene.start(targetScene);
                    }
                }
            });
        });
                
    }

    // dans l'ordre : portes nxtLvl : 2, 1, 0, 2, 0;
    // dans l'ordre : elPerturb : 4:1, 5:2, 3:3, 4:4, 2:5;
}


export class flyingMobs extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, amplitude, speedX, globalSpeed){
        super(scene, x, y, texture);
        
        scene.add.existing(this);

        this.baseY = y;
        this.time = 0;
        // this.amplitude = 50;
        // this.speed = 0.012;
        this.amplitude = amplitude;
        this.speed = globalSpeed;

        
        // console.log(mobType);
        console.log('texture');
        switch(texture){
            case 'bat-green' :
                this.leftAnimKey = 'bat-left-green';
                this.rightAnimKey = 'bat-right-green';
                break;

            case 'bat-orange' :
                this.leftAnimKey = 'bat-left-orange';
                this.rightAnimKey = 'bat-right-orange';
                break;

            case 'bat-red' :
                this.leftAnimKey = 'bat-left-red';
                this.rightAnimKey = 'bat-right-red';
                break;

            default :
            console.log('mobDefault');
            break;
        }
        this.speedX = speedX;
    }
    
    preUpdate(time, delta, index){
        super.preUpdate(time, delta);


        this.time += delta;
        
        this.ascentSpeed = -0.05;
        this.oscillation = Math.sin(this.time * this.speed) * this.amplitude;
        this.fly = (this.time * this.ascentSpeed);
        this.y = this.baseY + this.oscillation + this.fly


        this.x += this.speedX;
        if(this.x + this.width / 2 >= (Global.world.width + 108) ){
            this.speedX = -Math.abs(this.speedX);
            this.anims.play(this.leftAnimKey);
        }
        if(this.x - this.width / 2 <= -108){
            this.speedX = Math.abs(this.speedX);
            this.anims.play(this.rightAnimKey);
        }
        
    }
}
