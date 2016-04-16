import React from 'react';
import {i18n as i18n} from 'app';

export const I18n = ({children, domain, context, plural, ...args}) => {
    const list = Object.keys(args).map(k => args[k]);
    return <span>
        {
            i18n.translate(children)
                .onDomain(domain)
                .withContext(context)
                .ifPlural(list[0], plural)
                .fetch(...list)
        }
    </span>
}
