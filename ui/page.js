import React from 'react';
import { config, logger } from 'reframed/index';
const log = logger('pages');

export class PageComponent extends React.Component {
    componentWillMount() {
        log.info(`mount ${this.props.title}`, this);
    }

    /** Access current page in Chrome Console with:
     *      page = $('#root')[0].page
    **/
    componentDidMount() {
        if (config.ATTACH_COMPONENTS_TO_DOM) {
            document.querySelector(`#${config.PAGE_ROOT}`).page = this;
        }
        const { title } = this.props;
        if (title) {
            document.title = title;
        }
    }

    render() {
        const { children } = this.props;
        return <div>
            {children}
        </div>;
    }
}
