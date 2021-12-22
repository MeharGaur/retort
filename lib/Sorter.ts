import sortingAlgorithms from "./sorting-algorithms"


export default class Sorter {

    constructor (public sortingAlgorithm: SortingAlgorithm) { }

    sort () {
        sortingAlgorithms[ this.sortingAlgorithm ]()
    }

}


type SortingAlgorithm = 'bubbleSort' | 
                        'insertionSort' |
                        'mergeSort' |
                        'quickSort' |
                        'radixSort' |
                        'selectionSort'
