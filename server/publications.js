import {GameInternals} from "../lib/game";

Meteor.publish('admin', function () {
    if (this.userId && Meteor.users.findOne(this.userId).profile.admin) {
        return Meteor.users.find();
    }
});

Meteor.publish('leaderboard', function () {
    return Meteor.users.find({"profile.enabled": true}, {
        fields: {
            "profile.name": 1,
            "profile.tags": 1,
            "profile.alive": 1
        }
    })
});

Meteor.publish('targetName', () => {
    if (this.userId) {
        var target_id = Meteor.users.findOne(this.userId).profile.target;
        if (target_id) {
            return
        }
        return Meteor.users.find(target_id, {fields: {"profile.name": 1}});
    }
});

Meteor.publish(null, function () {
    return GameInternals.find();
});

function isAdmin(userId) {
    return Meteor.users.findOne(userId).profile.admin;
}

Meteor.users.deny({
    update: (userId) => !isAdmin
});

Meteor.users.allow({
    update: isAdmin
});
