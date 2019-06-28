const db = require('../db/db');

module.exports.genCookie = login => {
    let cookie = login + new Date();
    loggedUsers.push(cookie);
    return cookie;
};

module.exports.existsUser = cookie => {
    if (loggedUsers.includes(cookie))
        return true;
    return false;
};