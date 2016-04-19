Meteor.publish('admin', function () {
    console.log(this.userId);
    if (this.userId && Meteor.users.findOne(this.userId).profile.admin) {
        console.log("true");
        return Meteor.users.find();
    }
    console.log("false");
});

Meteor.users.deny({
    update: function () {
        return true;
    }
});