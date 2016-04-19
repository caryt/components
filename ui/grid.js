import React from 'react';

export const Container = ({children, fluid}) =>
    <div className={fluid ? 'container-fluid' : 'container'}>
        {children}
    </div>

export const Row = ({children}) =>
    <div className="row">
        {children}
    </div>

export class Col extends React.Component {
    render () {
        const {cols, children} = this.props;
        return <div className={this.classes(cols)}>
            {children}
        </div>
    }

    classes(cols) {
        if (typeof cols === 'number') {
            return classes = `col-xs-${cols}`
        }
        return Object.keys(cols).map(media =>
            `col-${media}-${cols[media]}`).join(' ');
    }
}