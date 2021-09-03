import {LoadStorage, SaveStorage} from './LocalStorage.js'
import {App} from './App.js'

export class Dynamics {
    static renderLayout (layout = LoadStorage.gameLayout()) { //put pieces in board and render 
        const board = document.getElementById('board')
        board.innerHTML = ''
        layout.board.forEach((el) => {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            cell.id = el.id
            cell.style.backgroundColor = el.color
            layout.pieces.forEach((piece) => { 
                if(piece.position === el.id){
                    const png = document.createElement('img')
                    png.classList.add('piece')
                    png.src = `./media/img/${piece.playerColor}${piece.name}.png`
                    png.addEventListener('mousedown', (evt) => {
                        Dynamics.select(evt)
                    })
                    cell.appendChild(png)
                }
            board.appendChild(cell)        
            })
        })
        App.moves()
    }

    static select(evt, layout = LoadStorage.gameLayout()){ //confirms turn and if no piece is selected before path rendering. ()
        const piece = layout.pieces.find(piece => piece.position === evt.target.parentElement.id)
            if( layout.currentTurn === piece.playerColor &&
                layout.pieces.filter((otherPiece) => otherPiece.position !== piece.position).every((el) => el.selected !== true)
            ){
                evt.target.parentElement.classList.toggle('path')
                piece.selected = piece.selected === true ? false : true
                SaveStorage.gameLayout(layout)
                Dynamics.renderPath(piece)
            }
    }

    static renderPath(piece){ //show possible destinations
        const cells = [...document.getElementsByClassName('cell')]
        piece.toMove.forEach((destination) => {
            cells.forEach((cell) => {
                if(cell.id === destination){
                    if(!piece.selected){
                        cell.removeEventListener('click', Dynamics.renderMove)
                    }                    
                    else{
                        cell.addEventListener('click', Dynamics.renderMove)
                    }
                    cell.classList.toggle('path')
                }
            })
        })    
        piece.toTake.forEach((destination) => {
            cells.forEach((cell) => {
                if(cell.id === destination){    
                    if(!piece.selected){
                        cell.removeEventListener('click', this.renderMove)
                    }                    
                    else{
                        cell.addEventListener('click', this.renderMove)
                    }
                    cell.classList.toggle('take')
                }
            })
        })    
       
    }

    static renderMove(evt){ //changes pieces positions
        const layout = LoadStorage.gameLayout()
        const piece = layout.pieces.find(piece => piece.selected)
        const from = piece.position
        const to = evt.target.tagName === 'IMG' ? evt.target.parentElement.id :  evt.target.id
        if(evt.target.tagName === 'IMG') Dynamics.playSound('take')
        else Dynamics.playSound('move')
        App.updatePieces(from, to)
        Dynamics.renderLayout()
    }

    static playSound(type){ //plays a sound
        const audio = document.getElementById('sound')
        switch(type){
            case 'move': audio.src = './media/audio/move.mp3'
                        break
            case 'take': audio.src = './media/audio/take.mp3' 
                        break
            case 'check': break
        }
        audio.play()
    }
}


