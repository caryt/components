import React from 'react';
import 'bootstrap-datepicker';
import { Icon } from './icon';
import { config } from 'reframed/index';

export const FormGroup = ({ label, children, id = '' }) =>
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
        const { label, children, id = '', ...props } = this.props;
        return <FormGroup label={label} id={id}>
            <input className="form-control" id={id} {...props} />
            {children}
        </FormGroup>;
    }
}

export class Datepicker extends React.Component {
    constructor() {
        super();
        this.state = { value: '' };
    }

    render() {
        const {
            label, children, id = '', placeholder = null, ...props
        } = this.props;
        const { dateFormat } = config.locale;
        return <FormGroup label={label} id={id}>
            <div className="input-group date">
                <input
                  className="form-control" id={id} type="text"
                  placeholder={placeholder || dateFormat}
                  data-provide="datepicker"
                  data-date-autoclose
                  data-date-today-highlight
                  data-date-show-on-focus={false}
                  data-date-format={ dateFormat }
                  {...props}
                />
                <span className="input-group-addon">
                    <Icon fa="calendar" />
                </span>
                {children}
            </div>
        </FormGroup>;
    }
}

export const Value = ({ label, value, id = '' }) =>
    <FormGroup label={label} id={id}>
        <span className="form-control" id={id}>{value}</span>
    </FormGroup>;
