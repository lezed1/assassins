import React from 'react';

// define and export our Layout component
export const Layout = ({content}) => {
    var dashboard_link = "";
    if (Meteor.loggingIn() || Meteor.userId()) {
        dashboard_link = <li><a href={FlowRouter.path("dashboard")}>Dashboard</a></li>
    }
    return (
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
                        {dashboard_link}
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
    )
};
