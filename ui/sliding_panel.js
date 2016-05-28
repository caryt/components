import React from 'react';

export function slide(id) {
    const panel = $(`#${id}`);
    if (panel.hasClass('visible')) {
        panel.removeClass('visible').animate({ 'margin-right': '-400px' });
    } else {
        panel.addClass('visible').animate({ 'margin-right': '0' });
    }
    return false;
}

export const SlideButton = ({ id, icon }) =>
    <a href="#" onClick={() => slide(id)}>
        {icon}
    </a>;

export class SlidingPanel extends React.Component {
    render() {
        const { children, id } = this.props;
        this.id = id;
        return <div className="sliding-panel" id={id}>
            {children}
        </div>;
    }
}
