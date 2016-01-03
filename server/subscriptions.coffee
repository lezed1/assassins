Meteor.publish 'target', ->
    console.log(@userId)
    if not @userId?
      return

    target_id = Targets.findOne(player_id: @userId).target_id
  
    [
      Targets.find(player_id: @userId),
      Meteor.users.find(target_id, fields: {profile: 1})
    ]
