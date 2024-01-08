import { partial, path } from "ramda";
import { compose, result } from "../../base/index.js";
import fetch from "node-fetch";

const state =
  (initial) =>
  (...args) => {
    let target = JSON.parse(
      JSON.stringify({
        ...initial,
        args,
      })
    );
    return {
      get() {
        return target;
      },
      set(newValue) {
        target = newValue;
      },
    };
  };
const slice = (start, end, arr) => arr.slice(start, end);
const stateEffect = (cb) => (result) => {
  cb(result);
  return result;
};
const showResult = (...args) => console.log("result:", ...args);
const id = (v) => v;
const stateGet = (pathArr, state) => path(pathArr, state.get());
const stateUnwrap = (state) => state.get();
const request = async (url) => {
  const response = await fetch(url);
  return await response.json();
};
const stateSet = (key, state, value) => {
  state.set({
    ...state.get(),
    [key]: value,
  });
  return state;
};
const stateChange = (saveTo, fnComposed, afterChange) => (state) => {
  if (!afterChange) {
    afterChange = (state) => state;
  }
  compose(afterChange, partial(stateSet, [saveTo, state]), fnComposed)(state);
  return compose(() => state)();
};

// Функции - композиции
const stateDebug = compose(showResult, stateUnwrap);
const doRequest = compose(
  partial(slice, [0, 3]),
  request,
  partial(stateGet, [["args", "0"]])
);
const afterRequest = stateChange("isLoading", () => false);
const reactiveRequest = compose(
  stateChange("results", doRequest, afterRequest),
  state({
    results: [],
    isLoading: true,
  })
);

const rstate = result(
  reactiveRequest("https://jsonplaceholder.typicode.com/todos")
);

console.log("Синхронный вызов rstate - пусто");
console.log(rstate.get());
setTimeout(() => {
  console.log("\nОбращение через секунду к rstate - есть реузльтаты");
  console.log(rstate.get());
}, 1000);
