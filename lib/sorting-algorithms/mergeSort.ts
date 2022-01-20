
// ****** TODO: don;t worry about visualizing the recursion
// Do the same thing I did with radix sort,
// just sort it and then tween all cubes to new position
// ^^^ extract that part into a util function cause i'll 
// use it in quick sort as well

import { STEP_DELAY } from "../config"
import type { Box } from "../types"
import { delay, getHeight, staggerBoxes, syncBoxPositions } from "../utils"


async function mergeSort (boxes: Box[ ]) {
    const sortedBoxes = _mergeSort(boxes)

    boxes.length = 0
    boxes.push(...sortedBoxes)

    await delay(STEP_DELAY)

    // Animate the boxes to their new positions.
    await syncBoxPositions(boxes)

    await delay(STEP_DELAY)

    // Make the boxes "dance" on complete
    await staggerBoxes(boxes)
}


/** Internal merge sort function */
function _mergeSort (boxes: Box[ ]) {
    // Base case
    if (boxes.length <= 1) {
        return boxes
    }

    // Recursive case - split left and right further
    const middleIndex = Math.ceil(boxes.length / 2)

    const left = boxes.slice(0, middleIndex)
    const right = boxes.slice(middleIndex)

    return merge(_mergeSort(left), _mergeSort(right))
}

/** Merge two Box arrays in sorted order */
function merge (left: Box[ ], right: Box[ ]) {
    const mergedArray: Box[ ] = [ ]

    // Keep merging until one side becomes empty
    while (left.length && right.length) {
        if (getHeight(left[0]) > getHeight(right[0])) {
            mergedArray.push(right.shift())
        }
        else {
            mergedArray.push(left.shift())
        }
    }

    // Concat the remaining array cause other side is empty
    if (!left.length) {
        mergedArray.push(...right)
    }
    else if (!right.length) {
        mergedArray.push(...left)
    }

    return mergedArray
}


export default mergeSort
