const winston = require('winston');
winston.emitErrs = true;

const customColors = {trace: 'white', debug: 'green', info: 'green', warn: 'yellow', crit: 'red', fatal: 'red'};
const path = __dirname.slice(0,__dirname.lastIndexOf('/lib'))+'/access.log';

const tsFormat = () => (new Date()).toLocaleTimeString();

const logger = new winston.Logger({
    colors: customColors,
    levels: {
        trace: 0,
        debug: 1,
        info: 2,
        warn: 3,
        crit: 4,
        fatal: 5
    },
    transports: [
        new winston.transports.File({
            level: {trace: 0, warn: 3,crit: 4,fatal: 5 },
            filename: path,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false,
            timestamp: tsFormat,
        }),
        new winston.transports.Console({
            level: 'error',//{trace: 0, info: 2, warn: 3,crit: 4,fatal: 5 },
            handleExceptions: true,
            json: true,
            colorize: true,
            timestamp: tsFormat,
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
}