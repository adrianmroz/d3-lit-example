import "./styles.css";
import { render, svg } from "lit-html";
import { repeat } from "lit-html/directives/repeat";
import { scaleLinear, scaleBand, max } from "d3";

const data = [
  { name: "Bob", value: 33 },
  { name: "Robin", value: 21 },
  { name: "Anne", value: 12 },
  { name: "Eve", value: 9 },
  { name: "Karen", value: 31 },
  { name: "Joe", value: 23 },
  { name: "Mark", value: 19 },
  { name: "Mary", value: 11 },
  { name: "Alf", value: 6 },
  { name: "Tom", value: 24 },
  { name: "Rob", value: 21 }
];
const padding = 20,
  width = 400,
  height = 200;

const x = scaleBand()
  .range([0, width])
  .padding(0.1)
  .domain(data.map(d => d.name));

const y = scaleLinear()
  .range([height, 0])
  .domain([0, max(data, d => d.value)]);

const bar = d => svg`<rect 
  fill="steelblue"
  x=${x(d.name)} 
  width=${x.bandwidth()} 
  y=${y(d.value)}
  height=${height - y(d.value)}
  >`;

// const bars = svg`${repeat(data, d => d.name, bar)}`;
const bars = svg`${data.map(bar)}`;

const chart = svg`
  <svg width=${width + 2 * padding} height=${height + 2 * padding}>
    <g transform="translate(${padding}, ${padding})">
      ${bars}
    </g>
  </svg>
`;

render(chart, document.getElementById("app"));
