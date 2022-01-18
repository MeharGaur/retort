import { STEP_DELAY } from "../config";
import { delay, getHeight, staggerBoxes, swapBoxes } from "../utils";
import type { Box } from "../types";
import resetBoxes from "../utils/resetBoxes";


async function selectionSort (boxes: Box[ ]) {
    for (let i = 0; i < boxes.length; i++) {
        let minimumIndex = i

        for (let j = i; j < boxes.length; j++) {
            if (getHeight(boxes[j]) < getHeight(boxes[minimumIndex])) {
                minimumIndex = j
            }
        }

        // Only swap if they are not the same box
        if (minimumIndex != i) {
            // Swap minimum with first unsorted position. "Move" to the front
            swapBoxes(boxes, i, minimumIndex)
        }

        // Reset boxes back to resting color
        await resetBoxes(boxes[i], boxes[minimumIndex])
    }

    await delay(STEP_DELAY)

    // Make the boxes "dance" on complete
    staggerBoxes(boxes)
}


export default selectionSort
