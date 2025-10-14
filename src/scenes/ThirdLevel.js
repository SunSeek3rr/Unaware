import { Global, AddCustomBounds, AddBg ,Preload, StaticGroups, Player, placeOnGrid, CreateAnims ,SetDefaultCollider, SetCameras, HasTouchedFloor, HasTouchedRestartBlock } from '../global.js';




// A changer, 1 = le numéro du niveau
const customBounds = AddCustomBounds(3);

// Verifier si customBound de FirstLevel ne s'ettends pas à toutes les scènes et donc écrase les autres

export class ThirdLevel extends Phaser.Scene{

    constructor(){
        super("ThirdLevel");
    }

    preload(){

        Preload.create(this);

    }

    create(){

        // A changer, 1 = le numéro du niveau
        AddBg(this, 3);

        // Static Groups
        StaticGroups.create(this);


        // Floor
        placeOnGrid(this, 0, 16, 'floor', 4);
        placeOnGrid(this, 0, 15, 'floor', 4);

        placeOnGrid(this, 5, 16, 'floor', 7);
        placeOnGrid(this, 5, 15, 'floor', 7);

        placeOnGrid(this, 8, 16, 'floor', 12);
        placeOnGrid(this, 8, 15, 'floor', 12);

        // Ladder
        placeOnGrid(this, 10, 12, 'ladder',12);
        placeOnGrid(this, 10, 13, 'ladder',12);
        placeOnGrid(this, 10, 14, 'ladder',12);

        placeOnGrid(this, 0, 8, 'ladder');
        placeOnGrid(this, 0, 9, 'ladder');
        placeOnGrid(this, 0, 10, 'ladder');

        placeOnGrid(this, 10, 0, 'ladder',12);
        placeOnGrid(this, 10, 1, 'ladder', 12);
        placeOnGrid(this, 10, 2, 'ladder', 12);

        // Obstacles


        // Small Obstacles


        // Half Obstacles

        // Walls & upperFloor

            // Left
            placeOnGrid(this, 0, 0, 'wall', 3);
            placeOnGrid(this, 0, 1, 'wall', 2);
            placeOnGrid(this, 0, 2, 'wall');
            placeOnGrid(this, 0, 3, 'wall');

            // Right


        // Lanternes


        this.player = new Player(this, 170, 200, 'player', customBounds);

        CreateAnims.create(this);

        SetDefaultCollider.create(this);

        // A changer, 1 = le numéro du niveau
        SetCameras.create(this, 3);

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