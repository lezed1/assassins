export function isElegibleUser(user) {
    return user && user.emails[0].verified && user.profile.enabled && true;
}

export function elegibleUserCount() {
    return Meteor.users.find().fetch().filter(isElegibleUser).length;
}