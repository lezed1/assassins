import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Email} from 'meteor/email'
import {check, Match} from 'meteor/check';

import {words} from "./words";
import {emailSuffix} from "../lib/settings";
import {getGameState, setGameState, isElegibleUser} from "../lib/game";

var UserArchive = new Mongo.Collection("userArchive");

NonEmptyString = Match.Where(function (x) {
    check(x, String);
    return x.length > 0;
});


function isAdmin(userId) {
    var user = Meteor.users.findOne(userId);
    return user && user.profile.admin;
}

Meteor.methods({
    "user.signup"({name, id}){
        check(name, NonEmptyString);
        check(id, NonEmptyString);

        console.log(name, id);

        var secret1 = words[Math.floor(Math.random() * words.length)];
        var secret2 = words[Math.floor(Math.random() * words.length)];

        var secret_words = `${secret1} ${secret2}`;

        var user = {
            username: id,
            email: id + emailSuffix,
            password: secret_words,
            profile: {
                secret_words,
                name,
                enabled: false,
                tags: 0,
                target: "",
                alive: true
            }
        };
        var a = Accounts.createUser(user);

        Accounts.sendVerificationEmail(a);


        return secret_words;

    },
    "user.enable"(_id) {
        if (isAdmin(this.userId)) {
            var enabled = Meteor.users.findOne(_id).profile.enabled;
            Meteor.users.update(_id, {$set: {"profile.enabled": !enabled}});
        }
    },
    "user.hide"(_id) {
        if (isAdmin(this.userId)) {
            var user = Meteor.users.findOne(_id);
            UserArchive.insert(user);
            Meteor.users.remove(_id);
        }
    },
    "user.remove"(_id) {
        if (isAdmin(this.userId)) {
            var user = Meteor.users.findOne(_id);
            var assassin = Meteor.users.findOne({"profile.target": user._id});
            if (!assassin) {
                throw new Meteor.Error("Could not find assassin.");
            }
            console.log(user._id);
            console.log(assassin);

            Meteor.users.update(user._id, {$set: {"profile.alive": false}});
            Meteor.users.update(assassin._id, {
                $set: {
                    "profile.target": user.profile.target,
                    "profile.target_name": user.profile.target_name
                },
                $inc: {"profile.tags": 1}
            });
        }
    },
    "user.tag"({secret_words}) {
        if (this.userId) {
            var user = Meteor.users.findOne(this.userId);
            var target = Meteor.users.findOne(user.profile.target);
            if (target.profile.secret_words == secret_words) {
                console.log("Tag!");
                Meteor.users.update(target._id, {$set: {"profile.alive": false}});
                Meteor.users.update(user._id, {
                    $set: {
                        "profile.target": target.profile.target,
                        "profile.target_name": target.profile.target_name
                    },
                    $inc: {"profile.tags": 1}
                });
                return "tag"
            }
            throw new Meteor.Error("Invalid secret words.", "Invalid secret words.");
        }
    },
    "startGame"() {
        if (isAdmin(this.userId)) {
            if (getGameState() != "pregame") {
                throw new Meteor.Error("Game starts", "The game is not in the \"pregame\" state.");
            }

            console.log("Start the game?");

            var enabledUsers = _(_(Meteor.users.find().fetch().filter(isElegibleUser)).shuffle());
            console.log(enabledUsers.map(user => user.profile.name));

            enabledUsers.reduce((lastUser, currentUser) => {
                console.log(`${currentUser.profile.name} will target ${lastUser.profile.name}.`);
                Meteor.users.update(currentUser._id, {
                    $set: {
                        "profile.alive": true,
                        "profile.target": lastUser._id,
                        "profile.target_name": lastUser.profile.name
                    }
                });
                currentUser.profile.target_name = lastUser.profile.name;
                return currentUser;
            }, enabledUsers.last());

            setGameState("ingame");

            enabledUsers.forEach((user) => {
                Email.send({
                    from: "no-reply@spoons.lezed1.com",
                    to: user.emails[0].address,
                    subject: "Spoons Target Assignment",
                    text: `You have been assigned to ${user.profile.target_name}. Good luck!`
                })
            })
        }
    },
    "shuffleTargets"() {
        if (isAdmin(this.userId)) {
            if (getGameState() != "ingame") {
                throw new Meteor.Error("Game starts", "The game is not in the \"ingame\" state.");
            }

            console.log("Shuffling?");

            var aliveUsers = _(_(Meteor.users.find().fetch().filter(isElegibleUser).filter(user => user.profile.alive)).shuffle());
            console.log(aliveUsers.map(user => user.profile.name));

            aliveUsers.reduce((lastUser, currentUser) => {
                console.log(`${currentUser.profile.name} will target ${lastUser.profile.name}.`);
                Meteor.users.update(currentUser._id, {
                    $set: {
                        "profile.target": lastUser._id,
                        "profile.target_name": lastUser.profile.name
                    }
                });
                currentUser.profile.target_name = lastUser.profile.name;
                return currentUser;
            }, aliveUsers.last());

            aliveUsers.forEach((user) => {
                Email.send({
                    from: "no-reply@spoons.lezed1.com",
                    to: user.emails[0].address,
                    subject: "Spoons Target Assignment",
                    text: `You have been assigned to ${user.profile.target_name}. Good luck!`
                })
            })
        }
    }
});
