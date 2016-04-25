import React from 'react';
import {config} from 'reframed/index';
import {logger} from 'reframed/index';
const log = logger('pages');

export class PageComponent extends React.Component {
    componentWillMount() {
        log.info(`mount ${this.props.title}`, this);
    }

    componentDidUpdate(prevProps, prevState) {
        document.title = prevProps.title;
    }

    /** Access current page in Chrome Console with:
     *      page = $('#root')[0].page
    **/
    componentDidMount() {
        if (config.ATTACH_COMPONENTS_TO_DOM) {
            document.querySelector(`#${config.PAGE_ROOT}`).page = this;
        }
    }
}
