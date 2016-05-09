/* Validators perform validation checks aganist Fields ina a Model
**/
import React from 'react';
import { forEach, i } from 'reframed/index';

// TODO - This could be replaced by a proper JSON-Schema implementation
// TODO - See http://json-schema.org/latest/json-schema-validation.html

/** Returns a function that validates if a field is non-blank.
**/
export const required = (model, field, value) => ({
    valid: value !== '',
    message: i`A value is required`,
});

// -----------------------------------------------------------------------------
// Helper Functions

export const validations = (model) => {
    if (model.validations !== null) { // null flags that re-validation required.
        return model.validations;
    }
    const schema = model.SCHEMA;
    const result = [];
    forEach(schema, (field, validators) =>
        validators.forEach(validator =>
            result.push({
                field,
                ...validator(model, field, model[field]),
            })
        )
    );
    return result;
};

export const validationMessages = model =>
    // TODO - TEMP Implementation for Testing
    // TDO - Actual UI TBD
    validations(model).map(item => (
        (item.valid)
            ? null
            : <div className="alert alert-danger" key={item.field}>
                {`${item.field}: ${item.message}`}
            </div>
    ));

export const isValid = model => {
    const v = validations(model);
    for (const item in v) { // eslint-disable-line no-restricted-syntax
        if (!v[item].valid) {
            return false;
        }
    }
    return true;
};
