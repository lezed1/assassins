import {Mongo} from "meteor/mongo";

export var GameInternals = new Mongo.Collection("gameInternals");

export function isElegibleUser(user) {
    return user && user.emails[0].verified && user.profile.enabled && true;
}

export function elegibleUserCount() {
    return Meteor.users.find().fetch().filter(isElegibleUser).length;
}

export function getGameState() {
    return GameInternals.findOne({key: "gameState"}).value;
}

export function setGameState(value) {
    GameInternals.update({key: "gameState"}, {$set: {value}});
}

Meteor.startup(() => {

    if (Meteor.isServer) {
        if (!GameInternals.findOne({key: "gameState"})) {
            GameInternals.insert({key: "gameState", value: "pregame"});
        }
    }
});
