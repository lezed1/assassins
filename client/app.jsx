import React from 'react';

import AccountsUIWrapper from "./imports/ui/AccountsUIWrapper.jsx";

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
                    <li><a href={FlowRouter.path("test")}>Dashboard</a></li>
                    <li><BlazeToReact blazeTemplate="loginButtons" align="right"/></li>
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
