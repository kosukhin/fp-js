import { compose as ramdaCompose } from "ramda";

const high = (theThing) => {
  if (theThing?.typeThing) {
    return theThing;
  }

  const doThenFactory = (doThen) => {
    let theRes = null;

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

/**
 * Специфический compose который делает из
 * обычных функций - функции высшего порядка,
 * в которых происходит доп обработка возможного
 * поведения, например обработка Promise
 */
export const compose = (...cbs) => {
  const applier = ramdaCompose(...cbs.map((cb) => high(cb)));
  return (parameter) => applier(high(parameter));
};
