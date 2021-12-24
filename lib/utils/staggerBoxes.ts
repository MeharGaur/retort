import { gsap } from "gsap"
import type { Box } from "../types"
import delay from "./delay"
import getBoxPositions from "./getBoxPositions"


/** Stagger dance animation when finished sorting */
async function staggerBoxes (boxes: Box[ ]) {

    for (const boxPosition of getBoxPositions(boxes)) {
        gsap.timeline()
            .to(boxPosition, {
                y: '+=5',
                ease: 'power2.out',
                duration: 0.4
            })
            .to(boxPosition, {
                y: '-=5',
                ease: 'power1.in',
                duration: 0.3
            })
        
        await delay(20)
    }
}

export default staggerBoxes
