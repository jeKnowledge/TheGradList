Accounts.onCreateUser(function(options, user) {
    user.follows = new Array();
    user.followed = new Array();
    user.medals = Number(0);
    user.facebook_login = false;
    return user;
});
