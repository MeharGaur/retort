import { Box } from "../types";


function getBoxPositions (boxes: Box[ ]) {
    return boxes.map(box => box.position)
}


export default getBoxPositions
