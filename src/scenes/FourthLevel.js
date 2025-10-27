import { Global, AddCustomBounds, AddBg ,Preload, StaticGroups, Player, placeOnGrid, CreateAnims ,SetDefaultCollider, SetCameras, HasTouchedFloor, HasTouchedRestartBlock, Teleport } from '../global.js';




// A changer, 1 = le numéro du niveau
const customBounds = AddCustomBounds(4);

export class FourthLevel extends Phaser.Scene{

    constructor(){
        super("FourthLevel");
    }

    preload(){

        Preload.create(this);

    }

    create(){

        // A changer, 1 = le numéro du niveau
        AddBg(this, 4);

        // Static Groups
        StaticGroups.create(this);


        // Floor
        placeOnGrid(this, 0, 19, 'floor', 4);
        placeOnGrid(this, 0, 18, 'floor', 4);

        placeOnGrid(this, 5, 19, 'floor', 7);
        placeOnGrid(this, 5, 18, 'floor', 7);

        placeOnGrid(this, 8, 19, 'floor', 12);
        placeOnGrid(this, 8, 18, 'floor', 12);

        // Obstacles
        placeOnGrid(this, 4, 13, 'obstacle');
        placeOnGrid(this, 4, 14, 'obstacle');

        placeOnGrid(this, 1, 13, 'obstacle', 3);
        placeOnGrid(this, 0, 12, 'obstacle', 2);

        placeOnGrid(this, 3, 9, 'obstacle');
        placeOnGrid(this, 5, 9, 'obstacle', 7);

        placeOnGrid(this, 8, 6, 'obstacle');
        placeOnGrid(this, 6, 6, 'obstacle');

        placeOnGrid(this, 5, 5, 'obstacle');

        // Small Obstacles
        placeOnGrid(this, 10, 17, 'obstacle_small');

        placeOnGrid(this, 8, 16, 'obstacle_small');

        placeOnGrid(this, 7, 15, 'obstacle_small');

        placeOnGrid(this, 5, 14, 'obstacle_small');

        placeOnGrid(this, 0, 11, 'obstacle_small');
        placeOnGrid(this, 1, 10, 'obstacle_small');
        placeOnGrid(this, 2, 9, 'obstacle_small');

        placeOnGrid(this, 8, 10, 'obstacle_small');
        placeOnGrid(this, 10, 9, 'obstacle_small', 12);
        placeOnGrid(this, 10, 7, 'obstacle_small');

        placeOnGrid(this, 9, 6, 'obstacle_small');
        
        placeOnGrid(this, 4, 3, 'obstacle_small');
        placeOnGrid(this, 6, 3, 'obstacle_small');

        // Half Obstacles
        placeOnGrid(this, 3, 13, 'obstacle_half_down');

        placeOnGrid(this, 4, 9, 'obstacle_half_down');

        placeOnGrid(this, 7, 6, 'obstacle_half_down'),
        placeOnGrid(this, 3, 6, 'obstacle_half_up', 6);


        // Walls & upperFloor

            // Left
            placeOnGrid(this, 0, 5, 'wall', 4);
            placeOnGrid(this, 0, 4, 'wall', 3);

            placeOnGrid(this, 0, 3, 'wall');
            placeOnGrid(this, 0, 2, 'wall');

            placeOnGrid(this, 0, 0, 'wall', 4);

            // Right
            placeOnGrid(this, 8, 3, 'wall', 12);
        
        // Ladder
        placeOnGrid(this, 10, 8, 'ladder', 12);
        placeOnGrid(this, 10, 7, 'ladder', 12);

        placeOnGrid(this, 10, 2, 'ladder', 12);
        placeOnGrid(this, 10, 1, 'ladder', 12);
        placeOnGrid(this, 10, 0, 'ladder', 12);

        // Lanternes

        // Spikes
        placeOnGrid(this, 3, 13, 'spikes_up');
        placeOnGrid(this, 4, 9, 'spikes_up');

        placeOnGrid(this, 7, 6, 'spikes_up');
        placeOnGrid(this, 4, 5, 'spikes_down');

        // Lave
        placeOnGrid(this, 4, 19, 'lava_down');
        placeOnGrid(this, 7, 19, 'lava_down');

        this.player = new Player(this, 270, 200, 'player', customBounds);

        CreateAnims.create(this);

        SetDefaultCollider.create(this);

        // A changer, 1 = le numéro du niveau
        SetCameras.create(this, 4);

        HasTouchedFloor.create(this);
        HasTouchedRestartBlock.create(this);

        Teleport.create(this);
        }
        
    
    
    update() {
        this.player.update();
        
        HasTouchedFloor.update(this);
        SetDefaultCollider.update(this);
        HasTouchedRestartBlock.update(this);

        Global.lastString = 'FourthLevel';
        Global.nextString = 'FifthLevel';
        
        
        this.lanterns.children.entries.forEach(lantern => {
            lantern.anims.play('lantern', true);
        });
        this.lavas.children.entries.forEach(lava => lava.anims.play('lava', true));
        // QuestionRoom.update(this);
        Teleport.update(this);
    }
}