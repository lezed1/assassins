import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check, Match} from 'meteor/check';

import {words} from "./words";
import {emailSuffix} from "../lib/settings";

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
            profile: {secret_words, name}
        };
        var a = Accounts.createUser(user);

        console.log(user);
        Accounts.sendVerificationEmail(a);


        return secret_words;

    }
});
