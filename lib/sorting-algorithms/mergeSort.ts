
// ****** TODO: don;t worry about visualizing the recursion
// Do the same thing I did with radix sort,
// just sort it and then tween all cubes to new position
// ^^^ extract that part into a util function cause i'll 
// use it in quick sort as well

import type { Box } from "../types"
import { getHeight } from "../utils"


async function mergeSort (boxes: Box[ ]) {
    const middleIndex = Math.ceil(boxes.length / 2)

    const left = boxes.slice(0, middleIndex)
    const right = boxes.slice(middleIndex)

    return merge(mergeSort(left), mergeSort(right))
}


function merge (left: Box[ ], right: Box[ ]) {
    const mergedArray: Box[ ] = [ ]

    const iterationCount = Math.max(left.length, right.length)

    for (let i = 0; i < iterationCount; i++) {
        if (left[i] && right[i]) {
            mergedArray.push(Math.max(
                getHeight(left[i]), getHeight(right[i])
            ))
        }
    }
}


export default mergeSort
