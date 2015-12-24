Template["Signup-old"].events(
  'submit form': (e) ->
    name = $(e.target).find("#signup-name").val()
    netid = $(e.target).find("#signup-netid").val()
)
