import {LoadStorage, SaveStorage} from './LocalStorage.js'
import {Cell} from './Cell.js'
import {Piece} from './Piece.js'


export class App {
    static createBoard(layout = LoadStorage.gameLayout()) {
        for(let i=0; i<8; i++){
            for(let j=0; j<8; j++){
                const cell = new Cell(`${i}${j}`)
                if(i % 2 === 0){
                    if(j % 2 === 0) cell.color = '#ffffff'
                    else cell.color = '#424242'
                }else{
                    if(j % 2 === 0) cell.color = '#424242'
                    else cell.color = '#ffffff'
                }
                layout.board.push(cell)    
            }
        }
        SaveStorage.gameLayout(layout)
    }

    static createPieces(layout = LoadStorage.gameLayout()){
        for(let player = 1; player < 3; player++){
            const playerColor = (player === 1 ? 'black' : 'white')
            for(let j = 0; j < 8; j++){ //pawns
                let pawn = new Piece('pawn', `${player === 1 ? 1 : 6}${j}`, playerColor, 1)
                pawn.moved = false
                layout.pieces.push(pawn)
            }
            for(let N = 1; N < 3; N++){ //dual pieces
                let rook = new Piece('rook', `${player === 1 ? 0 : 7 }${N === 1 ? 0 : 7}`, playerColor, 5)
                let knight = new Piece('knight', `${player === 1 ? 0 : 7}${N === 1 ? 1 : 6}`, playerColor, 3)
                let bishop = new Piece('bishop', `${player === 1 ? 0 : 7}${N === 1 ? 2 : 5}`, playerColor, 3)
                layout.pieces.push(rook, knight, bishop)
            }
            //unique pieces
            let queen = new Piece('queen', `${player === 1 ? 0 : 7}3`, playerColor, 9)
            let king = new Piece('king', `${player === 1 ? 0 : 7}4`, playerColor, 0)
            layout.pieces.push(queen, king)
        }
        SaveStorage.gameLayout(layout)
    }

    static moves(layout = LoadStorage.gameLayout()){
        layout.pieces.forEach((piece)=>{
            let toMove = [], toTake = []
            switch(piece.name){
                    case 'pawn':
                        const endPawn = piece.moved === false ? 3 : 2
                        let pos = ''
                        for(let i = 1; i < endPawn; i++){
                            if(piece.playerColor === 'white') pos = `${Number(piece.position[0])-i}${piece.position[1]}`
                            else pos = `${Number(piece.position[0])+i}${piece.position[1]}`
                            if(runAcross(pos, true)) i = endPawn                     
                        }
                        break
                    case 'knight':
                        const relativePositions = [[1,2],[2,1],[-1,-2],[-2,-1],[-1,2],[-2,1],[1,-2],[2,-1]]
                        for(let i = 0; i < relativePositions.length; i++) {
                            const pos = `${Number(piece.position[0]) + relativePositions[i][0]}${Number(piece.position[1]) + relativePositions[i][1]}` 
                            runAcross(pos)
                        }
                        break;
                    case 'rook':
                        rook()
                        break
                    case 'bishop':
                        bishop()
                        break
                    case 'queen':
                        rook()
                        bishop()
                        break
                    case 'king': 
                        rook(2)
                        bishop(2)
                        break
            }

            function bishop(max = 8){   
                for(let direction = 0; direction < 4 ; direction++){
                    for(let i = 1; i < max; i++){
                        let pos = ''
                        switch(direction){
                            case 0: pos = `${Number(piece.position[0]) + i}${Number(piece.position[1]) + i}`
                                    break
                            case 1: pos = `${Number(piece.position[0]) - i}${Number(piece.position[1]) + i}`
                                    break
                            case 2: pos = `${Number(piece.position[0]) + i}${Number(piece.position[1]) - i}`
                                    break
                            case 3: pos = `${Number(piece.position[0]) - i}${Number(piece.position[1]) - i}`
                                    break
                        }
                        if(runAcross(pos)) i=8
                    }
                }
            }

            function rook(max = 8){
                for(let direction = 0; direction < 4 ; direction++){
                    for(let i = 1; i < max; i++){
                        let pos = ''
                        switch(direction){
                            case 0: pos = `${Number(piece.position[0])}${Number(piece.position[1]) + i}`
                                    break
                            case 1: pos = `${Number(piece.position[0])}${Number(piece.position[1]) - i}`
                                    break
                            case 2: pos = `${Number(piece.position[0]) + i}${Number(piece.position[1])}`
                                    break
                            case 3: pos = `${Number(piece.position[0]) - i}${Number(piece.position[1])}`
                                    break
                        }
                        if(runAcross(pos)) i=8
                    }
                }
            }
            
            function runAcross(pos, isPawn = false){
                const topado = layout.pieces.find(el => el.position === pos) || false
                if(topado){
                    if(topado.playerColor !== piece.playerColor && !isPawn) toTake.push(pos)
                    return true
                }else{
                    toMove.push(pos)
                    return false
                }

            }
            piece.toMove = toMove
            piece.toTake = toTake
        })
        SaveStorage.gameLayout(layout)
    }

    static updatePieces(originID, destinationID, layout = LoadStorage.gameLayout()){
        layout.pieces.forEach((piece)=>{
            if(piece.position === destinationID){
                piece.active = false
                layout.taken.push(piece)
                layout.pieces = layout.pieces.filter(piece => piece.active === true)
            } 
            if(piece.position === originID) {
                piece.position = destinationID
                piece.selected = false
                piece.moved = true
            }
        })
        layout.currentTurn = layout.currentTurn === 'white' ? 'black' : 'white'
        SaveStorage.gameLayout(layout)    
    }

}