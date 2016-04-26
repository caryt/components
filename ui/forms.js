import React from 'react';

const FormGroup = ({ label, children, id }) =>
    <div className="form-group">
        {label ? <label htmlFor={id}>{label}</label> : false}
        {children}
    </div>;

export class Input extends React.Component {
    constructor() {
        super();
        this.state = { value: '' };
    }

    render() {
        const { label, children, id = 'x', ...props } = this.props; // TODO: Determine id how???
        return <FormGroup label={label} id={id}>
            <input className="form-control" id={id} {...props} />
            {children}
        </FormGroup>;
    }
}

export const Value = ({ label, value, id = 'x' }) => // TODO: Determine id how???
    <FormGroup label={label} id={id}>
        <span className="form-control" id={id}>{value}</span>
    </FormGroup>;
