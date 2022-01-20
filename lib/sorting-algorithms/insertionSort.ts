import { gsap } from "gsap";
import { STEP_DELAY } from "../config"
import type { Box } from "../types";
import { delay, getHeight, staggerBoxes, swapBoxes } from "../utils"
import resetBoxes from "../utils/resetBoxes"


async function insertionSort (boxes: Box[ ]) {
    // Loop through unsorted elements, assume first is sorted
    for (let i = 1; i < boxes.length; i++) {
        const currentBoxHeight = getHeight(boxes[i])
        
        await delay(100)

        await moveBox(boxes[i], '-', currentBoxHeight)

        await delay(100)

        // Insert currentBox at the right position in the sorted section
        for (let j = i - 1; j >= 0; j--) {
            if (getHeight(boxes[j]) > getHeight(boxes[j + 1])) {
                await swapBoxes(boxes, j, j + 1)

                // Reset boxes back to resting color
                await resetBoxes(boxes[j], boxes[j + 1])

                // If j == 0, raise it up now as loop exits right after this
                if (j == 0) {
                    await moveBox(boxes[0], '+', currentBoxHeight)
                }
            }
            else {
                // Insert the current box here and break inner loop
                await moveBox(boxes[j + 1], '+', currentBoxHeight)
                break
            }
        }
    }

    await delay(STEP_DELAY)

    // Make the boxes "dance" on complete
    await staggerBoxes(boxes)
}


function moveBox(box: Box, direction: '+' | '-', amount: number) {
    return gsap.to(box.position, {
        ease: 'power2.out',
        y: `${ direction }=${ amount }`,
        duration: STEP_DELAY / 1000
    })
}


export default insertionSort
