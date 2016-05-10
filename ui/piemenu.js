import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const toggleVisible = flag => (
    (flag === 'show') ? 'hide' : 'show'
);

/* eslint-disable no-shadow */
const label = ({ x, y, label }) =>
    <text fontFamily="Arial" x={x} y={y}> {label} </text>;

const renderCells = ({ children, stroke, fill }) =>
    children.map((entry, index) =>
        <Cell key={`cell-${index}`} stroke={stroke} fill={fill} />
    );

export class PieValue extends React.Component {
    constructor() {
        super();
        this.state = { menuVisible: 'hide' };
    }

    toggleMenu() {
        const { menuVisible } = this.state;
        this.setState({ menuVisible: toggleVisible(menuVisible) });
    }

    selectMenu(...args) {
        this.props.onChange(...args);
        this.toggleMenu();
    }

    render() {
        const { Menu, value } = this.props;
        const { menuVisible } = this.state;
        const { toggleMenu, selectMenu } = this;
        const onClick = toggleMenu.bind(this);
        return <div className="pie-value">
            <span className="value" onClick={onClick}>
                {value}
            </span>
            {React.cloneElement(
                Menu, {
                    menuVisible,
                    onClick: selectMenu.bind(this),
                    toggleVisibility: toggleMenu.bind(this),
                }
            )}
        </div>;
    }
}

export class PieMenu extends React.Component {
    get renderBackground() {
        const { children, cx, cy, startAngle } = this.props;
        return <Pie
          data={children} cx={cx} cy={cy}
          isAnimationActive={false} className="pie-background"
          startAngle={startAngle} endAngle={360 + startAngle}
          innerRadius="50%" outerRadius="100%"
        >
            {renderCells({
                children,
                stroke: 'darkgrey',
                fill: 'white',
            })}
        </Pie>;
    }

    get renderMenu() {
        const { onClick, children, cx, cy, startAngle } = this.props;
        return <Pie
          data={children} cx={cx} cy={cy}
          startAngle={startAngle} endAngle={360 + startAngle}
          onClick={onClick} className="pie-menuItems"
          innerRadius="50%" outerRadius="100%" isAnimationActive={false}
        >
            {renderCells({
                children,
                stroke: 'transparent',
                fill: 'transparent',
            })}
        </Pie>;
    }

    get renderLabels() {
        const { toggleVisibility, children, cx, cy, startAngle } = this.props;
        return <Pie
          data={children} cx={cx} cy={cy}
          startAngle={startAngle} endAngle={360 + startAngle}
          onClick={toggleVisibility} className="pie-legend"
          labelLine={false} label={label}
          innerRadius="0%" outerRadius="33%" isAnimationActive={false}
        >
            {renderCells({
                children,
                stroke: 'transparent',
                fill: 'transparent',
            })}
        </Pie>;
    }

    render() {
        const { width = 100, height = 100, menuVisible } = this.props;
        const { renderLabels, renderMenu, renderBackground } = this;
        return <div className={`pie-menu ${menuVisible}`}>
            <PieChart width={width} height={height}>
                {renderBackground}
                {renderLabels}
                {renderMenu}
            </PieChart>
        </div>;
    }
}
