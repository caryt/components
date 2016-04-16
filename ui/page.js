import React from 'react';
import {ATTACH_COMPONENTS_TO_DOM} from 'config/environment';
import {logger} from 'components/app/index';
const log = logger('pages');

export class Page extends React.Component {
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
        if (ATTACH_COMPONENTS_TO_DOM) {
            document.querySelector('#root').page = this;
        }
    }
}
