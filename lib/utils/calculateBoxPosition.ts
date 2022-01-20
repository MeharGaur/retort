import { BOX_COUNT, BOX_GAP } from "../config"


function calculateBoxPosition (index: number) {
    return ((index - 0.5) - (BOX_COUNT / 2)) * BOX_GAP
}


export default calculateBoxPosition

