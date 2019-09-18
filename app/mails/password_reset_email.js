const sgMail = require('@sendgrid/mail');
let fs = require('fs');
import Mustache from 'mustache';

export default function SendResetPasswordRequestEmail(user, app) {
  let subject_tpl = fs.readFileSync(__dirname + '/templates/password_reset_email/subject.mustache', 'utf8');
  let body_tpl = fs.readFileSync(__dirname + '/templates/password_reset_email/body.mustache', 'utf8');

  let subject_view = {
    'email': user.email,
  };

  let body_view = {
    'passwordResetLink': app.config.mailer.passwordResetLink + user.resetPasswordToken,
  };

  let subject = Mustache.render(subject_tpl, subject_view);
  let body = Mustache.render(body_tpl, body_view);

  let msg = {
    from: app.config.mailer.from,
    to: user.email,
    subject: subject,
    html: body,
  };

  sgMail.setApiKey(app.config.mailer.sendgrid_api_key);
  if (process.env.TEST_ENV !== 'true') {
    sgMail.send(msg);
  }

}
