import { Global, AddCustomBounds, AddBg ,Preload, StaticGroups, Player, placeOnGrid, CreateAnims ,SetDefaultCollider, SetCameras, HasTouchedFloor, HasTouchedRestartBlock } from '../global.js';



// A changer, 1 = le numéro du niveau
const customBounds = AddCustomBounds(2);

export class SecondLevel extends Phaser.Scene{

    constructor(){
        super("SecondLevel");
    }

    preload(){

        Preload.create(this);

    }

    create(){

        // A changer, 1 = le numéro du niveau
        AddBg(this, 2);

        // Static Groups
        StaticGroups.create(this);


        // Floor
        placeOnGrid(this, 0, 17, 'floor', 12);
        placeOnGrid(this, 0, 16, 'floor' , 12);

        // Obstacles
        placeOnGrid(this, 5, 15, 'obstacle', 12);
        placeOnGrid(this, 7, 14, 'obstacle', 12);
        placeOnGrid(this, 9, 13, 'obstacle', 12);

        placeOnGrid(this, 3, 6, 'obstacle');

        placeOnGrid(this, 5, 5, 'obstacle');
        placeOnGrid(this, 5, 6, 'obstacle');

        placeOnGrid(this, 7, 4, 'obstacle');
        placeOnGrid(this, 7, 5, 'obstacle');
        placeOnGrid(this, 7, 6, 'obstacle');

        // Small Obstacles
        placeOnGrid(this, 7, 12, 'obstacle_small');

        placeOnGrid(this, 5, 11, 'obstacle_small');

        placeOnGrid(this, 3, 10, 'obstacle_small');

        placeOnGrid(this, 1, 9, 'obstacle_small');

        placeOnGrid(this, 0, 7, 'obstacle_small');

        placeOnGrid(this, 2, 7, 'obstacle_small');

        // Half Obstacles
        placeOnGrid(this, 3, 7, 'obstacle_half_up', 8);
        // Walls & upperFloor

            // Left
                placeOnGrid(this, 0, 0, 'wall', 5);
                placeOnGrid(this, 0, 1, 'wall', 3);
        
                placeOnGrid(this, 0, 2, 'wall');

                placeOnGrid(this, 0, 9, 'wall');
    
            // Right
                placeOnGrid(this, 8, 3, 'obstacle', 12);
                placeOnGrid(this, 8, 4, 'obstacle', 12);
                placeOnGrid(this, 8, 5, 'obstacle');

                placeOnGrid(this, 10, 8, 'obstacle');
                placeOnGrid(this, 8, 9, 'obstacle', 12);
        
        // Ladder
        placeOnGrid(this, 0, 8, 'ladder');
        placeOnGrid(this, 0, 7, 'ladder');

        placeOnGrid(this, 10, 0, 'ladder',12);
        placeOnGrid(this, 10, 1, 'ladder', 12);
        placeOnGrid(this, 10, 2, 'ladder', 12);

        // Lanternes

        // Spikes
        placeOnGrid(this, 4, 6, 'spikes');
        placeOnGrid(this, 6, 6, 'spikes');
        // Lava


        this.player = new Player(this, 170, 100, 'player', customBounds);

        CreateAnims.create(this);

        SetDefaultCollider.create(this);

        // A changer, 1 = le numéro du niveau
        SetCameras.create(this, 2);

        HasTouchedFloor.create(this);
        HasTouchedRestartBlock.create(this);
        }
        
    
    
    update() {
        this.player.update();

        HasTouchedFloor.update(this);
        HasTouchedRestartBlock.update(this);

        this.lanterns.children.entries.forEach(lantern => {
            lantern.anims.play('lantern', true);
        });
    }
}