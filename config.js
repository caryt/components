import {i18n, configureLoggers} from 'components/index';
import {logger} from 'components/index';
const log = logger('config');

/** A minimal configuration file.
 *  Contains a default LOG_CONFIGURATION which will log all events.
**/
const nullConfiguration = {LOG_CONFIGURATION: {}};

class Config {
    constructor(config) {
        this.state = config;
    }

    set state(config=nullConfiguration) {
        configureLoggers(config.LOG_CONFIGURATION);
        log.info('set Configuration', config);
        Object.keys(config).forEach(key => this[key] = config[key]);
        log.info(`set i18n Domain: "${i18n.options.domain}"`, i18n);
    }
}

/** Configuration object. Manages configuration settings for the application.
**/
export var config = new Config();
