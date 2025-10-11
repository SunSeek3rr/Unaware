var cursors;
var player;
var floor;
let ladders;
var blockX, blockY;
let blockSize;
let onLadder;
var lastKey = 'right';
const world = {
    width: 1194,
    height : 1917
};
const customBounds = new Phaser.Geom.Rectangle(0, 0, world.width, world.height);

export class LadderTest extends Phaser.Scene {

    constructor() {
        super('LadderTest');
    }

    preload() {
        
        this.load.image('floor', 'assets/floor_block.png');
        this.load.image('background', 'assets/space.png');
        this.load.image('obstacle', 'assets/obstacle_block.png');
        this.load.image('ladder', 'assets/ladder_block.png');
        this.load.image('obstacle-small', 'assets/obstacle_block-small.png');
        this.load.spritesheet('player', 'assets/character_ilab.png', { frameWidth: 54, frameHeight: 59 });
    }

    create() {

        cursors = this.input.keyboard.createCursorKeys();

        floor = this.physics.add.staticGroup();
        ladders = this.physics.add.staticGroup();

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
                    console.log(i);
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
            }else if(type == 'ladder-block' && count){

            }
        }

        placeOnGrid(this, 0, 17, 'floor', 12);
        placeOnGrid(this, 0, 16, 'floor' , 12);

        //ladder

        placeOnGrid(this, 8, 15, 'ladder');
        placeOnGrid(this, 8, 14, 'ladder');

        console.log(floor);
        
        player = this.physics.add.sprite(300, 200, 'player').setScale(2).refreshBody();
        // console.log(player);
        
        player.body.setGravityY(700);
        // player.setBounce(0.2);
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

        this.physics.add.collider(player, floor);

        this.cameras.main.setBounds(0, 0, world.width, world.height);
        
        this.cameras.main.startFollow(player);
        this.cameras.main.setFollowOffset(0, 0);
        
    }

    update() {
        player.setVelocityX(0);

        const touching = this.physics.overlap(player, ladders);
        if (!touching) {
            onLadder = false;
            player.body.setGravity(700);
        }else{
            onLadder = true;
            player.body.setGravity(0);
            player.setVelocityY(0);
            if(cursors.up.isDown){
                player.setVelocityY(-150);
            }
        }
        console.log(onLadder);

        if (cursors.left.isDown)
        {
            player.setVelocityX(-400);

            player.anims.play('left', true);

            lastKey = 'left';
        }
        if (cursors.right.isDown)
        {
            player.setVelocityX(400);

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
