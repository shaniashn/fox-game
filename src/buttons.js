import { ICONS } from './constant.js';

const toggleHighlighted = (icon, show) => document.querySelector(`.${ICONS[icon]}-icon`).classList.toggle("highlighted", show);

export default function initButtons(handleUserAction){
    let selectedIcon = 2;

    function buttonClick({target}) { //target = event.target
        if (target.classList.contains("left-btn")) {
            toggleHighlighted(selectedIcon, false);
            // console.log("selectedIcon left before", selectedIcon);
            selectedIcon = (2 + selectedIcon) % ICONS.length;
            // console.log("selectedIcon left", selectedIcon);
            toggleHighlighted(selectedIcon, true);
        } else if (target.classList.contains("right-btn")) {
            toggleHighlighted(selectedIcon, false);
            // console.log("selectedIcon before", selectedIcon);
            selectedIcon = (1 + selectedIcon) % ICONS.length;
            // console.log("selectedIcon right", selectedIcon);
            toggleHighlighted(selectedIcon, true);
        } else {
            console.log("ICONS ", ICONS[selectedIcon]);0
            handleUserAction(ICONS[selectedIcon]);
        }
    }

    document.querySelector(".buttons").addEventListener("click", buttonClick);
}
//                     right: 2 -> 0 -> 1 -> 2
//entering toggleHighlighted  2 -> 0 -> 1 -> 2


//                      left: 2 -> 1 -> 0 -> 2
//entering toggleHighlighted  2 -> 1 -> 0 -> 2

