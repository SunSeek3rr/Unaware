import { Global, AddCustomBounds, AddBg ,Preload, StaticGroups, Player, placeOnGrid, CreateAnims ,SetDefaultCollider, SetCameras, HasTouchedFloor, HasTouchedRestartBlock, Teleport, flyingMobs } from '../global.js';



// A changer, 1 = le numéro du niveau
const customBounds = AddCustomBounds(0);

export class End extends Phaser.Scene{

    constructor(){
        super("End");
    }

    preload(){

        Preload.create(this);

    }

    create(){

        // A changer, 1 = le numéro du niveau
        AddBg(this, 6);

        // Static Groups
        StaticGroups.create(this);

        // Floor
        placeOnGrid(this, 0, 7, 'floor-banner', 12);
        // placeOnGrid(this, 0, 7, 'background', 12);

        // Obstacles


        // Small Obstacles


        // Walls & upperFloor
        placeOnGrid(this, 0, 0, 'wall', 12);
        
            // Left
                placeOnGrid(this, 0, 1, 'wall');

            // Right
                placeOnGrid(this,10, 1, 'wall', 12);
        
        // Ladder


        // Lanternes
        placeOnGrid(this, 2, 3, 'lantern');
        placeOnGrid(this, 5, 3, 'lantern');
        placeOnGrid(this, 8, 3, 'lantern');

        placeOnGrid(this, 8, 6, 'orb');

        this.player = new Player(this, 270, 200, 'player', customBounds);

        CreateAnims.create(this);

        SetDefaultCollider.create(this);

        // A changer, 1 = le numéro du niveau
        SetCameras.create(this, 0);

        HasTouchedFloor.create(this);
        HasTouchedRestartBlock.create(this);

        // Teleport.create(this, 'start', 8 , 5);
        }
        
    
    
    update() {
        this.player.update();

        HasTouchedFloor.update(this);
        HasTouchedRestartBlock.update(this);
        // Teleport.update(this, 0);

        this.lanterns.children.entries.forEach(lantern => {
            lantern.anims.play('lantern', true);
        });
        this.orb.children.entries.forEach(orb => {
            orb.anims.play('orb', true);
        });
    }
}