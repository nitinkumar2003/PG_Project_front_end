
import config from '../utilities/config.json'
let OPEN_CONSOLE=config?.OPEN_KONSOLE
const konsole = {
    log: (...args) => {
        if (OPEN_CONSOLE) {
            console.log(...args);
        }
    },
    error: (...args) => {
        if (OPEN_CONSOLE) {
            console.error(...args);
        }
    },
    decor: (...args) => {
        if (OPEN_CONSOLE) {
            console.log('-*-*-*-', ...args, '-*-*-*-');
        }
    },
    encapse: (...args) => {
        if (OPEN_CONSOLE) {
            console.log('-*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*-');
            console.log(...args);
            console.log('-*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*-');
        }
    }
}

export default konsole;