import React from 'react';
import {mount} from 'react-mounter';

// load Layout and Welcome React components
import {Layout, Welcome} from './app.jsx';
import {Home} from "./home.jsx";

FlowRouter.route("/", {
    name: "home",
    action() {
        mount(Layout, {
            content: (<Home name="lezed1"/>)
        });

        $(document).foundation();
    }
});

FlowRouter.route("/test", {
    name: "test",
    action() {
        mount(Layout, {
            content: (<Welcome name="test"/>)
        });

        $(document).foundation();
    }
});
