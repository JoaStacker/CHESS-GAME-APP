export class LoadStorage {
    static gameLayout(){
        if(localStorage.getItem('gameLayout') !== null){
            return JSON.parse(localStorage.getItem('gameLayout'))
        }
        return 'No local storage found'
    }
    // static history(){
    //     if(localStorage.getItem('history') !== null){
    //         return JSON.parse(localStorage.getItem('history')).history
    //     }
    //     return undefined
    // }
}

export class SaveStorage {
    static gameLayout(layout){
        localStorage.setItem('gameLayout', JSON.stringify(layout))
    }

    // static history(layout = LoadStorage.gameLayout( )){
    //     if(localStorage.getItem('history') !== null){
    //         let obj = JSON.parse(localStorage.getItem('history'))
    //         obj.history.push(layout)
    //         localStorage.setItem('history', JSON.stringify(obj))
    //     }else{
    //         localStorage.setItem('history', JSON.stringify({history: [layout]}))
    //     }
    // }
}


