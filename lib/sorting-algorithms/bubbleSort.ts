import { RESTING_COLOR, STEP_DELAY } from "../config"
import { getHeight, delay, staggerBoxes, swapBoxes } from "../utils"
import type { Box } from "../types"


// *********
// TODO: Need to extract out as much functionality as I can
// so I can reuse the same animation code for all algos


async function bubbleSort (boxes: Box[ ]) {
    let didSwap = false

    do {
        didSwap = false

        let didSwapInternal = false

        for (let i = 0; i < (boxes.length - 1); i++) {
            didSwapInternal = false

            const leftBox = boxes[ i ]
            const rightBox = boxes[ i + 1 ]

            // Swap if left is larger than right, should be other way around
            if (getHeight(leftBox) > getHeight(rightBox)) {
                swapBoxes(boxes, i, leftBox, rightBox)

                didSwap = true
                didSwapInternal = true
            }

            if (didSwapInternal) {
                // Only delay if there was a swap
                await delay(STEP_DELAY + 100)

                // Reset swapped boxes back to the resting color
                leftBox.material.color.setHex(RESTING_COLOR)
                rightBox.material.color.setHex(RESTING_COLOR)

                // Delay before the next swap
                await delay(STEP_DELAY / 1.5)
            }
        }
    } 
    while (didSwap)

    await delay(STEP_DELAY)

    staggerBoxes(boxes)
}


export default bubbleSort
