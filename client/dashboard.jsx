import React from 'react';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <h3>Dashboard:</h3>
                <div className="row">
                    <div className="small-12 medium-6 columns">
                        <div className="callout">
                            <h3>Your Info!</h3>
                        </div>
                    </div>
                    <div className="small-12 medium-6 columns">
                        <div className="callout">
                            <h3>Target Info!</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
