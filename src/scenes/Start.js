var cursors;
var player;
var platforms;
let baseSize;
var lastKey = 'right';
const world = {
    width: 1194,
    height : 834*2
};
const customBounds = new Phaser.Geom.Rectangle(0, 0, world.width, world.height);

export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {

        //  The ship sprite is CC0 from https://ansimuz.itch.io - check out his other work!
        this.load.image('ground', 'assets/platform.png');
        this.load.image('background', 'assets/space.png');
        this.load.spritesheet('player', 'assets/character_ilab.png', { frameWidth: 54, frameHeight: 59 });
    }

    create() {

        cursors = this.input.keyboard.createCursorKeys();

        platforms = this.physics.add.staticGroup();
        console.log(world.height);

        for(let i = 0; i < 4; i++){
            baseSize = 400 * i;
            platforms.create(baseSize, world.height-16, 'ground');

            for(let i = 0; i < 4; i++){
            baseSize = 400 * i;
            platforms.create(baseSize, world.height-48, 'ground');
        }
            for(let i = 0; i < 4; i++){
            baseSize = 400 * i;
            platforms.create(baseSize, world.height-72, 'ground');
        }
        }


        // platforms.create(0, world.height/2, 'ground');
        // platforms.create(1230/2, world.height/2, 'ground');
        // platforms.create(1908/2, world.height/2, 'ground');
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

        platforms.create(0, adaptPlatformY(3172), 'ground');
        platforms.create(adaptPlatformX(746), adaptPlatformY(3022), 'ground');
        platforms.create(adaptPlatformX(1479), adaptPlatformY(2862), 'ground');
        platforms.create(adaptPlatformX(2211), adaptPlatformY(2692), 'ground');
        platforms.create(adaptPlatformX(1055), adaptPlatformY(2452), 'ground');
        platforms.create(0, adaptPlatformY(2222), 'ground');
        platforms.create(adaptPlatformX(985), adaptPlatformY(1982), 'ground');
        platforms.create(adaptPlatformX(2020), adaptPlatformY(1912), 'ground');

        console.log(platforms);
        
        
        player = this.physics.add.sprite(300, 200, 'player').setScale(2).refreshBody();
        console.log(player);
        
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

        this.physics.add.collider(player, platforms);

        this.cameras.main.setBounds(0, 0, world.width, world.height);
        
        this.cameras.main.startFollow(player);
        this.cameras.main.setFollowOffset(0, 0);
        
    }

    update() {
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
