import React from 'react';

import {emailSuffix} from "../lib/settings"
import {getGameState, getGlobalState} from "../lib/game";

export const Dashboard = React.createClass({
        mixins: [ReactMeteorData],
        getMeteorData(){
            if (Meteor.user()) {
                return {
                    user: Meteor.user(),
                    pregame: getGameState() == "pregame",
                    targetName: Meteor.user().profile.target_name,
                    freeForAll: getGlobalState("freeForAll")
                }
            } else {
                return {
                    user: {
                        username: "",
                        profile: {name: "", secret_words: ""},
                        emails: [{verified: false}]
                    },
                    pregame: getGameState() == "pregame",
                    targetName: "",
                    freeForAll: getGlobalState("freeForAll")
                }
            }
        },
        getInitialState(){
            return {error: "", FFAError: "", targetSecretWords: "", FFAWords: ""}
        },
        handleSecretWordsChange(e) {
            this.setState({targetSecretWords: e.target.value})
        },
        handleFFAWordsChange(e) {
            this.setState({FFAWords: e.target.value})
        },
        handleTag(e) {
            e.preventDefault();

            var secret_words = this.state.targetSecretWords.trim().toLowerCase();

            if (!secret_words || !secret_words.includes(" ")) {
                this.setState({error: <div className="callout small alert">Invalid input.</div>});
                return;
            }

            Meteor.call("user.tag", {secret_words}, (error, res) => {
                if (error) {
                    this.setState({error: <div className="callout small alert">{error.reason}</div>});
                    return;
                }
                this.setState({error: ""});
                alert("Tag Successful.");
            })
        },
        handleFFA(e) {
            e.preventDefault();

            var secret_words = this.state.FFAWords.trim().toLowerCase();

            if (!secret_words || !secret_words.includes(" ")) {
                this.setState({error: <div className="callout small alert">Invalid input.</div>});
                return;
            }

            Meteor.call("user.FFATag", {secret_words}, (error, res) => {
                if (error) {
                    this.setState({FFAError: <div className="callout small alert">{error.reason}</div>});
                    return;
                }
                this.setState({FFAError: ""});
                alert("FFA Successful.");
            })
        },
        render() {
            var target;
            if (this.data.pregame) {
                target = <h4>Targets will be assigned once the game starts.</h4>
            } else if (!this.data.user.profile.alive) {
                target = <h4>You have been eliminated.</h4>
            } else {
                target = (
                    <div>
                        <h5>Target info:</h5>
                        <p>Name: {this.data.targetName}</p>
                        <form onSubmit={this.handleTag}>
                            {this.state.error}
                            <label>Target's secret words
                                <input type="text" placeholder="Tomato Sneaker" required
                                       onChange={this.handleSecretWordsChange}/>
                            </label>
                            <input type="submit" className="button" value="Tag your target!"/>
                        </form>
                    </div>
                )
            }

            var FFA = "";
            if (this.data.freeForAll) {
                FFA = (
                    <div className="row">
                        <div className="small-12">
                            <div className="callout secondary">
                                <h5>Free For All Mode enabled!</h5>
                                <form onSubmit={this.handleFFA}>
                                    {this.state.error}
                                    <label>Target's secret words
                                        <input type="text" placeholder="Tomato Sneaker" required
                                               onChange={this.handleFFAWordsChange}/>
                                    </label>
                                    <input type="submit" className="button" value="Tag your target!"/>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }

            return (
                <div>
                    <h3>Dashboard:</h3>
                    {FFA}
                    <div className="row">
                        <div className="small-12 medium-6 columns">
                            <div className="callout secondary">
                                <h5>Your Info:</h5>
                                <p>Name: {this.data.user.profile.name}</p>
                                <p>Secret Words: {this.data.user.profile.secret_words}</p>
                                <p>Email: {this.data.user.username + "" + emailSuffix}</p>
                                <p>Email verified: {this.data.user.emails[0].verified.toString()}</p>
                            </div>
                        </div>
                        <div className="small-12 medium-6 columns">
                            <div className="callout secondary">
                                {target}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    })
    ;
