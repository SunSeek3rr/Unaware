import { Global, AddCustomBounds, AddBg ,Preload, StaticGroups, Player, placeOnGrid, CreateAnims ,SetDefaultCollider, SetCameras, HasTouchedFloor } from '../global.js';




// A changer, 1 = le numéro du niveau
const customBounds = AddCustomBounds(1);

export class templateScene extends Phaser.Scene{

    constructor(){
        super("templateScene");
    }

    preload(){

        Preload.create(this);

    }

    create(){
        this.cursors = this.input.keyboard.createCursorKeys();

        // A changer, 1 = le numéro du niveau
        AddBg(this, 1);

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
        SetCameras.create(this, 1);

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