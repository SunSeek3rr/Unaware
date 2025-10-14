import { Global, AddCustomBounds, AddBg ,Preload, StaticGroups, Player, placeOnGrid, CreateAnims ,SetDefaultCollider, SetCameras, HasTouchedFloor, HasTouchedSpikes } from '../global.js';




// A changer, 1 = le numéro du niveau
const customBounds = AddCustomBounds(1);

export class spikesTest extends Phaser.Scene{

    constructor(){
        super("spikesTest");
    }

    preload(){

        Preload.create(this);

    }

    create(){

        // A changer, 1 = le numéro du niveau
        AddBg(this, 1);

        // Static Groups
        StaticGroups.create(this);


        // Floor
        
        placeOnGrid(this, 0, 17, 'floor', 12);
        placeOnGrid(this, 0, 16, 'floor' , 12);

        // Obstacles


        // Small Obstacles


        // Walls & upperFloor

            // Left


            // Right

        
        // Ladder


        // Lanternes

        // spikes

        placeOnGrid(this, 5, 15, 'spikes');


        this.player = new Player(this, 270, 200, 'player', customBounds);

        CreateAnims.create(this);

        SetDefaultCollider.create(this);

        // A changer, 1 = le numéro du niveau
        SetCameras.create(this, 1);

        HasTouchedFloor.create(this);

        HasTouchedSpikes.create(this);
        }
        
    
    
    update() {
        this.player.update();

        HasTouchedFloor.update(this);
        HasTouchedSpikes.update(this);

        this.lanterns.children.entries.forEach(lantern => {
            lantern.anims.play('lantern', true);
        });
    }
}