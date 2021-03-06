const PENDING = 'color:orange';
const PASSED = 'color:green';
const FAILED = 'color:red';
const IMPORTANT = '; font-size:larger; font-weight:bold';

const noopTimer = {
    start: () => null,
    elapsed: () => 0,
};

const plural = (str, count) => (
    (count === 1) ? str : `${str}s`
);

/* eslint-disable no-console */
export class ConsoleReporter {
    constructor({
      onComplete = (() => null), timer = noopTimer, groupResults = false } = {}
    ) {
        this.onComplete = onComplete;
        this.timer = timer;
        this.groupResults = groupResults;
        this.specs = 0;
        this.pending = 0;
        this.failures = 0;
        this.failedSpecs = [];
    }

    jasmineStarted() {
        this.specs = 0;
        this.pending = 0;
        this.failures = 0;
        if (this.groupResults) {
            console.groupCollapsed('Testing Application...');
        } else {
            console.group('Testing Application...');
        }
        this.timer.start();
    }

    jasmineDone() {
        this.failedSpecs.forEach(spec =>
            specFailureDetails(spec) // eslint-disable-line no-undef
        );
        let specs = '';
        specs += `${this.specs} ${plural('spec', this.specs)} `;
        specs += `${this.failures} ${plural('failure', this.failures)}`;
        if (this.pending) {
            specs += `, ${this.pending} `;
            specs += `pending ${plural('spec', this.pending)}`;
        }
        const seconds = this.timer.elapsed() / 1000;
        specs += ` in ${seconds} ${plural('second', seconds)}`;
        console.groupEnd();
        if (this.failures) {
            console.log('%c%s', FAILED + IMPORTANT, specs);
        } else if (this.pending) {
            console.log('%c%s', PENDING + IMPORTANT, specs);
        } else {
            console.log('%c%s', PASSED + IMPORTANT, specs);
        }
        this.onComplete(this.failures === 0);
    }

    suiteStarted(result) {
        console.group(result.description);
    }

    suiteDone() {
        console.groupEnd();
    }

    specDone(result) {
        this.specs++;
        switch (result.status) {
        case 'pending':
            this.pending++;
            console.warn(result.description);
            break;
        case 'passed':
            console.log('%c%s', PASSED, result.description);
            break;
        case 'failed':
            this.failures++;
            console.error(result.description);
            result.failedExpectations.forEach(ex => {
                console.groupCollapsed('%c%s', FAILED, ex.message);
                console.log(ex.stack);
                console.groupEnd();
            });
            break;
        default:
            console.error('Unexpected status');
        }
    }
}
/* eslint-enable */
