import { Global, AddCustomBounds, AddBg ,Preload, StaticGroups, Player, placeOnGrid, CreateAnims ,SetDefaultCollider, SetCameras, HasTouchedFloor, HasTouchedRestartBlock } from '../global.js';





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
        const customBounds = AddCustomBounds(3);
        // A changer, 1 = le numéro du niveau
        AddBg(this, 3);

        // Static Groups
        StaticGroups.create(this);


        // Floor
        placeOnGrid(this, 0, 16, 'floor', 4);
        placeOnGrid(this, 0, 15, 'floor', 4);

        placeOnGrid(this, 5, 16, 'floor', 12);
        placeOnGrid(this, 5, 15, 'floor', 7);

        placeOnGrid(this, 8, 15, 'floor', 12);

        
        // Obstacles
        placeOnGrid(this, 5, 7, 'obstacle');
        
        // Small Obstacles
        placeOnGrid(this, 10, 12, 'obstacle_small');

        placeOnGrid(this, 0, 8, 'obstacle_small', 2);

        placeOnGrid(this, 8, 6, 'obstacle_small');

        placeOnGrid(this, 6, 5, 'obstacle_small');
        placeOnGrid(this, 4, 5, 'obstacle_small');

        placeOnGrid(this, 2, 4, 'obstacle_small');

        placeOnGrid(this, 6, 3, 'obstacle_small');
        placeOnGrid(this, 4, 3, 'obstacle_small');

        placeOnGrid(this, 8, 3, 'obstacle_small');
        
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
        
        // Half Obstacles
        placeOnGrid(this, 7, 15, 'obstacle_half_down');
        
        placeOnGrid(this, 5, 14, 'obstacle_half_down', 7);
        placeOnGrid(this, 8, 14, 'obstacle_half_down', 12);
        
        placeOnGrid(this, 7, 12, 'obstacle_half_up', 9);
        
        placeOnGrid(this, 5, 11, 'obstacle_half_down');
        placeOnGrid(this, 3, 11, 'obstacle_half_up');
        
        placeOnGrid(this, 0, 11, 'obstacle_half_up', 2);

        placeOnGrid(this, 2, 8, 'obstacle_half_up',12);
        
        placeOnGrid(this, 2, 7, 'obstacle_half_down');
        placeOnGrid(this, 4, 7, 'obstacle_half_down');

        placeOnGrid(this, 9, 3, 'obstacle_half_up');

        // Walls & upperFloor

            // Left
            placeOnGrid(this, 0, 0, 'wall', 3);
            placeOnGrid(this, 0, 1, 'wall', 2);
            placeOnGrid(this, 0, 2, 'wall');
            placeOnGrid(this, 0, 3, 'wall');

            // Right
            placeOnGrid(this, 7, 7, 'obstacle', 12);
            placeOnGrid(this, 9, 6, 'obstacle', 12);

            placeOnGrid(this, 10, 5, 'obstacle');
            placeOnGrid(this, 10, 4, 'obstacle');
            placeOnGrid(this, 10, 3, 'obstacle');

        // Lanternes

        // Spikes
        placeOnGrid(this, 3, 7, 'spikes');
        placeOnGrid(this, 6, 7, 'spikes');

        // Lava
        placeOnGrid(this, 4, 16, 'lava_up');

        placeOnGrid(this, 7, 15, 'lava_up');

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

        this.lavas.children.entries.forEach(lava => lava.anims.play('lava', true));
    }
}