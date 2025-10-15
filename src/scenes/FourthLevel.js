import { Global, AddCustomBounds, AddBg ,Preload, StaticGroups, Player, placeOnGrid, CreateAnims ,SetDefaultCollider, SetCameras, HasTouchedFloor, HasTouchedRestartBlock } from '../global.js';




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

        // Small Obstacles
        placeOnGrid(this, 10, 17, 'obstacle_small');

        placeOnGrid(this, 8, 16, 'obstacle_small');

        placeOnGrid(this, 7, 15, 'obstacle_small');

        placeOnGrid(this, 5, 14, 'obstacle_small');

        // Walls & upperFloor

            // Left


            // Right

        
        // Ladder


        // Lanternes


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
        }
        
    
    
    update() {
        this.player.update();

        HasTouchedFloor.update(this);
        HasTouchedRestartBlock.update(this);

        this.lanterns.children.entries.forEach(lantern => {
            lantern.anims.play('lantern', true);
        });
        this.lavas.children.entries.forEach(lava => lava.anims.play('lava', true));
    }
}