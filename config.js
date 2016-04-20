import {i18n, configureLoggers} from 'reframed/index';
import renderer from 'react-dom';
import {logger} from 'reframed/index';
const log = logger('config');

/** A minimal configuration file.
 *  Contains a default LOG_CONFIGURATION which will log all events.
**/
const nullConfiguration = {
    LOG_CONFIGURATION: {},
    RENDERER: 'REACT',
    PAGE_ROOT: 'root',
};

class Config {
    constructor(config) {
        this.state = config;
    }

    set state(config=nullConfiguration) {
        configureLoggers(config.LOG_CONFIGURATION);
        log.info('set Configuration', config);
        const parsed = this.parse(config);
        Object.keys(parsed).forEach(key => this[key] = parsed[key]);
        log.info(`set i18n Domain: "${i18n.options.domain}"`, i18n);
    }

    parse(config) {
    	return {
        	...config, 
        	renderer: RENDERER[config.RENDERER],
        	root: document.getElementById(config.PAGE_ROOT),
        }
    }
}

/** Available renderers.
 *  NULL renderer renders nothing - produces no output
 *  For example, this could exclude the entire UI when testing reducers.
  * REACT is the standard React renderer from reactDOM
**/
const RENDERER = {
	NULL: {render: () => false},
	REACT: renderer,
}

/** Configuration object. Manages configuration settings for the application.
**/
export var config = new Config();
