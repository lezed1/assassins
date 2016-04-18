import React from 'react';

import {Rules} from "./rules.jsx";
import {SignUp} from "./accounts.jsx";

export const Home = () => (
    <div>
        <div className="row">
            <div className="small-12 medium-6 columns">
                <img src="/spoon_purple.png"/>
            </div>
            <div className="small-12 medium-6 columns">
                <h3>Sign Up:</h3>
                <p>Currently you must use this form to sign up, and the account dropdown to sign in.</p>
                <SignUp />
            </div>
        </div>
        <hr/>
        <Rules/>
    </div>
);