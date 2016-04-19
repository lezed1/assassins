import React from 'react';
import SortableTable from 'react-sortable-table';

import {createContainer} from 'meteor/react-meteor-data';

window.React = React;


class Table extends React.Component {
    render() {
        return (
            <SortableTable data={this.props.data} columns={this.props.columns}/>
        )
    }
}

export var Admin = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            users: Meteor.users.find().fetch().map((user) => ({
                _id: user._id,
                name: user.profile.name,
                eChalkId: user.username,
                target: user.profile.target,
                tags: user.profile.tags,
                enabled: user.profile.enabled
            }))
        }
    },
    render() {
        const columns = [
            {
                header: "Name",
                key: "name",
                defaultSorting: "ASC"
            },
            {
                header: "eChalk ID",
                key: "eChalkId",
                defaultSorting: "ASC"
            },
            {
                header: "enabled",
                key: "enabled",
                defaultSorting: "ASC"
            },
            {
                header: "target",
                key: "target",
                defaultSorting: "ASC"
            },
            {
                header: "tags",
                key: "tags",
                defaultSorting: "ASC"
            }
        ];

        return (
            <Table data={this.data.users} columns={columns}/>
        )
    }
});

// export Admin = createContainer(({params})=>{
//
// });