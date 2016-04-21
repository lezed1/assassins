import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check, Match} from 'meteor/check';

import {words} from "./words";
import {emailSuffix} from "../lib/settings";

var UserArchive = new Mongo.Collection("userArchive");

NonEmptyString = Match.Where(function (x) {
    check(x, String);
    return x.length > 0;
});

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
                target: ""
            }
        };
        var a = Accounts.createUser(user);

        console.log(user);
        Accounts.sendVerificationEmail(a);


        return secret_words;

    },
    "user.enable"(_id) {
        if (Meteor.users.findOne(this.userId).profile.admin) {
            var enabled = Meteor.users.findOne(_id).profile.enabled;
            Meteor.users.update(_id, {$set: {"profile.enabled": !enabled}});
        }
    },
    "user.hide"(_id) {
        if (Meteor.users.findOne(this.userId).profile.admin) {
            var user = Meteor.users.findOne(_id);
            UserArchive.insert(user);
            Meteor.users.remove(_id);
        }
    }
});
