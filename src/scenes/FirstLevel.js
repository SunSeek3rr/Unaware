import { AddCustomBounds ,Preload, StaticGroups, Player, placeOnGrid, CreateAnims ,SetDefaultCollider, SetCameras, HasTouchedFloor } from '../global.js';

const world = {
  width: 1194,
  height: 1917
};

const customBounds = AddCustomBounds.create;


export class FirstLevel extends Phaser.Scene{

    constructor(){
        super("FirstLevel");
    }

    preload(){

        Preload.create(this);

    }

    create(){
        this.cursors = this.input.keyboard.createCursorKeys();

        this.bg = this.add.tileSprite(0,0, world.width, world.height, 'background').setOrigin(0,0);

        // Static Groups
        StaticGroups.create(this);


        // Floor

        placeOnGrid(this, 0, 17, 'floor', 12);
        placeOnGrid(this, 0, 16, 'floor' , 12);

        // Obstacles

        placeOnGrid(this, 5, 15, 'obstacle', 12);
        placeOnGrid(this, 7, 14, 'obstacle', 12);
        placeOnGrid(this, 9, 13, 'obstacle', 12);


        // Small Obstacles

        placeOnGrid(this, 7, 12, 'obstacle_small');

        placeOnGrid(this, 5, 11, 'obstacle_small');

        placeOnGrid(this, 2, 11, 'obstacle_small');
        placeOnGrid(this, 1, 11, 'obstacle_small');

        placeOnGrid(this, 0, 11, 'obstacle_small');

        placeOnGrid(this, 2, 8, 'obstacle_small');

        placeOnGrid(this, 4, 7, 'obstacle_small');

        placeOnGrid(this, 6, 6, 'obstacle_small');

        placeOnGrid(this, 4, 5, 'obstacle_small');

        placeOnGrid(this, 2, 4, 'obstacle_small');

        placeOnGrid(this, 4, 3, 'obstacle_small');
        placeOnGrid(this, 6, 3, 'obstacle_small');

        placeOnGrid(this, 0, 9, 'obstacle_small');
        

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

        this.player = new Player(this, 300, 200, 'player', customBounds);

        CreateAnims.create(this);

        SetDefaultCollider.create(this);

        SetCameras.create(this);

        HasTouchedFloor.create(this);
        }
        
    
    
    update() {
        this.player.update();

        HasTouchedFloor.update(this);

        this.lanterns.children.entries.forEach(lantern => {
            lantern.anims.play('lantern', true);
        });
    }
}