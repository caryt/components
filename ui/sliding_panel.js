import React from 'react';

export class SlidingPanel extends React.Component {
    // componentWillMount() {
    //     this.state = { visible: this.props.visible };
    // }

    // componentDidUpdate() {
    //     if (this.state.visible !== this.props.visible) {
    //         this.state.visible = this.props.visible;
    //         this.slide();
    //     }
    // }

    slide() {
        const panel = $(`#${this.id}`);
        if (panel.hasClass('visible')) {
            panel.removeClass('visible').animate({ 'margin-right': '-400px' });
        } else {
            panel.addClass('visible').animate({ 'margin-right': '0' });
        }
        return false;
    }

    render() {
        const { children, id, visible = false } = this.props;
        this.id = id;
        const flag = (visible) ? 'visible' : '';
        // const style = {};
        const style = (visible) ? { marginRight: 0 } : {};
        return <div className={`sliding-panel ${flag}`} id={id} style={style}>
            {children}
        </div>;
    }
}
