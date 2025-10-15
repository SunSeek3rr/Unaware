import { Global, AddCustomBounds, AddBg ,Preload, StaticGroups, Player, placeOnGrid, CreateAnims ,SetDefaultCollider, SetCameras, HasTouchedFloor, HasTouchedRestartBlock } from '../global.js';




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
        SetCameras.create(this, 5);

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