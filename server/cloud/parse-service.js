
/**  
    * Checks the user type.
    * @param request - Parse Request.
    * @returns 'admin' | 'cooperator'.
*/
async function userIsAdm(request) {
    if (!request.user) throw new Error( 'Usuário não tem sessão ativa');
    var queryRole = new Parse.Query(Parse.Role);
    queryRole.equalTo('name', 'Admin');
    var role = await queryRole.first({ useMasterKey: true });
    var relation = new Parse.Relation(role, 'users');
    var admins = relation.query();
    admins.equalTo('username', request.user.get('username'));
    var user = await admins.first({ useMasterKey: true });
    return user ? 'admin' : 'cooperator';
}

module.exports = {
    userIsAdm
};