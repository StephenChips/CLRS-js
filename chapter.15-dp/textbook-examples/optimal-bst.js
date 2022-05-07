/**
 * @abstract
 * The solution of Optimal Binary Search Tree
 * 
 * P226
 * 
 * Given a list of words and pseudo-words with their frequencies, construct the
 * optimal binary search tree, such that it minimum expectation of searching cost.
 * 
 * A pseudo-word is a hypothetical word stands for words do not in the word list,
 * whose alphabetical order is between two adjacency words in the sorted word list.
 */

export class TreeNode {
    constructor(index, left, right) {
        this.index = index;
        this.left = left;
        this.right = right;
    }
}

export function word(index, left = null, right = null) {
    return new TreeNode(index, left, right);
}

export function createOBST(words, pseudoWords) {
    const { roots, cost } = computeOBSTWithDP(words, pseudoWords);

    return {
        cost,
        obst: createTree(roots, 0, words.length - 1),
    };

    function createTree(roots, i, j) {
        if (i > j) {
            return null;
        } else {
            const root = roots[i][words.length - j - 1];
            return word(
                root,
                createTree(roots, i, root - 1),
                createTree(roots, root + 1, j)
            );
        }
    }
}


function computeOBSTWithDP(words, pseudoWords) {
    const subproblems = [];
    const possibility = []; // store all sums of possibility from i to j.
    const roots = [];

    for (let i = 0; i < words.length + 1; i++) {
        subproblems.push(new Array(words.length - i + 1));
        possibility.push(new Array(words.length - i + 1));

        subproblems[subproblems.length - 1].fill(null);
        possibility[possibility.length - 1].fill(null);
    }

    for (let i = 0; i < words.length; i++) {
        roots.push(new Array(words.length - i));
    }

    for (let i = words.length; i >= 0; i--) {
        subproblems[i][words.length - i] = pseudoWords[i];
        possibility[i][words.length - i] = pseudoWords[i];
    }

    // The subproblem table we are using, is the horizontal flipped version
    // of the original one.

    // Personally I don't suggest you to write this version in an inverview,
    // It's more difficulty and error-prone.

    for (let i = words.length - 1; i >= 0; i--) {
        for (let j = words.length - i - 1; j >= 0; j--) {
            subproblems[i][j] = Number.POSITIVE_INFINITY;

            possibility[i][j] = possibility[i + 1][j] + words[i] + pseudoWords[i];

            for (let k = i; k < words.length - j; k++) {
                const cost = subproblems[i][words.length - k] + subproblems[k + 1][j] + possibility[i][j];
                if (cost < subproblems[i][j]) {
                    subproblems[i][j] = cost;
                    roots[i][j] = k;
                }
            }
        }
    }

    return {
        roots,
        cost: subproblems[0][0]
    };
}

/**
 * A brute-force version of finding the OBST (optimal binary search tree).
 * The time complexity is O(2**n / n**(3/2))
 * @param {number[]} words list of possibilities of known words
 * @param {number[]} pseudoWords list of possibilities of unknown-words
 * @returns 
 */
export function obstCostBruteForce(words, pseudoWords) {
    return obstBF(words, pseudoWords, 0, words.length - 1);

    function obstBF(words, pseudoWords, i, j) {
        if (i > j) {
            return pseudoWords[i];
        } else {
            let min = Number.POSITIVE_INFINITY;
            for (let k = i; k <= j; k++) {
                let cost =
                    obstBF(words, pseudoWords, i, k - 1) +
                    obstBF(words, pseudoWords, k + 1, j) +
                    sum(words, i, j) +
                    sum(pseudoWords, i, j + 1);
                min = Math.min(min, cost);
            }

            return min;
        }
    } 

    function sum(arr, from, to) {
        let res = 0;
        for (let i = from; i <= to; i++) {
            res += arr[i];
        }
        return res;
    }
}
