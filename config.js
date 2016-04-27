import { i18n, configureLoggers, logger } from 'reframed/index';
import renderer from 'react-dom';
import { forEach } from './functional';
const log = logger('config');

/** A minimal configuration file.
 *  Contains a default LOG_CONFIGURATION which will log all events.
**/
const nullConfiguration = {
    LOG_CONFIGURATION: {},
    RENDERER: 'REACT',
    PAGE_ROOT: 'root',
    LOCALES: {},
};

/** Available renderers.
 *  NULL renderer renders nothing - produces no output
 *  For example, this could exclude the entire UI when testing reducers.
  * REACT is the standard React renderer from reactDOM
**/
const RENDERER = {
    NULL: { render: () => false },
    REACT: renderer,
};

class Config {
    constructor(config) {
        this.state = config;
    }

    set state(config = nullConfiguration) {
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
            renderer: RENDERER[config.RENDERER],
            root: document.getElementById(config.PAGE_ROOT),
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
export var config = new Config();
