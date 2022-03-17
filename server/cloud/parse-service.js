
/**  
    * Checks the user type.
    * @param request - Parse Request.
    * @returns 'admin' | 'cooperator'.
*/
async function userIsAdm(request) {
    if (!request.user) throw new Error( 'No_session');
    var queryRole = new Parse.Query(Parse.Role);
    queryRole.equalTo('name', 'Admin');
    var role = await queryRole.first({ useMasterKey: true });
    var relation = new Parse.Relation(role, 'users');
    var admins = relation.query();
    admins.equalTo('username', request.user.get('username'));
    var user = await admins.first({ useMasterKey: true });
    return user ? 'admin' : 'cooperator';
}
/**  
    * Create User account.
    * @param request - Parse Request.
    * @returns Object Destroyed.
*/
async function createUser(request) {
    if (!request.user) throw new Error( 'No_session');
    // Check current user permission
    if (await userIsAdm(request) != 'admin') throw new Error( 'Permission denied 😅');
    const data = request.params;
    const user = new Parse.User();
    user.set('name', data.name);
    user.set('username', data.email);
    user.set('email', data.email);
    // Low security level
    user.set('password', '#Password12342');
    return await user.signUp(null, {useMasterKey: true});
}
/**  
    * Destroy User passed.
    * @param request - Parse Request.
    * @returns Object Destroyed.
*/
async function destroyUser(request) {
    if (!request.user) throw new Error( 'No_session');
    // Check current user permission
    if (await userIsAdm(request) != 'admin') throw new Error( 'Permission denied 😅');
    const User = new Parse.User();
    const query = new Parse.Query(User);
    let user = await query.get(request.params.userId, {useMasterKey: true});
    return await user.destroy({useMasterKey: true});
}

module.exports = {
    userIsAdm,
    createUser,
    destroyUser
};