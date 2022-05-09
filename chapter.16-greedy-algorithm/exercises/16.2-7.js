/**
 * 
 */

/**
 * 
 * @param {BigInt[]} arr1 the 1st array
 * @param {BigInt[]} arr2 the 2nd array
 * @returns {BigInt}
 */
export function twoArrayMaxProduct(arr1, arr2) {
    arr1.sort();
    arr2.sort();

    let product = 1n;

    for (let i = 0; i < arr1.length; i++) {
        product *= arr1[i] ** arr2[i];
    }

    return product;
}
