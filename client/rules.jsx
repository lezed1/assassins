import React from 'react';

import {getGameState} from "../lib/game";


export const Rules = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        return {pregame: getGameState() == "pregame"}
    },
    render() {
        var rulesState;
        if (this.data.pregame) {
            rulesState = (
                <div className="callout warning">
                    These rules are subject to change without notification until the game starts, at which point they
                    will become final.
                </div>
            );
        } else {
            rulesState = (
                <div className="callout secondary">
                    These rules are final and will not be changed without a notification email being sent to every
                    player.
                </div>
            );
        }

        return (
            <div>
                <div className="row">
                    <div className="small-12 columns">
                        <div className="callout primary">
                            {rulesState}
                            <ul>
                                <li>
                                    The Assassins game will start at 9:00 am on Monday, November 13th. You will
                                    receive a target and your objective as an assassin it to “kill” your target by
                                    touching them with a plastic spoon. If you successfully assassinate your target,
                                    they are now out of the game and their target becomes your new target. The last
                                    person standing wins!
                                </li>
                                <li>
                                    No assassinations are allowed in these places/times:
                                    <ul>
                                        <li>CUAUV lab space <strong>when doing work</strong> (no hiding)</li>
                                        <li>Official CUAUV meetings, pool tests, work periods, or socials
                                            (subteam meetings, machining, office hours)</li>
                                        <li>During any event in Student Center (lectures, discussions, labs, etc)
                                            or official class related work (prelims, review sessions, etc)</li>
                                    </ul>
                                <li>
                                    Assassinations are allowed in these places/times:
                                    <ul>
                                        <li>During non-CUAUV clubs/teams events</li>
                                        <li>In dorms/apartments</li>
                                    </ul>
                                </li>
                                <li>
                                    Your victim cannot see you approach and kill.
                                </li>
                                <li>
                                    The kill must be done with a <strong>plastic</strong> spoon (you can pick one up at Mattin’s)
                                </li>
                                <li>
                                    The kill is considered complete if the spoon makes contact with your target’s
                                    person (touching backpacks or accessories does not count)
                                </li>
                                <li>
                                    If you successfully tag your target, you must type your target's secret words into
                                    the appropriate textbox on your Dashboard. This is confirm your tag and
                                    automatically assign up a new target. The tag and new assignment will also be
                                    confirmed by Email.
                                </li>
                                <li>
                                    Most importantly please remember that this is for fun. Play with good sportsmanship
                                    and have fun playing.
                                </li>
                                <li>
                                    Communication for CUAUV Assassins will be sent out via Slack or email so please check
                                    it regularly. Not checking your email or Slack will not be an acceptable excuse for not
                                    knowing what’s going on.
                                </li>
                            </ul>
                            <p>
                                If, at any time, this game gets out of hand it will get cancelled.
                            </p>
                            <p>
                                If you have any questions about the rules, or feel that a player is using the wording of
                                the rules to gain an unfair advantage, please let us know!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
