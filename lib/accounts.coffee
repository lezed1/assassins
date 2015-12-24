# Options
AccountsTemplates.configure(
  confirmPassword: false
  enablePasswordChange: true
  sendVerificationEmail: true

  showForgotPasswordLink: true
  showResendVerificationEmailLink: true

  continuousValidation: true
  negativeValidation: false
  positiveValidation: true
  negativeFeedback: true
  positiveFeedback: true
  showValidating: true

  defaultLayout: 'ApplicationLayout'
)

passwordField = AccountsTemplates.removeField('password')
emailField = AccountsTemplates.removeField('email')

AccountsTemplates.addField(
  _id: 'name'
  type: 'text'
  displayName: 'Name'
  required: true
)

AccountsTemplates.addField(
  _id: 'email'
  type: 'email'
  required: true
  displayName: "email"
  re: /.+@(.+){2,}\.(.+){2,}/
  func: (addr) -> false
  errStr: "Invalid email"
)

AccountsTemplates.addField(passwordField)

# Routes
AccountsTemplates.configureRoute('changePwd')
AccountsTemplates.configureRoute('enrollAccount')
AccountsTemplates.configureRoute('forgotPwd')
AccountsTemplates.configureRoute('resetPwd')
AccountsTemplates.configureRoute('signIn')
AccountsTemplates.configureRoute('signUp')
AccountsTemplates.configureRoute('verifyEmail')

