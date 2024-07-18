import { ICONS } from './constants';

const toggleHighlighted = (icon, show) => {
  // document.querySelector(`${ICONS[icon]}-icon`).classList.toggle('highlighted', show);
}

export default function initButtons(handleUserAction) {
  let selectedIcon = 0;

  function buttonClicked({target}){
    if (target.classList.contains("left-btn")){
      toggleHighlighted(selectedIcon, false);
      selectedIcon = (2 + selectedIcon) % ICONS.length;
      toggleHighlighted(selectedIcon, true);
    }
  }
}