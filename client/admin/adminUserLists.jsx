import React from 'react';

import {createContainer} from 'meteor/react-meteor-data';
import {isElegibleUser} from "/lib/game";

Template.enabler.events({
    "click"() {
        console.log(this)
        Meteor.users.update(this._id, {$set: {"profile.enabled": !this.profile.enabled}});
    }
});

export const AdminUserList = React.createClass({
    getRowClass(user) {
        if (isElegibleUser(user)) {
            return "success"
        } else {
            return ""
        }
    },
    render(){
        const fields = [
            {
                label: "Name",
                key: "profile.name"
            },
            {
                label: "eChalk ID",
                key: "username"
            },
            {
                label: "Verified",
                fn: (value, user, key) => user.emails[0].verified.toString()
            },
            {
                label: "enabled",
                // key: "profile.enabled",
                // fn: (value, user, key) => user.profile.enabled.toString(),
                // cellClass: "enabler",
                tmpl: Template.enabler
            },
            {
                label: "target",
                key: "profile.target"
            },
            {
                label: "tags",
                key: "profile.tags"
            },
            {
                label: "Secret Words",
                key: "profile.secret_words"
            }
        ];

        return (
            <div>
                <h3>Green rows will be put into the game.</h3>
                <BlazeToReact blazeTemplate="reactiveTable" class="table-scroll" fields={fields}
                              collection={Meteor.users} showNavigation="auto" rowsPerPage={10000}
                              rowClass={this.getRowClass}/>
            </div>
        )
    }
});
