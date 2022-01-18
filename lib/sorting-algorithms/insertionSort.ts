import { STEP_DELAY } from "../config"
import type { Box } from "../types";
import { delay, getHeight, staggerBoxes, swapBoxes } from "../utils"
import resetBoxes from "../utils/resetBoxes"


async function insertionSort (boxes: Box[ ]) {
    // Loop through unsorted elements, assume first is sorted
    for (let i = 1; i < boxes.length; i++) {
        const currentBoxHeight = boxes[i].geometry.parameters.height
        boxes[i].position.y -= currentBoxHeight

        // Insert currentBox at the right position in the sorted section
        for (let j = i - 1; j >= 0; j--) {
            if (getHeight(boxes[j]) > getHeight(boxes[j + 1])) {
                await swapBoxes(boxes, j, j + 1)

                // Reset boxes back to resting color
                await resetBoxes(boxes[j], boxes[j + 1])
            }
            else {
                // Insert the current box here and break inner loop
                boxes[j + 1].position.y += currentBoxHeight
                await delay(100)
                break
            }
        }
    }

    await delay(STEP_DELAY)

    // Make the boxes "dance" on complete
    await staggerBoxes(boxes)
}


export default insertionSort
