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
