var cursors;
var player;
var floor;
var obstacles;
var walls;
var blockSize = 108;
var blockX, blockY;
var lastKey = 'right';
var smallObstacles;
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

        this.load.image('floor', 'assets/floor_block.png');
        this.load.image('background', 'assets/space.png');
        this.load.image('obstacle', 'assets/obstacle_block.png');
        this.load.image('ladder', 'assets/ladder_block.png');
        this.load.image('obstacle-small', 'assets/obstacle_block-small.png');
        this.load.spritesheet('player', 'assets/character_ilab.png', { frameWidth: 54, frameHeight: 59 });

    }

    create(){
        
        cursors = this.input.keyboard.createCursorKeys();

        floor = this.physics.add.staticGroup();
        obstacles = this.physics.add.staticGroup();
        smallObstacles = this.physics.add.staticGroup();
        walls = this.physics.add.staticGroup();

        let platformX;
        let platformY;
        function adaptPlatformX (size, fromRight){
            if(fromRight == true){
                platformX = (size/2) - 200;
                console.log('fromRight');
                return platformX;
            } else{
                platformX = (size/2);
                console.log('fromLeft');
                return platformX;
            }
        }
        function adaptPlatformY (size){
            platformY = (size/2) - 64;
            return platformY;
        }


        // Floor
        for(let i = 0 ; i <12 ; i++){
            
            blockX = 108 * i;
            floor.create(blockX, world.height-54,'floor');

            for(let i = 0 ; i < 12 ; i++){
                
                blockX = 108 * i;
                floor.create(blockX, world.height-162,'floor');
            }
        }

        // Obstacles

        for (let i = 5 ; i < 12 ; i++){
            
            blockX = 108 * i;
            obstacles.create(blockX, world.height-(blockSize * 2.5),'obstacle');
        }

        for (let i = 7 ; i < 12 ; i++){
            
            blockX = 108 * i;
            obstacles.create(blockX, world.height-(blockSize * 3.5), 'obstacle');
        }

        for (let i = 9 ; i < 12 ; i++){
            
            blockX = 108 * i;
            obstacles.create(blockX, world.height-(blockSize * 4.5), 'obstacle');
        }

        // Small Obstacles

        smallObstacles.create(blockSize * 7, world.height-(blockSize * 6), 'obstacle-small');
        smallObstacles.create(blockSize * 5, world.height-(blockSize * 7), 'obstacle-small');

        smallObstacles.create(blockSize * 2, world.height-(blockSize * 7), 'obstacle-small');
        smallObstacles.create(blockSize * 3, world.height-(blockSize * 7), 'obstacle-small');

        smallObstacles.create(blockSize/2, world.height-(blockSize * 7), 'obstacle-small');

        smallObstacles.create(blockSize*2, blockSize*7, 'obstacle-small');

        // Ladder 

        // Walls & upperFloor

            // Left

        for(let i = 0 ; i < 6 ; i++){
            blockX = 108/2;
            blockY = 108 * i;
            walls.create(blockX, blockY, 'obstacle');
        }
        for(let i = 0 ; i < 2 ; i++){
            blockX = 108;
            blockY = 108 * i;
            walls.create(blockX, blockY, 'obstacle').setOrigin(0,0);
        }

        walls.create(blockSize*2.5, blockSize/2, 'obstacle');

            // Right

        for(let i = 7; i < 12 ; i++){
            blockX = 108 * i;
            blockY = 108 *4; 
            walls.create(blockX, blockY, 'obstacle').setOrigin(0,0);
        }

        for(let i = 8; i < 12 ; i++){
            blockX = 108 * i;
            blockY = 108 *5; 
            walls.create(blockX, blockY, 'obstacle').setOrigin(0,0);
        }
        for(let i = 6; i < 11 ; i++){
            blockX = (108 * 10) + 7;
            blockY = 108 * i; 
            walls.create(blockX, blockY, 'obstacle').setOrigin(0,0);
        }
        
        walls.create((blockSize * 9) + 7, blockSize * 8, 'obstacle').setOrigin(0,0);



        player = this.physics.add.sprite(300, 200, 'player').setScale(2).refreshBody();

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
        this.physics.add.collider(player, obstacles);
        // this.physics.add.collider(player, smallObstacles);

        // this.playerObstaclesCollider = this.physics.add.collider(player, obstacles);
        this.playerSmallObstaclesCollider = this.physics.add.collider(player, smallObstacles);

        this.playerSmallObstaclesCollider.active = false;

        this.cameras.main.setBounds(0, 0, world.width, world.height);
        
        this.cameras.main.startFollow(player);
        this.cameras.main.setFollowOffset(0, 0);
        console.log(player.y);
        console.log(world.height-200);
        console.log(this.playerSmallObstaclesCollider);
    }

    update(){

        if(!this.playerSmallObstaclesCollider.active && player.body.touching.down){
            console.log('obstaclesFalse');
            console.log('positionTrue');
            this.playerSmallObstaclesCollider.active = true;
        }


        player.setVelocityX(0);

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