export function maxRevenue(length, prices) {
    const dp = new Array(length + 1);

    for (let i = 0; i < dp.length; i++) {
        dp[i] = 0;
        for (let j = 1; j < prices.length && j <= i; j++) {
            dp[i] = Math.max(dp[i], dp[i - j] + prices[j]);
        }
    }

    return dp[dp.length - 1];
}

export function rodCuttingSolution(length, prices) {
    const dp = new Array(length + 1);
    const rodLen = new Array(length + 1);

    for (let i = 0; i < dp.length; i++) {
        dp[i] = 0;
        for (let j = 1; j < prices.length && j <= i; j++) {
            let revenue = dp[i - j] + prices[j];
            if (revenue > dp[i]) {
                dp[i] = revenue;
                rodLen[i] = j;
            }
        }
    }

    let solution = [];
    for (let i = dp.length - 1; i > 0; i -= rodLen[i]) {
        solution.push(rodLen[i]);
    }

    return { maxRevenue: dp[dp.length - 1], solution };
}