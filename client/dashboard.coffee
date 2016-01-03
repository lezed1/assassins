Template.Dashboard.helpers
  targetName: ->
    target_id = Targets.findOne(player_id: Meteor.userId())?.target_id
    Meteor.users.findOne(target_id)?.profile.name

    targetId: -> Targets.findOne(player_id: Meteor.userId())?.target_id
