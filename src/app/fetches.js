import { compose } from '../base/index.js';
import * as R from 'ramda'

const log = (message) => {
    return console.log('log:', message)
}
const increment = (v) => v+1
const incrementBy = R.curry((by, begin) => begin + by)

const t = compose(log, increment, incrementBy(10))
t(10)
