import { Global, AddCustomBounds, AddBg ,Preload, StaticGroups, Player, placeOnGrid, CreateAnims ,SetDefaultCollider, SetCameras, HasTouchedFloor, HasTouchedRestartBlock, QuestionRoom, Teleport } from '../global.js';




// A changer, 1 = le numéro du niveau
const customBounds = AddCustomBounds(0);

export class questionRoom extends Phaser.Scene{

    constructor(){
        super("questionRoom");
    }

    preload(){

        Preload.create(this);

    }

    create(){

        // If touch y=0 alors on spawn dans la salle des questions, créer une méthode static qui prends en compte actualLvl pour définir la question + la bonne porte + 

        // A changer, 1 = le numéro du niveau
        AddBg(this, 6);

        // Static Groups
        StaticGroups.create(this);


        // Floor
        placeOnGrid(this, 0, 7, 'floor', 10);

        // Obstacles

        // Doors
        placeOnGrid(this, 1, 5, 'door');
        placeOnGrid(this, 3, 5, 'door');
        placeOnGrid(this, 5, 5, 'door');
        // Small Obstacles
        placeOnGrid(this, 10, 7, 'obstacle_small', 12);

        // Walls & upperFloor

            // Left


            // Right

        
        // Ladder
        placeOnGrid(this, 10, 7, 'ladder',12);

        // Lanternes
        
        // Mob
        switch(Global.lastString){
            case 'FirstLevel' :
                placeOnGrid(this, 7, 5.82, 'axolotl');
                this.questionNumber = 1;
                break;
            case 'SecondLevel' : 
                placeOnGrid(this, 7, 5.82, 'dog');
                this.questionNumber = 2;
                break;
            case 'ThirdLevel' :
                placeOnGrid(this, 7, 5.82, 'frog');
                this.questionNumber = 3;
                break;
            case 'FourthLevel' : 
                placeOnGrid(this, 7, 5.82, 'snake');
                this.questionNumber = 4;
                break;
            case 'FifthLevel' : 
                placeOnGrid(this, 7, 5.82, 'snowman');
                this.questionNumber = 5;
                break;
        }

        this.player = new Player(this, 1000, 200, 'player', customBounds);

        CreateAnims.create(this);

        SetDefaultCollider.create(this);

        // A changer, 1 = le numéro du niveau
        SetCameras.create(this, 0);

        HasTouchedFloor.create(this);
        HasTouchedRestartBlock.create(this);

        QuestionRoom.create(this);
    }
    
    
    
    update() {
        this.player.update();
        this.player.lastKey = 'left';

        HasTouchedFloor.update(this);
        HasTouchedRestartBlock.update(this);


        this.lanterns.children.entries.forEach(lantern => {
            lantern.anims.play('lantern', true);
        });

        switch(Global.lastString){
            case 'FirstLevel' :
                this.characters.children.entries.forEach(char => {
                    char.anims.play('axolotl', true);
                });
                break;
            case 'SecondLevel' : 
                this.characters.children.entries.forEach(char => {
                    char.anims.play('dog', true);
                });
                break;
            case 'ThirdLevel' :
                this.characters.children.entries.forEach(char => {
                    char.anims.play('frog', true);
                });
                break;
            case 'FourthLevel' : 
                this.characters.children.entries.forEach(char => {
                    char.anims.play('snake', true);
                });
                break;
            case 'FifthLevel' : 
                this.characters.children.entries.forEach(char => {
                    char.anims.play('snowman', true);
                });
                break;
        }
    }
}