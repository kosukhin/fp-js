import * as R from "ramda";

export const high = (theThing) => {
  if (theThing?.typeThing) {
    return theThing;
  }

  const doThenFactory = (doThen) => {
    let theRes = null;

    // console.log("doThen", doThen);
    // console.log("thing", theThing);

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

export const compose = (...cbs) => {
  const applier = R.compose(...cbs.map((cb) => high(cb)));
  return (parameter) => applier(high(parameter))
};
