import React from 'react';

export const Leaderboard = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {userList: Meteor.users.find().fetch()}
    },
    render() {
        var fields = [
            {
                label: "Name",
                key: "profile.name"
            },
            {
                label: "Tags",
                key: "profile.tags"
            },
            {
                label: "Alive",
                key: "profile.alive",
                fn: (value, user, key) => user.profile.name.toString()
            }
        ];

        return (
            <BlazeToReact blazeTemplate="reactiveTable" class="table-scroll" fields={fields}
                          collection={Meteor.users} showNavigation="auto" rowsPerPage={10000}
                          rowClass={this.getRowClass}/>
        )
    }
});