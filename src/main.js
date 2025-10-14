// import { Start } from './scenes/Start.js';
import { FirstLevel } from './scenes/firstLevel.js';
import { SecondLevel } from './scenes/SecondLevel.js';
import { ThirdLevel } from './scenes/thirdLevel.js';
import { FourthLevel } from './scenes/fourthLevel.js';
import { FifthLevel } from './scenes/FifthLevel.js';
import { Global } from './global.js';
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
        SecondLevel
    ]
}

new Phaser.Game(config);
            