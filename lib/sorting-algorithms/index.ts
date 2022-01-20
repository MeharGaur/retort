import bubbleSort from "./bubbleSort";
import insertionSort from "./insertionSort";
import mergeSort from "./mergeSort";
import quickSort from "./quickSort";
import radixSort from "./radixSort";
import selectionSort from "./selectionSort";


// *********** TODO:
// Need to reset the boxes when switching to another algorithm in the middle of the current one playing
// ^^^ stop the sorting function so that the onRouteChange 'randomize' boxes logic doesn't get interrupted


export default {
    bubbleSort,
    insertionSort,
    mergeSort,
    quickSort,
    radixSort,
    selectionSort
}