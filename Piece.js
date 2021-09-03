export function Piece (name, position, playerColor, value, selected = false, threatened = false, active = true){
    this.name = name
    this.position = position
    this.playerColor = playerColor
    this.selected = selected
    this.threatened = threatened
    this.active = active
    this.toMove = []
    this.toTake = []
    this.moved = false
    this.value = value
}