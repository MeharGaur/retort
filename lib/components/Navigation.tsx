import { MutableRefObject, useEffect, useRef } from "react"
import Link from "next/link"

import { useRouter } from "next/router"
import { mapRange } from "../utils"


const navItems = [
    { path: '/bubbleSort', propertyName: 'bubbleSort', displayName: 'Bubble Sort' },
    { path: '/insertionSort', propertyName: 'insertionSort', displayName: 'Insertion Sort' },
    { path: '/mergeSort', propertyName: 'mergeSort', displayName: 'Merge Sort' },
    { path: '/quickSort', propertyName: 'quickSort', displayName: 'Quick Sort' },
    { path: '/radixSort', propertyName: 'radixSort', displayName: 'Radix Sort' },
    { path: '/selectionSort', propertyName: 'selectionSort', displayName: 'Selection Sort' },
]

let outAnimationDelay = 0

let listRef: MutableRefObject<HTMLUListElement>

let liElements: HTMLLIElement[ ]


function Navigation () {
    const router = useRouter()

    listRef = useRef<HTMLUListElement>()

    // onMount
    useEffect(function onMount () {
        liElements = [
            ...listRef.current.children as HTMLCollectionOf<HTMLLIElement>
        ]

        for (const li of liElements) {
            li.addEventListener('mouseover', handleMouseOver)
            li.addEventListener('mouseout', handleMouseOut)
        }

        listRef.current.addEventListener('mouseout', handleMouseOut)
    }, [ ])

    return (
        <nav>
            <ul ref={ listRef }>
                {
                    navItems.map(( item, index ) => (
                        <li
                            data-index={ index }
                            key={ index }
                        >
                            <Link href={ item.path }>
                                <a draggable="false" className={ router.asPath == item.path ? 'active' : '' }>
                                    { item.displayName }
                                </a>
                            </Link> 
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}


function handleMouseOver (e) {
    // Clear any previous out animation delay.
    // Needed for if a user puts their mouse on the list, moves it off, then 
    // moves it back on before the delay is over. Need to clear in this case.
    clearTimeout(outAnimationDelay)
    
    const targetIndex: number = Number(
        e.currentTarget.getAttribute('data-index')
    )

    for (const [ index, li ] of liElements.entries()) {
        if (index == targetIndex) {
            li.style.transform = `scale(1.5)`
        } 

        else {
            const indexDifference = index - targetIndex

            // Distance from target going from 0 - 1
            const distanceFromTarget = 
                1.0 - (Math.abs(indexDifference) / navItems.length)
            
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

function handleMouseOut(e) {
    if (!e.currentTarget.parentElement.matches(':hover')) {
        outAnimationDelay = Number( setTimeout(collapseAllItems, 100) )
    }
}

function collapseAllItems() {
    for (const li of liElements) {
        li.style.transform = `scale(1.0) translateY(0px)`
    }
}


export default Navigation 
