import React from 'react';

import {Rules} from "./rules.jsx";
import {SignUp} from "./accounts.jsx";
import {getGameState} from "../lib/game";

export const Home = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {pregame: getGameState() == "pregame"}
    },
    render() {
        var singup = "";
        if (this.data.pregame) {
            var signup = (
                <div className="columns">
                    <h3>Sign Up:</h3>
                    <p>Currently you must use this form to sign up, and the account dropdown to sign in.</p>
                    <SignUp />
                </div>
            );
        }

        return (
            <div>
                <div className="row medium-unstack align-center">
                    <div className="columns">
                        <img src="/spoon_purple.png"/>
                    </div>
                    {signup}
                </div>
                <hr/>
                <Rules/>
            </div>
        )
    }
});