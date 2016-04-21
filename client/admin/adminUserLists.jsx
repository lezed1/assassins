import React from 'react';
import {Table, Sort} from "reactable";

import {createContainer} from 'meteor/react-meteor-data';
import {isElegibleUser} from "/lib/game";

const UserRow = React.createClass({
    render() {
        return (
            <tr>
                <td>{this.props.user.name}</td>
                <td>{this.props.user.eChalkId}</td>
                <td>{this.props.user.verified}</td>
                <td>{this.props.user.enabled}</td>
                <td>{this.props.user.target}</td>
                <td>{this.props.user.tags}</td>
                <td>{this.props.user.secret_words}</td>
            </tr>
        )
    }
});

export const AdminUserList = React.createClass({
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
                key: "profile.enabled",
                fn: (value, user, key) => user.profile.enabled.toString()
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
            <BlazeToReact blazeTemplate="reactiveTable" class="hover table-scroll" fields={fields}
                          collection={Meteor.users} showNavigation="auto" rowsPerPage={10000}/>
        )
    }
});
