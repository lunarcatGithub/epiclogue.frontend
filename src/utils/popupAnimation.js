import { keyframes } from 'styled-components';

// animation
export const popupAni = keyframes` // position abolute 일 때
0% {
  opacity:0;
  top: 51%;
}
80% {
  opacity:0.7;
  top: 47.5%;

}
85% {
  opacity:0.8;
  top: 48%;

}
90% {
  opacity:0.9;
  top: 48.5%;

}
95% {
  opacity:1;
  top: 49.5%;

}
100% {
  opacity:1;
  top: 50%;
}
`;

export const popupDisplayAni = keyframes` // position abolute 일 때
0% {
  opacity:0;
  margin-bottom: 0em;
}
60% {
  opacity:0.6;
  margin-bottom: 2em;

}
85% {
  opacity:0.85;
  margin-bottom: 1.8em;

}
100% {
  opacity:1;
  margin-bottom: 0em;
}
`;
