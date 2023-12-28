function stringGenerator(){

    let string = ''
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for(let i=0; i<20; i++){
        string += characters.charAt(Math.floor(Math.random()*characters.length))
    }
    return string
}

module.exports = stringGenerator()