Meteor.methods
  start_game: ->
    players = _(Meteor.users.find().fetch()).shuffle()
    first_player = _.first(players)

    assign_target = (player1, player2) ->
      Targets.remove({}) # Check game state, don't just throw out data...
      Targets.insert(player_id: player1._id, target_id: player2._id)
      console.log("Assigned player #{player1._id} to target #{player2._id}!")
      player2

    _.reduce(players, assign_target, _.last(players))

    GameState.update({type: "status"}, {"$set": {gameState: "ingame"}})
    console.log("Assigned targets!")

  debug: -> console.log(Meteor.users.find().fetch())
