import { config } from './config';
import { logger } from '../logger';
const log = logger('app');

export class Application {
    constructor(options) {
        this.name = options.name || 'application';
        this.initialize(options);
        log.info(`initialize application ${this.name}`, this);
    }

    initialize(options) {
        config.state = options.config;
        // Subclass if additional initialization required
    }

    run() {
        const { name } = this;
        log.info(`run application ${name}`, this);
    }
}
