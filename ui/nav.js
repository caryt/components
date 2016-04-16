import React from 'react';

export const Nav =({brand, children}) =>
    <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">{brand}</a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
                <form className="navbar-form navbar-right">
                    {children}
                </form>
            </div>
        </div>
    </nav>;