import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Email} from 'meteor/email'
import {check, Match} from 'meteor/check';

import {words} from "./words";
import {emailSuffix} from "../lib/settings";
import {getGameState, setGameState, getGlobalState, setGlobalState, isElegibleUser} from "../lib/game";

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

        console.log("Signup!", name, id);

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

        // Accounts.sendVerificationEmail(a);

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
                console.log(`Tag! ${user.profile.name} has tagged ${target.profile.name}.`);
                Meteor.users.update(target._id, {$set: {"profile.alive": false}});
                Meteor.users.update(user._id, {
                    $set: {
                        "profile.target": target.profile.target,
                        "profile.target_name": target.profile.target_name
                    },
                    $inc: {"profile.tags": 1}
                });

                Email.send({
                    from: "no-reply@assassins.lezed1.com",
                    to: user.emails[0].address,
                    subject: "CUAUV Assassins Target tag",
                    text: `You have tagged ${target.profile.name}. You have reassigned to ${target.profile.target_name}.`
                });

                Email.send({
                    from: "no-reply@assassins.lezed1.com",
                    to: target.emails[0].address,
                    subject: "CUAUV Assassins elimination",
                    text: `You have been tagged by ${user.profile.name}.`
                });

                return "tag";
            }
            throw new Meteor.Error("Invalid secret words.", "Invalid secret words.");
        }
    },
    "user.FFATag"({secret_words}) {
        if (this.userId) {
            var target = Meteor.users.findOne({"profile.secret_words": secret_words, "profile.alive": true});

            if (target && isElegibleUser(target)) {
                var user = Meteor.users.findOne(this.userId);
                var assassin = Meteor.users.findOne({"profile.target": target._id});

                console.log(`FFA! ${user.profile.name} has tagged ${target.profile.name}.`);
                Meteor.users.update(target._id, {$set: {"profile.alive": false}});
                Meteor.users.update(assassin._id, {
                    $set: {
                        "profile.target": target.profile.target,
                        "profile.target_name": target.profile.target_name
                    }
                });
                Meteor.users.update(this.userId, {
                    $inc: {"profile.tags": 1}
                });

                Email.send({
                    from: "no-reply@assassins.lezed1.com",
                    to: user.emails[0].address,
                    subject: "CUAUV Assassins Free For All Target tag",
                    text: `You have tagged ${target.profile.name}.`
                });

                Email.send({
                    from: "no-reply@assassins.lezed1.com",
                    to: target.emails[0].address,
                    subject: "CUAUV Assassins Free For All elimination",
                    text: `You have been tagged by ${user.profile.name}.`
                });

                Email.send({
                    from: "no-reply@assassins.lezed1.com",
                    to: assassin.emails[0].address,
                    subject: "CUAUV Assassins Free For All Target reassignment",
                    text: `Your target was tagged in a Free For All. You have reassigned to ${target.profile.target_name}.`
                });

                return "ffa";
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
                    from: "no-reply@assassins.lezed1.com",
                    to: user.emails[0].address,
                    subject: "CUAUV Assassins Target Assignment",
                    text: `You have been assigned to ${user.profile.target_name}. Good luck!

Your Secret Words are "${user.profile.secret_words}". These are used to log in to your Dashboard and confirm tags. When you tag someone, you must ask and enter their secret words on your dashboard.

You can log in to your dashboard at https://assassins.lezed1.com/.`
                })
            })
        }
    },
    "shuffleTargets"() {
        if (isAdmin(this.userId)) {
            if (getGameState() != "ingame") {
                throw new Meteor.Error("Shuffle", "The game is not in the \"ingame\" state.");
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
                    from: "no-reply@assassins.lezed1.com",
                    to: user.emails[0].address,
                    subject: "CUAUV Assassins Target Shuffle",
                    text: `Targets have been shuffled! You have been reassigned to ${user.profile.target_name}. Good luck!`
                })
            })
        }
    },
    "toggleFreeForAll"() {
        if (isAdmin(this.userId)) {
            if (getGameState() != "ingame") {
                throw new Meteor.Error("Free for all", "The game is not in the \"ingame\" state.");
            }

            const freeForAll = !getGlobalState("freeForAll");

            console.log(`Setting freeForAll to ${freeForAll}`);

            setGlobalState("freeForAll", freeForAll);
        }
    }
});
