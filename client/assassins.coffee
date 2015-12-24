# counter starts at 0
Session.setDefault('counter', 0)

Template.Hello.helpers(counter: -> Session.get('counter'))

Template.Hello.events(
  'click button': ->
    # increment the counter when button is clicked
    Session.set('counter', Session.get('counter') + 1)
)

Router.plugin('ensureSignedIn', only: ['dashboard'])

Router.configure(layoutTemplate: 'ApplicationLayout')

Router.route('/hello', -> @render('Hello'))

Router.route('/', (-> @render('Home')),
  name: 'home'
  onBeforeAction: ->
    if not Meteor.user()?
      AccountsTemplates.setState('signUp')
    @next()
)

Router.route('/dashboard', (-> @render("Dashboard")),  name: 'dashboard')
