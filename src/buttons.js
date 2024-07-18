import { ICONS } from './constants';

const toggleHighlighted = (icon, show) => document.querySelector(`${ICONS[icon]}-icon`).classList.toggle('highlighted', show);
