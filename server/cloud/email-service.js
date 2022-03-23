const sgMail = require('@sendgrid/mail');
var parse = require("./parse-service");

/**  
* Report email trigger by users
* @param request - Default Parse Request
* @returns 'OK'.
*/
async function reportFromStudent(request) {
    const params = request.params;
    const config = await Parse.Config.get({useMasterKey: true});
    sgMail.setApiKey(config.get("SENDGRID_KEY"));
    const msg = {
        to: (await parse.getEmailList()).map((mail) => mail.get('email')),
        replyTo: '42lisboa@42solutions.pt',
        from: '42lisboa@42solutions.pt',
        subject: "Heyyyyyy",
        template_id: "d-ca5789413c7f4844a7b3a021a16ea98b",
        dynamic_template_data: {
            description: params.description,
            selected: params.selected
        }
    };
    try {
        await sgMail.send(msg);
        return 'OK'
    } catch (e) {
        return `Error: ${e.message}`
    }
}
/**  
* Report email trigger by cooperator
* @param request - Default Parse Request
* @returns 'OK'.
*/
async function reportFromCooperator(request) {
    const config = await Parse.Config.get({useMasterKey: true});
    sgMail.setApiKey(config.get("SENDGRID_KEY"));
    const msg = {
        to: (await parse.getEmailList()).map((mail) => mail.get('email')),
        replyTo: '42lisboa@42solutions.pt',
        from: '42lisboa@42solutions.pt',
        subject: "Heyyyyyy",
        template_id: "d-36dbed785abe41a58f1a4ce53d0be0da",
        dynamic_template_data: { selected: request.params.selected }
    };
    try {
        await sgMail.send(msg);
        return 'OK'
    } catch (e) {
        return `Error: ${e.message}`
    }
}

module.exports = {
    reportFromStudent,
    reportFromCooperator
};