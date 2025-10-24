import { Global, AddCustomBounds, AddBg ,Preload, StaticGroups, Player, placeOnGrid, CreateAnims ,SetDefaultCollider, SetCameras, HasTouchedFloor, HasTouchedRestartBlock } from '../global.js';




// A changer, 1 = le numéro du niveau
const customBounds = AddCustomBounds(0);

export class Start extends Phaser.Scene{

    constructor(){
        super("Start");
    }

    preload(){

        Preload.create(this);

    }

    create(){

        // A changer, 1 = le numéro du niveau
        AddBg(this, 0);

        // Static Groups
        StaticGroups.create(this);

        placeOnGrid(this, 7, 5, 'tower');
        // Floor
        placeOnGrid(this, 0, 6, 'grass', 12);
        placeOnGrid(this, 0, 7, 'dirt', 12);

        // Obstacles


        // Small Obstacles


        // Walls & upperFloor

            // Left


            // Right

        
        // Ladder


        // Lanternes


        this.player = new Player(this, 270, 200, 'player', customBounds);

        CreateAnims.create(this);

        SetDefaultCollider.create(this);

        // A changer, 1 = le numéro du niveau
        SetCameras.create(this, 0);

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