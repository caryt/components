import React from 'react';
import {PieChart, Pie, Cell, Tooltip as _Tooltip} from 'recharts';

export const Donut = ({children, colors, Tooltip,
 cx, cy, innerRadius, outerRadius, width, height}) => 
    <PieChart width = {width} height = {height}>
        <Pie data = {children} cx = {cx} cy = {cy} 
         innerRadius = {innerRadius} outerRadius = {outerRadius}>
            {children.map((entry, index) => 
	            <Cell key = {`cell-${index}`} fill = {colors[entry.name]} />
	        )}
	    </Pie>
	    <_Tooltip content = {<Tooltip/>}/>
    </PieChart>;
