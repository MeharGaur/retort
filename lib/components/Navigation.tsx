import { MutableRefObject, useRef } from "react"

import { mapRange } from 'gsap'


const navItems = [
    { propertyName: 'bubbleSort', displayName: 'Bubble Sort' },
    { propertyName: 'insertionSort', displayName: 'Insertion Sort' },
    { propertyName: 'mergeSort', displayName: 'Merge Sort' },
    { propertyName: 'quickSort', displayName: 'Quick Sort' },
    { propertyName: 'radixSort', displayName: 'Radix Sort' },
    { propertyName: 'selectionSort', displayName: 'Selection Sort' },
]

let listRef: MutableRefObject<HTMLUListElement>

function Navigation () {

    listRef = useRef<HTMLUListElement>()

    return (
        <nav>
            <ul ref={ listRef }>
                {
                    navItems.map(( item, index ) => (
                        // onMouseOver={ handleMouseOver }
                        <li  key={ index }>{ item.displayName }</li>
                    ))
                }
            </ul>
        </nav>
    )
}


function handleMouseOver (e) {
    // clearTimeout(outDelay)
    
    const targetIndex: number = e.currentTarget.getAttribute('data-index')

    const navElements = [
        ...listRef.current.children as HTMLCollectionOf<HTMLLIElement>
    ]

    for (const [ index, li ] of navElements.entries()) {

        if (index == targetIndex) {
            li.style.transform = `scale(1.5)`
        } 
        else {
            const indexDifference = index - targetIndex

            const distanceFromTarget = 
                1.0 - Math.abs(indexDifference) / navItems.length
            
            li.style.transform = `
                scale(${
                    mapRange(0, 1, 0.65, 1, distanceFromTarget)
                }) 
                
                translateY(${
                    32 * indexDifference
                }px)
            `
        }

    }

}



export default Navigation 
