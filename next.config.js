/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,

    // Needed in order to prerender each sorting algo into an html file
    exportPathMap() {
        return {
            '/': { page: '/[[...sortingAlgorithm]]' },
            '/bubbleSort': { page: '/[[...sortingAlgorithm]]' },
            '/insertionSort': { page: '/[[...sortingAlgorithm]]' },
            '/mergeSort': { page: '/[[...sortingAlgorithm]]' },
            '/quickSort': { page: '/[[...sortingAlgorithm]]' },
            '/radixSort': { page: '/[[...sortingAlgorithm]]' },
            '/selectionSort': { page: '/[[...sortingAlgorithm]]' },
        }
    }
}
