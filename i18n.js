/** Internationization (i18n) helpers
**/
import Jed from 'jed';
// We need this directly from the external config definition,
import * as CONFIG from 'config/environment';
import { logger } from 'reframed/index';
const log = logger('i18n');

/** i18n definition object
**/
export const i18n = new Jed({
    domain: 'messages',
    missing_key_callback: function translate(key) {
        const localeData = this.locale_data[this.domain];
        log.warn(`no translation for "${key}"`, {
            config: localeData[''],
            domain: localeData,
        });
    },
    locale_data: CONFIG.LOCALE_DATA,
});

/** Helper function to concisely translate string literals.
 *  @example i`The quick brown fox`
**/
export const i = ([text, ...parts]) => (
    parts.length
      ? `Error: Use <i18n>${text}...</i18n> for templates with substitutions.`
      : i18n.translate(text).fetch()
);
