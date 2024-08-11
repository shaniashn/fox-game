import { modFox, modScene } from "./ui.js";
import { RAIN_CHANCE, SCENE, DAY_LENGTH, NIGHT_LENGTH, getNextDieTime, getNextHungryTime } from "./constant.js";

const gameState = {
    current: 'INIT',
    clock: 1,
    wakeTime: -1, //means not currently working
    sleepTime: -1,
    hungryTime: -1,
    dieTime: -1,
    tick() {
        this.clock++;
        console.log("clock", this.clock);

        if (this.clock === this.wakeTime) {
            this.wake()
        } else if (this.clock === this.sleepTime) {
            this.sleep()
        } else if (this.clock === this.hungryTime) {
            this.getHungry()
        } else if (this.clock === this.dieTime) {
            this.die()
        }

        return this.clock;
    },
    startGame() {
        console.log("hatching..");
        this.current = 'HATCHING'
        this.wakeTime = this.clock + 3;
        console.log("akan awoken pada clock ke-", this.wakeTime);

        modFox('egg');
        modScene('day')
    },
    getHungry() {
        this.current = "HUNGRY"
        modFox("hungry")
        
        this.dieTime = getNextDieTime(this.clock);
        console.log("will die on ", this.dieTime);
        this.hungryTime = -1;
    },
    die() {
        console.log("wow ded");
        modFox("dead")
        modScene("dead")

        this.current = "DEAD"
    },
    sleep() {
        this.current = "SLEEP";
        modFox("sleep")
        modScene("night")

        this.wakeTime = NIGHT_LENGTH + this.clock;
    },
    wake() {
        console.log("awoken");
        this.current = 'IDLING';
        this.wakeTime = -1;  //back to not currently working
        modFox("idling");

        const mathRand = Math.random();
        console.log("mathRand ", mathRand);

        this.scene = mathRand > RAIN_CHANCE ? 0 : 1;
        console.log("scene", this.scene);
        
        modScene(SCENE[this.scene]);
        if (this.scene == 1) {
            modFox("rain")
        }
        

        this.sleepTime = this.clock + DAY_LENGTH;
        this.hungryTime = getNextHungryTime(this.clock);
        console.log("will hungry on ", this.hungryTime);
        
    },
    handleUserAction(icon) {
        // console.log(this);
        console.log("icon ", icon);
        console.log(this.current);


        if (["SLEEP", "FEEDING", "HATCHING", "CELEBRATING"].includes(this.current)) {
            console.log("this current ", this.current);
            
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
    changeWeather() {
        console.log("change weather");
        modScene(this.scene)
    },
    cleanUpPoop() {
        console.log("clean up poop");
        modFox('pooping');
    },
    feed() {
        if (this.current !== "HUNGRY") {
            return;
        }
        console.log("feed");
        modFox("eating")
        this.current = "FEEDING"
        this.dieTime = -1;
        console.log("gjd mati");
        
    }
}


export const handleUserAction = gameState.handleUserAction.bind(gameState);  //With the bind() method, an object can borrow a method from another object.
// artinya, gameState.handleUserAction() akan selalu binding ke gameState as object.
export default gameState;