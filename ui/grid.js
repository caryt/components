import React from 'react';

export const Container = ({children, fluid}) =>
    <div className={fluid ? 'container-fluid' : 'container'}>
        {children}
    </div>

export const Row = ({className='', children}) =>
    <div className={`row ${className}`}>
        {children}
    </div>

export class Col extends React.Component {
    render () {
        const {cols, className='', children} = this.props;
        return <div className={`${this.classes(cols)} ${className}`}>
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