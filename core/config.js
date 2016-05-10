import { i18n } from './i18n';
import { configureLoggers, logger } from './logger';
import { forEach } from './functional';
const log = logger('config');

/** A minimal configuration file.
 *  Contains a default LOG_CONFIGURATION which will log all events.
**/
const nullConfiguration = {
    LOG_CONFIGURATION: {},
    LOCALES: {},
};

export class Config {
    constructor(config = nullConfiguration) {
        this.state = config;
    }

    set state(config) {
        configureLoggers(config.LOG_CONFIGURATION);
        log.info('set Configuration', config);
        const parsed = this.parse(config);
        forEach(parsed, (key, value) => {
            this[key] = value;
        });
        log.info(`set Locale: "${this.LOCALE}"`, this.locale);
        log.info(`set i18n Domain: "${i18n.options.domain}"`, i18n);
    }

    parse(config) {
        return {
            ...config,
        };
    }

    /** Holds localised configuration settings for the application
     * The actual locale used is based on the config.LOCALE option.
    **/
    get locale() {
        return this.LOCALES[this.LOCALE];
    }

    get language() {
        return this.locale.split('-')[0];
    }

    get region() {
        return this.locale.split('-')[1];
    }
}

/** Configuration object. Manages configuration settings for the application.
**/
export const config = new Config();
