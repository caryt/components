import React from 'react';
import { i18n } from 'reframed/index';

export const I18n = ({ children, domain, context, plural, ...args }) => {
    const list = Object.keys(args).map(k => args[k]);
    return <span>
        {
            i18n.translate(children)
                .onDomain(domain)
                .withContext(context)
                .ifPlural(list[0], plural)
                .fetch(...list)
        }
    </span>;
};
