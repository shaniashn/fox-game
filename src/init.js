import gameState from "./gameState";

const TICK_RATE = 3000; // 3000 ms = 3s

function tick() {
    console.log('tick', Date.now());
}

async function init() {
    console.log('starting game');

    let nextTimeToTick = Date.now(); //5
    // console.log("next", nextTimeToTick);

    function nextAnimationFrame() {
        const now = Date.now(); //6
        // console.log("now", now);

        if (nextTimeToTick <= now) { // 5 < 6
            gameState.tick();
            nextTimeToTick = now + TICK_RATE; // 5 + 3 = 8
            // console.log("next total", nextTimeToTick);
        }    
        // console.log("keluar?");
        requestAnimationFrame(nextAnimationFrame);
    }
    // console.log("apkh keluar");
    requestAnimationFrame(nextAnimationFrame);
}

init();