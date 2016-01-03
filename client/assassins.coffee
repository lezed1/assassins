# Session variable for the current gameState
Tracker.autorun ->
  status = GameState.findOne(type: "status")
  if status?
    Session.set("gameState", status.gameState)

# Routing
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

Router.route('/dashboard', (-> @render("Dashboard")),
  name: 'dashboard'
  subscriptions: -> @subscribe('target') # This is not reactive...
)
