import { BOX_MAX_HEIGHT, STEP_DELAY } from "../config"
import { delay, getHeight, staggerBoxes } from "../utils"
import type { Box } from "../types"


async function radixSort (boxes: Box[ ]) {
    const buckets: Box[ ][ ] = [ ]

    for (let i = 0; i < 10; i++) buckets.push([ ])
    
    const maxDigits = BOX_MAX_HEIGHT.toString().length

    // For each digit
    for (let i = 0; i < maxDigits; i++) {
        // For each box, place it into correct bucket
        for (const box of boxes) {
            // Extracting digits can be done mathematically, using strings for simplicity
            let height = getHeight(box).toString()

            // Pad number with zeros if less number of digits than maxDigits
            if (height.length < maxDigits) { 
                const zeroPaddingPrefix = 
                    new Array(maxDigits - height.length).fill('0').join('')
               
                height = zeroPaddingPrefix + height
            }

            const bucketIndex = Number(height[ (height.length - 1) - i ])

            buckets[bucketIndex].push(box)
        }
        
        boxes = [ ]

        // Empty buckets (queues) in first-in-first-out order (keep removing first element)
        for (const bucket of buckets) {
            while (bucket.length) {
                boxes.push(bucket[0])
                bucket.shift()
            }
        }
    }

    // Need to animate the boxes to their new positions.

    await delay(STEP_DELAY)

    // Make the boxes "dance" on complete
    await staggerBoxes(boxes)
}


export default radixSort
