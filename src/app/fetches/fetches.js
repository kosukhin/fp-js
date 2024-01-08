import fetch from "node-fetch";
import { compose } from "../../base/index.js";
import { partial, curry } from "ramda";

const showResult = (message) => console.log("result:", message);
const increment = (v) => v + 1;
const incrementBy = (by, begin) => begin + by;
const separate = (label = "task") =>
  console.log(`============= End of ${label} ===========`);

const showIncremented = compose(
  partial(separate, ["Incrementor"]),
  showResult,
  increment,
  curry(incrementBy)(10)
);
showIncremented(10);

const request = async (url) => {
  const response = await fetch(url);
  return await response.json();
};
const slice = (start, end, arr) => arr.slice(start, end);

const requestFirstFive = compose(partial(slice, [0, 5]), request);
const showFiveTodos = compose(
  partial(separate, ["Five Todos"]),
  showResult,
  requestFirstFive
);
showFiveTodos("https://jsonplaceholder.typicode.com/todos");

const parallel = (...asyncs) => Promise.all(asyncs.map((fn) => fn?.()));
const showManyRequests = compose(
  partial(separate, ["Parallel"]),
  showResult,
  partial(parallel, [
    partial(request, ["https://jsonplaceholder.typicode.com/todos/1"]),
    partial(request, ["https://jsonplaceholder.typicode.com/todos/2"]),
    partial(request, ["https://jsonplaceholder.typicode.com/todos/3"]),
  ])
);
showManyRequests();
