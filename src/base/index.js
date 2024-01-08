import { compose as ramdaCompose } from "ramda";

const RESULT_SYMBOL = Symbol("result");

const high = (theThing) => {
  if (theThing?.typeThing) {
    return theThing;
  }

  const doThenFactory = (doThen) => {
    let theRes = null;

    if (doThen === RESULT_SYMBOL) {
      return theThing;
    }

    if (theThing instanceof Promise) {
      theRes = high(theThing.then(doThen));
    } else {
      theRes = high(doThen(theThing));
    }

    theRes.typeThing = true;

    return theRes;
  };

  return doThenFactory;
};

export const result = (doThenFactory) => {
  return doThenFactory(RESULT_SYMBOL);
};

/**
 * Специфический compose который делает из
 * обычных функций - функции высшего порядка,
 * в которых происходит доп обработка возможного
 * поведения, например обработка Promise
 */
export const compose = (...cbs) => {
  const applier = ramdaCompose(...cbs.map((cb) => high(cb)));
  return (...params) => applier(high(...params));
};
