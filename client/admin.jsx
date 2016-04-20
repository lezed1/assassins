import React from 'react';
import {Table, Sort} from "reactable";

import {createContainer} from 'meteor/react-meteor-data';
import {elegibleUserCount} from "/lib/game";

export const AdminHome = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            userTotal: Meteor.users.find().count(),
            eligibleUserTotal: elegibleUserCount()
        }
    },
    render(){
        return (
            <div className="row">
                <div className="small-12 large-5 columns">
                    <div className="callout">
                        <h3>Summary:</h3>
                        <ul>
                            <li>Total users registered: {this.data.userTotal}</li>
                            <li>Eligible users: {this.data.eligibleUserTotal}</li>
                        </ul>
                    </div>
                </div>
                <div className="small-12 large-5 columns">
                    <div className="callout">
                        <h3>Actions.</h3>
                    </div>
                </div>
                <div className="small-12 large-2 columns">
                    <div className="callout">
                        <h3>Buttons.</h3>
                    </div>
                </div>
            </div>
        )
    }
});

export const AdminUserList = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            users: Meteor.users.find().fetch().map((user) => ({
                _id: user._id,
                name: user.profile.name,
                eChalkId: user.username,
                verified: user.emails[0].verified,
                enabled: user.profile.enabled,
                target: user.profile.target,
                tags: user.profile.tags,
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
