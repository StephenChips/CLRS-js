/**
 * 0-1 knapsack problem
 * 
 * It is interesting that this solution need not to solve 
 * all sub-problem to find out the answer, if you are writing
 * in with Top-Down DP, you will find that Top-Down DP save
 * spaces compare to Bottom-Up DP, because in order to avoid
 * choosing same goods twice, Bottom-Up DP have to remember
 * every sub-problem's chosen goods, while Top-Down DP can
 * simply accomplish it with a stack.
 * 
 * @param {{ weight: number, price: number }[]} goods list of goods that can be chosen
 * @param {number} knapsackSize the maximum weight limit of the knapsack 
 * @returns 
 */
export function zeroOneKnapsack(goods, knapsackSize) {
    const dp = new Array(knapsackSize + 1);
    const choices = new Array(knapsackSize + 1);
    const hasChosenGoods = new Array(goods.length).fill(false);

    dp[0] = 0;

    topDownDP(knapsackSize);

    console.log(dp);
    console.log(choices);

    const loots = [];
    for (let i = knapsackSize; i > 0; i -= choices[i].weight) {
        loots.push(choices[i]);
    }

    return loots;

    function topDownDP(knapsackSize) {
        if (knapsackSize < 0) return 0;
        if (dp[knapsackSize] !== undefined) dp[knapsackSize];

        dp[knapsackSize] = 0;

        for (let i = 0; i < goods.length; i++) {
            if (hasChosenGoods[i]) continue;
            if (knapsackSize < goods[i].weight) continue;

            hasChosenGoods[i] = true;

            const lootValue = topDownDP(knapsackSize - goods[i].weight);
            if (lootValue + goods[i].weight > dp[knapsackSize]) {
                dp[knapsackSize] = lootValue + goods[i].weight;
                choices[knapsackSize] = goods[i];
            }

            hasChosenGoods[i] = false;
        }

        return dp[knapsackSize];
    }
};
