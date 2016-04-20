Meteor.startup(_=> {
    // Boolean type number is 8
    // db.users.update({"profile.enabled": {$exists: false}}, {$set: {"profile.enabled": false}}, {multi: true});
    // db.users.update({"profile.target": {$exists: false}}, {$set: {"profile.target": ""}}, {multi: true});
    // db.users.update({"profile.tags": {$exists: false}}, {$set: {"profile.tags": 0}}, {multi: true});
});