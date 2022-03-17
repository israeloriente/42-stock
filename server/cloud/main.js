var parse = require("./parse-service");


//                                      @@@ USER @@@
Parse.Cloud.define("userIsAdm", async (request) => { return await parse.userIsAdm(request)});


// @@@@@@@@@@@@@@@@@@@@ EVENTS HOOKS @@@@@@@@@@@@@@@@@@@@
// Execulta toda vez que "User" muda
Parse.Cloud.beforeSave(Parse.User, (req) => {
    // Bloqueia qualquer alteração em typeUser
    if (!req.master && req.object.op('typeUser')) throw new Error( 'Você não tem permissão');
});

// Define Product ACL
Parse.Cloud.beforeSave("Product", (request) => {
    if (!request.user) throw new Error( 'no_session');
    const ACL = new Parse.ACL();
    ACL.setRoleReadAccess('Admin', true);
    ACL.setRoleWriteAccess('Admin', true);
    request.object.setACL(ACL);
});
