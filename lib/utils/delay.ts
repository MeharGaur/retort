
function delay (milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


export default delay
