import React from 'react';

import {createContainer} from 'meteor/react-meteor-data';
import {isElegibleUser} from "/lib/game";

Template.enabler.events({
    "click"() {
        Meteor.users.update(this._id, {$set: {"profile.enabled": !this.profile.enabled}});
    }
});

Template.disabler.events({
    "click"() {
        if (this.profile.enabled) {
            alert("You cannot hide an enabled user.");
            return;
        }
        if (confirm(`Do you want to hide ${this.profile.name} (id: ${this.username}) (verified: ${this.emails[0].verified})`)) {
            console.log(this._id);
            Meteor.call("user.hide", this._id);
        }
    }
});

Template.namer.events({
    "dblclick"() {
        var name = prompt(`Enter a new name for ${this.profile.name} (id: ${this.username})`);

        if (name != null) {
            Meteor.users.update(this._id, {$set: {"profile.name": name}});
        }
    }
});

Template.usernamer.events({
    "dblclick"() {
        var username = prompt(`Enter a new ID for ${this.profile.name} (id: ${this.username})`);

        if (username != null) {
            if (Meteor.users.findOne({username: username})) {
                alert("This username is already taken.");
                return;
            }

            Meteor.users.update(this._id, {$set: {"username": username}});
        }
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
                label: "Hide",
                fn: () => "",
                tmpl: Template.disabler
            },
            {
                label: "Name",
                key: "profile.name",
                tmpl: Template.namer
            },
            {
                label: "eChalk ID",
                key: "username",
                tmpl: Template.usernamer
            },
            {
                label: "Verified",
                fn: (value, user, key) => user.emails[0].verified.toString()
            },
            {
                label: "Alive",
                ket: "profile.alive",
                fn: (value, user, key) => user.profile.alive.toString()
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
                <h3>Green rows will be put into the game, red X to hide a user. Double click to edit name or ID.</h3>
                <BlazeToReact blazeTemplate="reactiveTable" class="table-scroll" fields={fields}
                              collection={Meteor.users} showNavigation="auto" rowsPerPage={10000}
                              rowClass={this.getRowClass}/>
            </div>
        )
    }
});
