import React from 'react';

export const Nav = ({ brand, children }) =>
    <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
            <div className="navbar-header">
                <NavButton className="collapsed">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </NavButton>
                {brand}
            </div>
            <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                    {React.Children.map(children, link => (
                      link.props.className
                        ? <li className={link.props.className}>
                            {link.props.children}
                        </li>
                        : <li>{link}</li>
                    ))}
                </ul>
            </div>
        </div>
    </nav>;

export const NavDropdown = ({ children }) =>
    <ul className="dropdown-menu">
        {React.Children.map(children, link =>
            <li>{link}</li>
        )}
    </ul>;

export const NavLink = ({ className = '', children }) =>
    <a
      href="#" className={`dropdown-toggle ${className}`}
      data-toggle="dropdown" role="button"
      aria-haspopup="true" aria-expanded="false"
    >
        {children}
    </a>;

export const NavButton = ({ className = '', children }) =>
    <button
      type="button" className={`navbar-toggle ${className}`}
      data-toggle="collapse" data-target="#navbar"
      aria-expanded="false" aria-controls="navbar"
    >
        {children}
    </button>;
