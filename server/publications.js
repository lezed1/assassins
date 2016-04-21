Meteor.publish('admin', function () {
    if (this.userId && Meteor.users.findOne(this.userId).profile.admin) {
        return Meteor.users.find();
    }
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