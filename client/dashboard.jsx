import React from 'react';

export const Dashboard = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        return Meteor.user()
    },
    render() {
        return (
            <div>
                <h3>Dashboard:</h3>
                <div className="row">
                    <div className="small-12 medium-6 columns">
                        <div className="callout secondary">
                            <h5>Your Info:</h5>
                            <p>Name: {this.data.profile.name}</p>
                            <p>Secret Words: {this.data.profile.secret_words}</p>
                            <p>Email verified: {this.data.emails[0].verified.toString()}</p>
                        </div>
                    </div>
                    <div className="small-12 medium-6 columns">
                        <div className="callout secondary">
                            <h4>Targets will be assigned once the game starts.</h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
