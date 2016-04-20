Meteor.publish('admin', function () {
    if (this.userId && Meteor.users.findOne(this.userId).profile.admin) {
        return Meteor.users.find();
    }
});

Meteor.users.deny({
    update: function () {
        return true;
    }
});