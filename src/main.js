import { End } from './scenes/End.js';
import { questionRoom } from './scenes/questionRoom.js'
import { Start } from './scenes/Start.js';
import { FirstLevel } from './scenes/FirstLevel.js';
import { SecondLevel } from './scenes/SecondLevel.js';
import { ThirdLevel } from './scenes/ThirdLevel.js';
import { FourthLevel } from './scenes/FourthLevel.js';
import { FifthLevel } from './scenes/FifthLevel.js';
import { Global, QuestionRoom } from './global.js';
// import { LadderTest } from './scenes/LadderTest.js'

const config = {
    type: Phaser.AUTO,
    width: 1194,
    height: 834,
    physics:{
        default: 'arcade',
        arcade:{
            gravity : { y: Global.gravity},
            debug : false
        }
    },
    backgroundColor: '#ffffff',
    scene: [
        Start,FirstLevel, SecondLevel, ThirdLevel, FourthLevel, FifthLevel, End, questionRoom
    ]
}

new Phaser.Game(config);
            