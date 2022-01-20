import { STEP_DELAY } from "../config"
import { delay, getHeight, staggerBoxes, syncBoxPositions } from "../utils"
import type { Box } from "../types"


async function quickSort(boxes: Box[ ]) {
    const sortedBoxes = _quickSort(boxes)

    boxes.length = 0
    boxes.push(...sortedBoxes)

    await delay(STEP_DELAY)

    // Animate the boxes to their new positions.
    await syncBoxPositions(boxes)

    await delay(STEP_DELAY)

    // Make the boxes "dance" on complete
    await staggerBoxes(boxes)
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
    
    for (let i = 0; i < pivotIndex; i++) {
        if (getHeight(boxes[i]) < getHeight(boxes[pivotIndex])) {
            smaller.push(boxes[i])
        }
        else {
            larger.push(boxes[i])
        }
    }

    return [
        ..._quickSort(smaller), 
        boxes[pivotIndex],
        ..._quickSort(larger)
    ]
}


export default quickSort
