import { LoadStorage, SaveStorage } from './LocalStorage.js'
import {App} from './App.js'
import {Dynamics} from './Dynamics.js'
import {Game} from './Game.js'

function newGame () {
    SaveStorage.gameLayout(new Game())
    App.createBoard()
    App.createPieces()
    Dynamics.renderLayout()
}

function settingsTab(){
    const settings = document.getElementById('settings-tab')
    const cont = document.getElementById('container')
    settings.classList.toggle('visible')
    cont.classList.toggle('shrink')
}

class UI {
    setUp(){
        const restart = document.getElementById('restart')
        const settings = document.getElementById('settings-icon')

        settings.addEventListener('click', settingsTab)
        restart.addEventListener('submit', newGame)
    }
}

window.onload = () => {
    const ui = new UI()

    ui.setUp()
    newGame()
}


