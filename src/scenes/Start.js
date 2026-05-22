import { Global, AddCustomBounds, AddBg ,Preload, StaticGroups, Player, placeOnGrid, CreateAnims ,SetDefaultCollider, SetCameras, HasTouchedFloor, HasTouchedRestartBlock, Teleport, flyingMobs, QuestionRoom } from '../global.js';



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

        const container = document.getElementById('game-container');
        if (container) {
            container.classList.remove('loading');
        }

        // A changer, 1 = le numéro du niveau
        AddBg(this, 0);

        // Static Groups
        StaticGroups.create(this);

        placeOnGrid(this, 7.1, -1.8, 'tower');
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

        Teleport.create(this, 'start', 8.5 , 6);
        }
        
    
    
    update() {
        this.player.update();

        HasTouchedFloor.update(this);
        HasTouchedRestartBlock.update(this);
        Teleport.update(this);

        this.lanterns.children.entries.forEach(lantern => {
            lantern.anims.play('lantern', true);
        });
    }
}