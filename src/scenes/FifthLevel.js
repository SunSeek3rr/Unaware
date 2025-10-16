import { Global, AddCustomBounds, AddBg ,Preload, StaticGroups, Player, placeOnGrid, CreateAnims ,SetDefaultCollider, SetCameras, HasTouchedFloor, HasTouchedRestartBlock, Teleport } from '../global.js';




// A changer, 1 = le numéro du niveau
const customBounds = AddCustomBounds(5);

export class FifthLevel extends Phaser.Scene{

    constructor(){
        super("FifthLevel");
    }

    preload(){

        Preload.create(this);

    }

    create(){

        // A changer, 1 = le numéro du niveau
        AddBg(this, 5);

        // Static Groups
        StaticGroups.create(this);


        // Floor
        placeOnGrid(this, 0, 19, 'floor', 3);

        placeOnGrid(this, 4, 19, 'floor');
        placeOnGrid(this, 4, 18, 'floor');

        placeOnGrid(this, 6, 19, 'floor');
        placeOnGrid(this, 6, 18, 'floor');

        placeOnGrid(this, 8, 19, 'floor', 12);
        placeOnGrid(this, 8, 18, 'floor', 12);
        placeOnGrid(this, 9, 17, 'floor', 12);

        // Obstacles
        placeOnGrid(this, 3, 14, 'obstacle', 8);

        placeOnGrid(this, 3, 13, 'obstacle', 5);
        placeOnGrid(this, 6, 13, 'obstacle', 8);

        placeOnGrid(this, 6, 9, 'obstacle');
        placeOnGrid(this, 8, 9, 'obstacle');

        // Small Obstacles
        placeOnGrid(this, 10, 15, 'obstacle_small', 12);

        placeOnGrid(this, 8, 14, 'obstacle_small');
        placeOnGrid(this, 8, 13, 'obstacle_small', 12);

        placeOnGrid(this, 3, 11, 'obstacle_small');
        placeOnGrid(this, 4, 10, 'obstacle_small');
        placeOnGrid(this, 5, 9, 'obstacle_small');

        placeOnGrid(this, 9, 8, 'obstacle_small');
        placeOnGrid(this, 8, 7, 'obstacle_small');

        placeOnGrid(this, 6, 7, 'obstacle_small');

        placeOnGrid(this, 4, 6, 'obstacle_small');

        placeOnGrid(this, 1, 5, 'obstacle_small');

        placeOnGrid(this, 2, 3, 'obstacle_small');
        placeOnGrid(this, 4, 3, 'obstacle_small');
        placeOnGrid(this, 6, 3, 'obstacle_small');

        // Half Obstacles
        placeOnGrid(this, 0, 14, 'obstacle_half_up', 3);

        // Walls & upperFloor

            // Left
            placeOnGrid(this, 0, 13, 'wall', 2);
            placeOnGrid(this, 0, 12, 'wall', 2);

            placeOnGrid(this, 0, 7, 'wall', 3);
            
            placeOnGrid(this, 0, 6, 'wall');
            placeOnGrid(this, 2, 6, 'wall');

            placeOnGrid(this, 0, 5, 'wall');
            placeOnGrid(this, 0, 4, 'wall');

            // Right
            placeOnGrid(this, 6, 10, 'wall', 12);

            placeOnGrid(this, 10, 9, 'wall', 12);
            placeOnGrid(this, 10, 8, 'wall', 12);
            placeOnGrid(this, 10, 7, 'wall', 12);

            placeOnGrid(this, 8, 3, 'wall', 12);
        
        // Ladder
        placeOnGrid(this, 10, 16, 'ladder', 12);
        placeOnGrid(this, 10, 15, 'ladder', 12);

        placeOnGrid(this, 10, 2, 'ladder', 12);
        placeOnGrid(this, 10, 1, 'ladder', 12);
        placeOnGrid(this, 10, 0, 'ladder', 12);

        // Lanternes

        // Spikes

        // Lave

        placeOnGrid(this, 3, 19, 'lava_down');
        placeOnGrid(this, 5, 19, 'lava_down');
        placeOnGrid(this, 7, 19, 'lava_down');

        placeOnGrid(this, 5, 13, 'lava_down');
        placeOnGrid(this, 2, 13, 'lava_down');

        placeOnGrid(this, 9, 9, 'lava_down');
        placeOnGrid(this, 7, 9, 'lava_down');

        placeOnGrid(this, 1, 6, 'lava_down');

        this.player = new Player(this, 270, 200, 'player', customBounds);

        CreateAnims.create(this);

        SetDefaultCollider.create(this);

        // A changer, 1 = le numéro du niveau
        SetCameras.create(this, 5);

        HasTouchedFloor.create(this);
        HasTouchedRestartBlock.create(this);

        Teleport.create(this);
        }
        
    
    
    update() {
        this.player.update();
        Teleport.update(this, 5);

        SetDefaultCollider.update(this);
        HasTouchedFloor.update(this);
        HasTouchedRestartBlock.update(this);
        

        this.lanterns.children.entries.forEach(lantern => {
            lantern.anims.play('lantern', true);
        });

        this.lavas.children.entries.forEach(lava => lava.anims.play('lava', true));
    }
}