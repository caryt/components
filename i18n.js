/** Internationization (i18n) helpers
**/
import Jed from 'jed';
import {LOCALE_DATA} from 'config/environment';
import {logger} from 'components/index';
const log = logger('i18n');

/** Helper function to concisely translate string literals.
 *  @example i`The quick brown fox`
**/
export const i = ([text, ...parts], values) =>
    parts.length
      ? `Error: Use <i18n>${text}...</i18n> for templates with substitutions.`
      : i18n.translate(text).fetch();

/** i18n definition object
**/
export var i18n = new Jed({
    domain: 'messages',
    missing_key_callback: function(key) {
        const locale_data = this.locale_data[this.domain];
        log.warn(`no translation for "${key}"`, {
            config: locale_data[''],
            domain: locale_data,
        })
    },
    locale_data: LOCALE_DATA,
});
