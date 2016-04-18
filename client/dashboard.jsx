import React from 'react';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = Meteor.user().profile;
    }

    render() {
        return (
            <div>
                <h3>Dashboard:</h3>
                <div className="row">
                    <div className="small-12 medium-6 columns">
                        <div className="callout secondary">
                            <h5>Your Info:</h5>
                            <p>Name: {this.state.name}</p>
                            <p>Secret Words: {this.state.secret_words}</p>
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
}
