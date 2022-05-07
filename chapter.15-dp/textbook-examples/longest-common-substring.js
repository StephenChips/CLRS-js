/**
 * @abstract Implementation of the Longest Common Subsequence
 */

/**
 * 
 * @param {string} str1 the first input string
 * @param {string} str2 the second input string
 * @returns {number} the lcs's length of str1 and str2.
 */
export function lcsLength(str1, str2) {
    // The subproblems can be described as `lcsLength(i, j)`. It means to
    // solve the lcs of two substring: `str1[0:1]` and `str2[0:j]`;

    // The optimal substructure is described at page 223.
    // every sub-problem depends on sub-problems that has smaller index

    // There are M*N subproblems in total, where M and N is the length of
    // str1 and str2 respectivefully.

    // The trivial cases are those either i or j equal to 0.

    const M = str1.length;
    const N = str2.length;

    const subproblems = [];
    for (let i = 0; i <= M; i++) {
        subproblems.push(new Array(N));
    }
    for (let i = 0; i <= M; i++) {
        subproblems[i][0] = 0;
    }
    for (let i = 0; i <= N; i++) {
        subproblems[0][i] = 0;
    }

    for (let i = 1; i <= M; i++) {
        for (let j = 1; j <= N; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                subproblems[i][j] = subproblems[i - 1][j - 1] + 1;
            } else {
                subproblems[i][j] = Math.max(subproblems[i - 1][j], subproblems[i][j - 1]);
            }
        }
    }

    return subproblems[M][N];
}

export function lcsSolution(str1, str2) {
    const M = str1.length;
    const N = str2.length;

    const subproblems = [];
    const choices = [];

    const TOP = Symbol("top");
    const TOP_LEFT = Symbol("top-left");
    const LEFT = Symbol("left");

    for (let i = 0; i <= M; i++) {
        subproblems.push(new Array(N));
        choices.push(new Array(N));
    }
    for (let i = 0; i <= M; i++) {
        subproblems[i][0] = 0;
        choices[i][0] = null;
    }
    for (let i = 0; i <= N; i++) {
        subproblems[0][i] = 0;
        choices[0][i] = null;
    }

    for (let i = 1; i <= M; i++) {
        for (let j = 1; j <= N; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                subproblems[i][j] = subproblems[i - 1][j - 1] + 1;
                choices[i][j] = TOP_LEFT;
            } else if (subproblems[i - 1][j] > subproblems[i][j - 1]) {
                subproblems[i][j] = subproblems[i - 1][j];
                choices[i][j] = TOP;
            } else {
                subproblems[i][j] = subproblems[i][j - 1];
                choices[i][j] = LEFT;
            }
        }
    }

    let i = M, j = N;
    let chArr = [];
    while (choices[i][j]) {
        if (choices[i][j] == TOP_LEFT) {
            chArr.push(str1[i - 1]);
            i--;
            j--;
        } else if (choices[i][j] == LEFT) {
            j--;
        } else {
            i--;
        }
    }

    return chArr.reverse().join("");
}
