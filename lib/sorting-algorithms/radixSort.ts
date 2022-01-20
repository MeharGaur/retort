import { BOX_MAX_HEIGHT, STEP_DELAY } from "../config"
import { delay, getHeight, staggerBoxes } from "../utils"
import type { Box } from "../types"


async function radixSort (boxes: Box[ ]) {
    const buckets: Box[ ][ ] = [ ]

    for (let i = 0; i < 10; i++) buckets.push([ ])
    
    const totalDigits = BOX_MAX_HEIGHT.toString().length

    // For each digit
    for (let i = 0; i < totalDigits; i++) {
        // For each box, place it into correct bucket
        for (const box of boxes) {
            // Extracting digits can be done mathematically, using strings for simplicity
            const bucketIndex = Number(getHeight(box).toString().slice(-1))

            buckets[bucketIndex].push(box)
        }
        
        boxes = [ ]
        console.log(buckets)

        for (const bucket of buckets) {
            while (bucket.length) {
                boxes.push(bucket[bucket.length - 1])
                bucket.pop()
            }
        }
    }

    console.log(boxes)

    await delay(STEP_DELAY)

    // Make the boxes "dance" on complete
    await staggerBoxes(boxes)
}


export default radixSort
