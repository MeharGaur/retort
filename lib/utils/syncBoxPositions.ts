import { gsap } from "gsap"
import { RESET_ANIMATION_DURATION } from "../config"
import type { Box } from "../types"
import { calculateBoxPosition, delay } from "."


/** Sync the WebGL box positions to the order of the boxes in the array */
async function syncBoxPositions (boxes: Box[ ]) {
    for (let i = 0; i < boxes.length; i++) {
        // Tween each box to its new position, also reverse index so it appears in ascending order
        gsap.to(boxes[ (boxes.length -  1) - i ].position, {
            z: calculateBoxPosition(i),
            duration: RESET_ANIMATION_DURATION,
            ease: 'power2.inOut'
        })
    }

    await delay(RESET_ANIMATION_DURATION * 1_000)
}


export default syncBoxPositions
