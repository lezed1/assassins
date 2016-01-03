Meteor.methods
  start_game: ->
    players = _(Meteor.users.find().fetch()).shuffle()
    first_player = _.first(players)

    assign_target = (player1, player2) ->
      Meteor.users.update(player1._id, "$set": {target: player2._id})
      console.log("Assigned player #{player1._id} to target #{player2._id}!")
      player2

    _.reduce(players, assign_target, _.last(players))

    GameState.update({type: "status"}, {"$set": {gameState: "ingame"}})
    console.log("Assigned targets!")

  debug: -> console.log(Meteor.users.find().fetch())
