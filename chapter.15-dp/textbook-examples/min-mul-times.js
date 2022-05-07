/**
 * 
 * @param {{ row: number, col: number }[]} matrixSizes 
 */
export function minimumMultiplicationTimes(matrixSizes) {    
    const L = matrixSizes.length;

    /** @type number[] */
    let dp = [];
    
    for (let i = 0; i < L; i++) {
        dp.push(new Array(L - i));
        dp[i][L - i - 1] = 0; 
    }

    for (let i = L - 2; i >= 0; i--) {
        for (let j = L - i - 2; j >= 0; j--) { // An example of inversion
            dp[i][j] = Number.POSITIVE_INFINITY;

            for (let k = L - i - 1; k > j; k--) {
                const mulTimes =
                    dp[i][k] +
                    dp[L - k][j] +
                    matrixSizes[i].row * matrixSizes[L - j - 1].col * matrixSizes[L - k - 1].col;

                dp[i][j] = Math.min(dp[i][j], mulTimes);
            }
        }
    }

    return dp[0][0];
}
