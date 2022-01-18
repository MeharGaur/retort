import { STEP_DELAY } from "../config"
import { getHeight, delay, staggerBoxes, swapBoxes, delayBoxes } from "../utils"
import type { Box } from "../types"


async function bubbleSort (boxes: Box[ ]) {
    let didSwap = false

    do {
        didSwap = false

        for (let i = 0; i < (boxes.length - 1); i++) {
            const leftBox = boxes[ i ]
            const rightBox = boxes[ i + 1 ]

            // Swap if left is larger than right, as it should be the other way around
            if (getHeight(leftBox) > getHeight(rightBox)) {
                swapBoxes(boxes, i, i + 1)

                didSwap = true

                // Reset boxes back to resting color
                await delayBoxes(leftBox, rightBox)
            }
        }
    } while (didSwap)

    await delay(STEP_DELAY)

    // Make the boxes "dance" on complete
    staggerBoxes(boxes)
}


export default bubbleSort
