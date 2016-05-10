import { Config as BaseConfig } from 'reframed/core/config';
import renderer from 'react-dom';

/** A minimal configuration file.
 *  Contains a default LOG_CONFIGURATION which will log all events.
**/
const nullConfiguration = {
    LOG_CONFIGURATION: {},
    LOCALES: {},
    RENDERER: 'REACT',
    PAGE_ROOT: 'root',
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

class Config extends BaseConfig {
    constructor(config = nullConfiguration) {
        super(config);
    }

    parse(configuration) {
        return {
            ...super.parse(configuration),
            renderer: RENDERER[configuration.RENDERER],
            root: document.getElementById(configuration.PAGE_ROOT),
        };
    }
}

export const config = new Config();
