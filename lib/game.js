import {Mongo} from "meteor/mongo";

export var GameInternals = new Mongo.Collection("gameInternals");

export function isElegibleUser(user) {
    return user && user.emails[0].verified && user.profile.enabled && true;
}

export function elegibleUserCount() {
    return Meteor.users.find().fetch().filter(isElegibleUser).length;
}

export function getGameState() {
    var gameState = GameInternals.findOne({key: "gameState"});
    if (!gameState) {
        return "";
    }
    return gameState.value;
}

export function setGameState(value) {
    GameInternals.update({key: "gameState"}, {$set: {value}});
}

export function getGlobalState(key) {
    var gameState = GameInternals.findOne({key});
    if (!gameState) {
        return "";
    }
    return gameState.value;
}

export function setGlobalState(key, value) {
    GameInternals.update({key}, {$set: {value}});
}

Meteor.startup(() => {

    if (Meteor.isServer) {
        if (!GameInternals.findOne({key: "gameState"})) {
            GameInternals.insert({key: "gameState", value: "pregame"});
        }
        if (!GameInternals.findOne({key: "freeForAll"})) {
            GameInternals.insert({key: "freeForAll", value: false});
        }
    }
});
