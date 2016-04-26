import React from 'react';
import 'bootstrap';

const close =
    <button
      type="button" className="close"
      data-dismiss="alert" aria-label="Close"
    >
        <span aria-hidden="true">&times;</span>
    </button>;

export const Error = ({ error }) => (
    (error)
        ? <div className="alert alert-warning alert-dismissible" role="alert">
            {close}
            <strong>Error</strong> {error.message}.
        </div>
        : null
    );
