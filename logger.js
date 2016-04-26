/** Logger module
**/
import * as Log4js from 'log4js';
import { ConsoleAppender } from 'reframed/index';
import { forEach } from './functional';

export const logger = Log4js.getLogger;

const prop = (config, category, name) => (
    (category in config)
        ? config[category][name]
        : config._default[name]
);

/** Configure a single logger
**/
const configureLogger = (category, config) => {
    const log = new Log4js.getLogger(category);
    const get = prop.bind(undefined, config, category);
    log.setLevel(get('LOG_LEVEL'));
    log.addAppender(new ConsoleAppender(true));
};

/** Configure all loggers from configuration information.
**/
export const configureLoggers = config => {
    logger('app').debug('configureLogger', config);
    forEach(config, key =>
        configureLogger(key, config)
    );
};
