import { modFox, modScene } from "./ui";

const gameState = {
    current: 'INIT',
    clock: 1,
    wakeTime: -1,
    tick() {
        this.clock++;
        console.log("clock", this.clock);
        return this.clock;
    },
    startGame(){
        console.log("hatching");
        this.current = 'HATCHING'
        this.wakeTime = this.clock + 3;
        modFox('egg');
        modScene('day')
    },
    wake(){
        console.log("awoken");
        this.current = 'IDLING';
        this.wakeTime = -1;
    },
    handleUserAction(icon){
        console.log(this);
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
    },
    cleanUpPoop(){
        console.log("clean up poop");
    },
    feed(){
        console.log("feed");
    }
}


export const handleUserAction = gameState.handleUserAction.bind(gameState);  //With the bind() method, an object can borrow a method from another object.
                                                                            // artinya, gameState.handleUserAction() akan selalu binding ke gameState as object.
export default gameState;