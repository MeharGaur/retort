import { STEP_DELAY } from "../config"
import type { Box } from "../types"
import { delay, getHeight, staggerBoxes, syncBoxPositions } from "../utils"


async function quickSort(boxes: Box[ ]) {
    const sortedBoxes = _quickSort(boxes)

    boxes.length = 0
    boxes.push(...sortedBoxes)

    
}


/** Internal quick sort function */
function _quickSort (boxes: Box[ ]) {
    // Base case
    if (boxes.length <= 1) {
        return boxes
    }

    // Recursive case- sort using pivot
    const pivotIndex = boxes.length - 1
    
    const smaller: Box[ ] = [ ] 
    const larger: Box[ ] = [ ] 

    for (const box of boxes) {
        if (getHeight(box) < getHeight(boxes[pivotIndex])) {
            smaller.push(box)
        }
        else {
            larger.push(box)
        }
    }

    return [
        ..._quickSort(smaller), 
        boxes[pivotIndex],
        ..._quickSort(larger)
    ]
}


export default quickSort
