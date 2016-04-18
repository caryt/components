/** Logger module
**/

import * as Log4js from 'log4js';
import {config, ConsoleAppender} from 'components/index';

export const logger = Log4js.getLogger;

/** Configure all loggers from configuration information.
**/
export const configureLoggers = (config) => {
    logger('app').debug(`configureLogger`, config);
    Object.keys(config).forEach(k =>
        configureLogger(k, config)
    )
};

/** Configure a single logger
**/
const configureLogger = (category, config) => {
    const log = new Log4js.getLogger(category);
    const get = prop.bind(undefined, config, category);
    log.setLevel(get('LOG_LEVEL'));
    log.addAppender(new ConsoleAppender(true));
}

const prop = (config, category, name) =>
    (category in config)
        ? config[category][name]
        : config._default[name];
