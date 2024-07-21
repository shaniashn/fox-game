import gameState, { handleUserAction } from "./gameState.js";
import { TICK_RATE } from "./constant.js";
import initButtons from "./buttons.js";


async function init() {
    console.log('starting game');
    initButtons(handleUserAction);

    let nextTimeToTick = Date.now(); //5

    function nextAnimationFrame() {
        const now = Date.now(); //6

        if (nextTimeToTick <= now) { // 5 < 6
            gameState.tick();
            nextTimeToTick = now + TICK_RATE; // 5 + 3 = 8
        }
        requestAnimationFrame(nextAnimationFrame);
    }
    requestAnimationFrame(nextAnimationFrame);
}

init();