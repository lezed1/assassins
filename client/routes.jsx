import React from 'react';
import {mount} from 'react-mounter';

// load Layout and Welcome React components
import {Layout, Welcome} from './app.jsx';
import {Home} from "./home.jsx";
import {Dashboard} from "./dashboard.jsx";
import {AdminHome} from "./admin/admin.jsx";
import {AdminUserList} from "./admin/adminUserLists.jsx";
import {SignUpConfirm} from "./accounts.jsx";

FlowRouter.route("/", {
    name: "home",
    action() {
        mount(Layout, {
            content: (<Home/>)
        });
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
    }
});

var admin = loggedIn.group({
    prefix: "/admin",
    triggersEnter: [function () {
        if (!Meteor.loggingIn() && !Meteor.user().profile.admin) {
            FlowRouter.go("home");
        }
    }]
});

admin.route("/", {
    name: "admin",
    subscriptions() {
        this.register("admin", Meteor.subscribe("admin"));
    },
    action() {
        mount(Layout, {
            content: (<AdminHome/>)
        });
    }
});

admin.route("/users", {
    name: "admin.users",
    subscriptions() {
        this.register("admin", Meteor.subscribe("admin"));
    },
    action() {
        mount(Layout, {
            content: (<AdminUserList/>)
        });
    }
});
