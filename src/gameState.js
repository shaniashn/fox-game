import { modFox, modScene } from "./ui.js";
import { RAIN_CHANCE, SCENE, DAY_LENGTH, NIGHT_LENGTH } from "./constant.js";

const gameState = {
    current: 'INIT',
    clock: 1,
    wakeTime: -1, //means not currently working
    sleepTime: -1,
    tick() {
        this.clock++;
        console.log("clock", this.clock);

        if (this.clock === this.wakeTime) {
            this.wake()
        }

        if (this.clock === this.sleepTime) {
            this.sleep()
        }

        return this.clock;
    },
    startGame(){
        console.log("hatching..");
        this.current = 'HATCHING'
        this.wakeTime = this.clock + 3;
        console.log("akan awoken pada clock ke-", this.wakeTime);
        
        modFox('egg');
        modScene('day')
    },
    sleep(){
        this.state = "SLEEP";
        modFox("sleep")
        modScene("night")

        this.wakeTime = NIGHT_LENGTH + this.clock;
    },
    wake(){
        console.log("awoken");
        this.current = 'IDLING';
        this.wakeTime = -1;  //back to not currently working
        modFox("idling");

        const mathRand = Math.random();
        console.log("mathRand ", mathRand);
        
        this.scene = mathRand > RAIN_CHANCE ? 0 : 1;
        modScene(SCENE[this.scene]);
        modFox("rain")

        this.sleepTime = this.clock + DAY_LENGTH;

    },
    handleUserAction(icon){
        // console.log(this);
        console.log("icon ", icon);
        console.log(this.current);
        
        
        if (["SLEEPING", "FEEDING", "HATCHING", "CELEBRATING"].includes(this.current)){
            //do nothing
            return;
        } 

        if (this.current === 'INIT' | this.current === "DEAD") {
            this.startGame();
            return;
        }

        switch (icon) {
            case "weather":
                this.changeWeather();
                break;
            case "poop":
                this.cleanUpPoop();
                console.log("poop?");
                
                break;
            case "fish":
                this.feed();
                break;
            default:
                break;
        }
    },
    changeWeather(){
        console.log("change weather");
        modScene(this.scene)
    },
    cleanUpPoop(){
        console.log("clean up poop");
        modFox('pooping');
    },
    feed(){
        console.log("feed");
    }
}


export const handleUserAction = gameState.handleUserAction.bind(gameState);  //With the bind() method, an object can borrow a method from another object.
                                                                            // artinya, gameState.handleUserAction() akan selalu binding ke gameState as object.
export default gameState;