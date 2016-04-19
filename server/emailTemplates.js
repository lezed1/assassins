Accounts.emailTemplates.siteName = "JJHS Spoons";
Accounts.emailTemplates.from = "no-reply@spoons.lezed1.com";
Accounts.emailTemplates.verifyEmail.subject = function (user) {
    return "Please verify you JJHS Spoons account."
};
Accounts.emailTemplates.verifyEmail.text = function (user, url) {
    return "Hello,\n" +
        "\n" +
        "You must verify you JJSH Spoons account before the game starts if you would like to play. " +
        "To do so, simply click the link below!\n" +
        "\n" +
        "You have been assigned two secret words - as the name implies do not share these with anyone else. " +
        "To fairly confirm tags, the tagger must type his target's secret words on his dashboard. " +
        "Thus, if you share your secret words, your tagger may be able to eliminate you from the game.\n" +
        "\n" +
        "Secret Words: " + user.profile.secret_words + "\n" +
        "\n" +
        "Confirmation link: " + url;

};
