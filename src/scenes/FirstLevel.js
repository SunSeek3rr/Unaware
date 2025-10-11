import Global from "../global.js";

let cursors;
let player;
let floor;
let obstacles;
let walls;
let ladders;
let lantern, lanterns;
let blockSize = 108;
let blockX, blockY;
let lastKey = 'right';
let smallObstacles;
let hasTouchedFloor;
const world = {
    width: 1194,
    height : 1917
};

const customBounds = new Phaser.Geom.Rectangle(0, 0, world.width, world.height);


export class FirstLevel extends Phaser.Scene{

    constructor(){
        super("FirstLevel");
    }

    preload(){

        this.load.image('floor', 'assets/obstacle_block.png');
        this.load.image('background', 'assets/bg_block.png');
        this.load.image('obstacle', 'assets/obstacle_block.png');
        this.load.image('ladder', 'assets/ladder_block.png');
        this.load.image('obstacle-small', 'assets/one_way_block.png');
        this.load.spritesheet('player', 'assets/character_ilab.png', { frameWidth: 54, frameHeight: 59 });
        this.load.spritesheet('lantern', 'assets/lantern_block.png', { frameWidth : 54, frameHeight : 54});

    }

    create(){
        
        this.bg = this.add.tileSprite(0,0, world.width, world.height, 'background').setOrigin(0,0);

        cursors = this.input.keyboard.createCursorKeys();

        floor = this.physics.add.staticGroup();
        obstacles = this.physics.add.staticGroup();
        smallObstacles = this.physics.add.staticGroup();

        walls = this.physics.add.staticGroup();

        ladders = this.physics.add.staticGroup();

        lanterns = this.physics.add.staticGroup();

        

        function placeOnGrid(scene, x, y, type, count){
            blockX = 108 * x;
            blockY = 108 * y;

            if(type == 'floor' && !count){

                let block = scene.add.sprite(blockX, blockY, 'floor').setOrigin(0,0);
                floor.add(block);

            }
            if(type == 'obstacle' && !count){

                let block = scene.add.sprite(blockX, blockY, 'obstacle').setOrigin(0,0);
                obstacles.add(block);
                
            }
            if(type == 'obstacle-small' && !count){

                let block = scene.add.sprite(blockX, blockY, 'obstacle-small').setOrigin(0,0);
                smallObstacles.add(block);
            }
            if(type == 'wall' && !count){

                let block = scene.add.sprite(blockX, blockY, 'obstacle').setOrigin(0,0);
                walls.add(block);

            }

            if(type == 'ladder' && !count){

                let block = ladders.create(blockX, blockY, 'ladder').setOrigin(0,0);
                block.refreshBody();

            }
            if(type == 'lantern' && !count){
                lantern = scene.add.sprite(blockX,blockY, 'lantern').setScale(1.5).setOrigin(-0.2,0);
                lanterns.add(lantern);
            }


            if(type == 'floor' && count){

                for(let i = x ; i < count; i++){
                    blockX = 108 * i;
                    blockY = 108 * y;
                    
                    let block = scene.add.sprite(blockX, blockY, 'floor').setOrigin(0,0);
                    floor.add(block);

                }
            }
            if(type == 'obstacle' && count){
                
                for(let i = x ; i < count; i++){
                    blockX = 108 * i;
                    blockY = 108 * y;

                    let block = scene.add.sprite(blockX, blockY, 'obstacle').setOrigin(0,0);
                    obstacles.add(block);

                }
            }
            if(type == 'obstacle-small' && count){
                
                for(let i = x ; i < count; i++){
                    blockX = 108 * i;
                    blockY = 108 * y;

                    let block = scene.add.sprite(blockX, blockY, 'obstacle-small').setOrigin(0,0);
                    smallObstacles.add(block);
                }
            }
            if(type == 'wall' && count){
                for(let i = x ; i < count; i++){
                    blockX = 108 * i;
                    blockY = 108 * y;

                    let block = scene.add.sprite(blockX, blockY, 'obstacle').setOrigin(0,0);
                    walls.add(block);
                }
            }

            if(type == 'ladder' && count){
                for(let i = x ; i < count; i++){
                    blockX = 108 * i;
                    blockY = 108 * y;

                    let block = ladders.create(blockX, blockY, 'ladder').setOrigin(0,0);
                    block.refreshBody();
                    block.body.immovable = true;
                }
            }
            if(type == 'lantern' && count){
                for(let i = x ; i < count; i++){
                    blockX = 108 * i;
                    blockY = 108 * y;

                    let block = lanterns.create(blockX, blockY, 'lantern').setOrigin(0,0);
                    block.refreshBody();
                }
            }
        }


        // Floor

        placeOnGrid(this, 0, 17, 'floor', 12);
        placeOnGrid(this, 0, 16, 'floor' , 12);

        // Obstacles

        placeOnGrid(this, 5, 15, 'obstacle', 12);
        placeOnGrid(this, 7, 14, 'obstacle', 12);
        placeOnGrid(this, 9, 13, 'obstacle', 12);


        // Small Obstacles

        placeOnGrid(this, 7, 12, 'obstacle-small');

        placeOnGrid(this, 5, 11, 'obstacle-small');

        placeOnGrid(this, 2, 11, 'obstacle-small');
        placeOnGrid(this, 1, 11, 'obstacle-small');

        placeOnGrid(this, 0, 11, 'obstacle-small');

        placeOnGrid(this, 2, 8, 'obstacle-small');

        placeOnGrid(this, 4, 7, 'obstacle-small');

        placeOnGrid(this, 6, 6, 'obstacle-small');

        placeOnGrid(this, 4, 5, 'obstacle-small');

        placeOnGrid(this, 2, 4, 'obstacle-small');

        placeOnGrid(this, 4, 3, 'obstacle-small');
        placeOnGrid(this, 6, 3, 'obstacle-small');

        placeOnGrid(this, 0, 9, 'obstacle-small');
        

        // Walls & upperFloor

            // Left

        placeOnGrid(this, 0, 0, 'wall', 3);
        placeOnGrid(this, 0, 1, 'wall', 2);
        
        placeOnGrid(this, 0, 2, 'wall');
        placeOnGrid(this, 0, 3, 'wall');
        placeOnGrid(this, 0, 4, 'wall');
        placeOnGrid(this, 0, 5, 'wall');


            // Right

        placeOnGrid(this, 7, 3, 'wall', 12);
        placeOnGrid(this, 8, 4, 'wall', 12);

        placeOnGrid(this, 10, 5, 'wall',12);
        placeOnGrid(this, 10, 6, 'wall',12);

        placeOnGrid(this, 9, 7, 'wall',12);

        placeOnGrid(this, 10, 8, 'wall',12);
        placeOnGrid(this, 10, 9, 'wall',12);
        placeOnGrid(this, 10, 10, 'wall',12);
        
        // Ladder

        placeOnGrid(this, 0, 9, 'ladder');
        placeOnGrid(this, 0, 10, 'ladder');

        placeOnGrid(this, 10, 0, 'ladder', 12);
        placeOnGrid(this, 10, 1, 'ladder', 12);
        placeOnGrid(this, 10, 2, 'ladder', 12);

        // Lanternes

        placeOnGrid(this, 2, 1, 'lantern');

        player = this.physics.add.sprite(blockSize*1.5,blockSize, 'player').setScale(1.3).refreshBody();

        player.setGravityY(Global.gravity);

        player.setCollideWorldBounds(true);
        player.body.setBoundsRectangle(customBounds);

        this.anims.create({
            key: 'standingLeft',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
            frameRate: 7,
            repeat: -1
        });



        this.anims.create({
            key: 'standingRight',
            frames: this.anims.generateFrameNumbers('player', { start: 6, end:7 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 2, end: 5 }),
            frameRate: 10,
            repeat: -1
        });



        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end:11 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'lantern',
            frames: this.anims.generateFrameNumbers('lantern', { start: 0, end: 1 }),
            frameRate: 7,
            repeat: -1
        });

        this.physics.add.collider(player, floor, function(){
            hasTouchedFloor = true;

        });

        this.physics.add.collider(player, obstacles);
        this.physics.add.collider(player, walls);

        this.hasTouchedFloor = false;


        this.cameras.main.setBounds(0, 0, world.width, world.height);
        
        this.cameras.main.startFollow(player);
        this.cameras.main.setFollowOffset(0, 0);

        // lantern.preFX.addGlow(0xF2AD45, 2, 2, false);

        }
        
    
    
    update(){
        

        if (hasTouchedFloor) {
            
            
            smallObstacles.children.entries.forEach(obstacle => {
            const playerBottom = player.body.y + player.body.height;
            const obstacleTop = obstacle.body.y;

                if (playerBottom <= obstacleTop + 5 && player.body.velocity.y >= 0) {
                    if (!obstacle.collider) {
                        obstacle.collider = obstacle.scene.physics.add.collider(player, obstacle);
                    }
                } else {

                    if (obstacle.collider) {
                        obstacle.collider.destroy();
                        obstacle.collider = null;
                    }
                }

                if (Math.abs(playerBottom - obstacleTop) <= 5 
                    && player.body.velocity.y <= 120 
                    && cursors.down.isDown) 
                    {
                    obstacle.body.checkCollision.up = false;

                } else {

                    obstacle.body.checkCollision.up = true;
                }

        });


        }


        lantern.anims.play('lantern', true);

        player.setVelocityX(0);

        const touchingLadders = this.physics.overlap(player, ladders);

        if (!touchingLadders) {

            player.body.setGravityY(Global.gravity);

        }else if (touchingLadders){

            player.body.setGravityY(0);
            player.setVelocityY(0);

            if(cursors.up.isDown){
                player.setVelocityY(-200);
            }
            if(cursors.down.isDown){
                player.setVelocityY(200);
            }
        }

        if (cursors.left.isDown)
            {
                player.setVelocityX(-350);

                player.anims.play('left', true);

                lastKey = 'left';
            }
            if (cursors.right.isDown)
            {
                player.setVelocityX(350);

                player.anims.play('right', true);

                lastKey = 'right';
            }
            if (cursors.right.isUp && lastKey == 'right')
            {
                player.setVelocityX(0);

                player.anims.play('standingRight', true);
            }
            if (cursors.left.isUp && lastKey == 'left')
            {
                player.setVelocityX(0);

                player.anims.play('standingLeft', true);
            }

            if (cursors.up.isDown && player.body.touching.down)
            {
                player.setVelocityY(-600);
            }




    }
}