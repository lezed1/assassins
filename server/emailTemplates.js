Accounts.emailTemplates.siteName = "JJHS Spoons";
Accounts.emailTemplates.from = "no-reply@spoons.lezed1.com";
Accounts.emailTemplates.subject = "Please verify you JJHS Spoons account.";
Accounts.emailTemplates.enrollAccount.text = function (user, url) {
    return "You must verify you JJSH Spoons account before the game starts if you would like to play" +
        "\n\n" + url;
};
