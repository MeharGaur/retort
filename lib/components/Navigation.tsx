import { MutableRefObject, useRef } from "react"
import Link from "next/link"

import { mapRange } from 'gsap'
import { useRouter } from "next/router"


const navItems = [
    { path: '/bubbleSort', propertyName: 'bubbleSort', displayName: 'Bubble Sort' },
    { path: '/insertionSort', propertyName: 'insertionSort', displayName: 'Insertion Sort' },
    { path: '/mergeSort', propertyName: 'mergeSort', displayName: 'Merge Sort' },
    { path: '/quickSort', propertyName: 'quickSort', displayName: 'Quick Sort' },
    { path: '/radixSort', propertyName: 'radixSort', displayName: 'Radix Sort' },
    { path: '/selectionSort', propertyName: 'selectionSort', displayName: 'Selection Sort' },
]

let listRef: MutableRefObject<HTMLUListElement>

function Navigation () {

    const router = useRouter()

    listRef = useRef<HTMLUListElement>()

    return (
        <nav>
            <ul ref={ listRef }>
                {
                    navItems.map(( item, index ) => (
                        <li
                            data-index={ index } 
                            className={ router.pathname == item.path ? 'active' : '' }
                            key={ index }
                        >
                            <Link href={ item.path }>
                                { item.displayName }
                            </Link> 
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}



// **********TODO: implement the rest of nav menu animation
// Also hook up nav selection to the right sorting algorithm
// ^^^ means i need to put <a></a> tags inside the <li></li> like I did with offten
// Should store which algorithm is being used as a URL param, react to url changes?



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
