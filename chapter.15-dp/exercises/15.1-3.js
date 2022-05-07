/**
 * 
 * @param {number} length rod length
 * @param {number[]} prices Each length's rod's prices
 * @param {number} cost cost of a cut
 */
export function rodCuttingWithCost(length, prices, cost) {
    const dp = new Array(length + 1);

    let i, j;

    for (i = 1; i <= length; i++) {
        dp[i] = Number.NEGATIVE_INFINITY;
        
        for (j = 1; j < prices.length && j < i; j++) {
            dp[i] = Math.max(dp[i], dp[i - j] + prices[j] - cost);
        }

        if (j < prices.length && j === i) {
            dp[i] = Math.max(dp[i], prices[j]);
        }
    }

    return dp[length];
}
