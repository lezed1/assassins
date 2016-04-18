import React from 'react';

import {Rules} from "./rules.jsx";

export const Home = () => (
    <div>
        <div className="row">
            <div className="small-12 medium-6 columns">
                <img src="/spoon_purple.png"/>
            </div>
            <div className="small-12 medium-6 columns">
                <h3>Sign Up:</h3>
                <p>Currently you must use the account dropdown in the top right corner.</p>
            </div>
        </div>
        <hr/>
        <Rules/>
    </div>
);