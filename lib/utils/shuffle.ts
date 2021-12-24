
/**
 * Fisher-Yates shuffle (Knuth shuffle)
 * https://bost.ocks.org/mike/shuffle/
 */
function shuffle(array: any[]) {
    let currentIndex = array.length
    let randomIndex: number

    // While there remain elements to shuffle
    while (currentIndex) {
        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex--)

        // And swap it with the current element
        let temp = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temp
    }

    return array
}


export default shuffle
