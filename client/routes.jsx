import React from 'react';
import {mount} from 'react-mounter';

// load Layout and Welcome React components
import {Layout, Welcome} from './app.jsx';
import {Home} from "./home.jsx";
import {Dashboard} from "./dashboard.jsx";
import {Admin} from "./admin.jsx";
import {SignUpConfirm} from "./accounts.jsx";

FlowRouter.route("/", {
    name: "home",
    action() {
        mount(Layout, {
            content: (<Home/>)
        });

        $(document).foundation();
    }
});

FlowRouter.route("/confirm", {
    name: "signup-confirm",
    action() {
        mount(Layout, {
            content: (<SignUpConfirm/>)
        });
    }
});

var loggedIn = FlowRouter.group({
    triggersEnter: [function () {
        if (!Meteor.loggingIn() && !Meteor.userId()) {
            FlowRouter.go("home");
        }
    }]
});

loggedIn.route("/dashboard", {
    name: "dashboard",
    action() {
        mount(Layout, {
            content: (<Dashboard/>)
        });

        $(document).foundation();
    }
});

var admin = loggedIn.group({
    triggersEnter: [function () {
        if (!Meteor.loggingIn() && !Meteor.user().profile.admin) {
            FlowRouter.go("home");
        }
    }]
});

admin.route("/admin", {
    name: "admin",
    subscriptions() {
        this.register("admin", Meteor.subscribe("admin"));
    },
    action() {
        mount(Layout, {
            content: (<Admin/>)
        });

        $(document).foundation();
    }
});
