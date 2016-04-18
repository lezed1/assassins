import React from 'react';

// define and export our Layout component
export const Layout = ({content}) => (
    <div>
        <div className="top-bar">
            <div className="top-bar-left">
                <ul className="menu">
                    <li className="menu-text">Assassins</li>
                    <li><a href={FlowRouter.path("home")}>Home</a></li>
                </ul>
            </div>
            <div className="top-bar-right">
                <ul className="menu">
                    <li><a href="#">Sign Up</a></li>
                    <li><a href="#">Log In</a></li>
                    <li><a href={FlowRouter.path("test")}>dashboard</a></li>
                    <li><a href="#">Logout</a></li>
                </ul>
            </div>
        </div>

        <section role="main">
            <div className="row">
                <div className="small-12 columns">
                    {content}
                </div>
            </div>
        </section>
    </div>
);

// define and export our Welcome component
export const Welcome = ({name}) => (
    <div>
        Hello, {name}.
    </div>
);
