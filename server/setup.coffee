# GameState has a record for the current state of the game.
# type: "status"
# gameState: "pregame" / "ingame" / "postgame"

if not (GameState.findOne type: "status")?
  GameState.insert {type: "status", gameState: "pregame"}
