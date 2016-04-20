import React from 'react';
import {Table, Sort} from "reactable";

import {createContainer} from 'meteor/react-meteor-data';


export var Admin = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            users: Meteor.users.find().fetch().map((user) => ({
                _id: user._id,
                name: user.profile.name,
                eChalkId: user.username,
                verified: user.emails[0].verified.toString(),
                enabled: user.profile.enabled || "UNSET",
                target: user.profile.target || "UNSET",
                tags: user.profile.tags || "UNSET",
                secret_words: user.profile.secret_words
            }))
        }
    },
    render() {
        const columns = [
            {
                label: "Name",
                key: "name"
            },
            {
                label: "eChalk ID",
                key: "eChalkId"
            },
            {
                label: "Verified",
                key: "verified"
            },
            {
                label: "enabled",
                key: "enabled"
            },
            {
                label: "target",
                key: "target"
            },
            {
                label: "tags",
                key: "tags"
            },
            {
                label: "Secret Words",
                key: "secret_words"
            }
        ];

        return (
            <Table className="hover table-scroll" data={this.data.users} columns={columns} sortable={true}
                   defaultSort={{column: 'Name', direction: 'desc'}}/>
        )
    }
});
