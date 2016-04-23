import React from 'react';
import {PieChart, Pie, Cell} from 'recharts';

export class PieValue extends React.Component {
	constructor() {
		super();
		this.state = {menuVisibility: 'hide'};
	}

	toggleMenu() {
		const {menuVisibility} = this.state;
		this.setState({
			menuVisibility: (menuVisibility === 'show') ? 'hide' : 'show'
		});
	}

	selectMenu(...args) {
		this.props.onChange(...args);
		this.toggleMenu();
	}

	render() {
		const {Menu, value} = this.props;
		const {menuVisibility} = this.state;
		const {toggleMenu, selectMenu} = this;
		return <div className = "pie-value">
			<span className="value" onClick = {toggleMenu.bind(this)}>
				{value}
			</span>
			{React.cloneElement(
				Menu, {
					menuVisibility, 
					onClick: selectMenu.bind(this),
					toggleVisibility: toggleMenu.bind(this),
				}
			)}
		</div>;
	}
}

export class PieMenu extends React.Component {
	render() {
		const {onClick, children, width=100, height=100,
			startAngle=0, endAngle=360,  menuVisibility} = this.props;
		const {renderLabels, renderMenu, renderBackground} = this;
		return <div className = {`pie-menu ${menuVisibility}`}>
		    <PieChart width={width} height={height} 
		     startAngle={startAngle} endAngle={endAngle}> 
		        {renderBackground}
		        {renderLabels}
		        {renderMenu}
		    </PieChart>
	    </div>;
    }

	get renderBackground() {
		const {children, cx, cy} = this.props;
		return <Pie data = {children} cx = {cx} cy = {cy}  
         innerRadius = "50%" outerRadius = "100%" isAnimationActive={false}>
			{renderCells({
				children, 
				stroke: 'darkgrey', 
				fill: '#FDD44F'
			})}
	    </Pie>;
	}

	get renderMenu() {
		const {onClick, children, cx, cy} = this.props;
		return <Pie data = {children} cx = {cx} cy = {cy}  
         onClick = {onClick}
         innerRadius = "50%" outerRadius = "100%" isAnimationActive={false}>
			{renderCells({
				children, 
				stroke: 'transparent', 
				fill: 'transparent'
			})}
	    </Pie>;
	}

	get renderLabels() {
		const {toggleVisibility, children, cx, cy} = this.props;
		return <Pie data = {children} cx = {cx} cy = {cy}  
		 onClick = {toggleVisibility}
		 labelLine = {false} label = {label}
		 innerRadius = "0%" outerRadius = "50%" isAnimationActive={false}>
			{renderCells({
				children, 
				stroke: 'transparent', 
				fill: 'transparent'
			})}
	    </Pie>;	
	}
}

const label = ({x, y, label}) =>
	<text font-family='Arial' x={x} y={y}> {label} </text>;

const renderCells = ({children, stroke, fill}) =>
	children.map((entry, index) => 
		<Cell key={`cell-${index}`} stroke={stroke} fill={fill} />
	);
