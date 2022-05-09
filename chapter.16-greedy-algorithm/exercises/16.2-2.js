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
 * @param {number} knapsackCapacity the maximum weight limit of the knapsack 
 * @returns 
 */
export function zeroOneKnapsack(goods, knapsackCapacity) {
    const dp = new Array(knapsackCapacity + 1);
    const choices = new Array(knapsackCapacity + 1);
    const hasChosenGoods = new Array(goods.length).fill(false);

    dp[0] = 0;

    topDownDP(knapsackCapacity);
    
    return getSolution();

    function topDownDP(knapsackCapacity) {
        if (knapsackCapacity < 0) return 0;
        if (dp[knapsackCapacity] !== undefined) dp[knapsackCapacity];

        dp[knapsackCapacity] = 0;

        for (let i = 0; i < goods.length; i++) {
            if (hasChosenGoods[i]) continue;
            if (knapsackCapacity < goods[i].weight) continue;

            hasChosenGoods[i] = true;

            const lootValue = topDownDP(knapsackCapacity - goods[i].weight);
            if (lootValue + goods[i].price > dp[knapsackCapacity]) {
                dp[knapsackCapacity] = lootValue + goods[i].price;
                choices[knapsackCapacity] = goods[i];
            }

            hasChosenGoods[i] = false;
        }

        return dp[knapsackCapacity];
    }

    function getSolution() {
        const loots = [];

        let i = knapsackCapacity;

        while (i > 0 && choices[i] !== undefined) {
            loots.push(choices[i]);
            i -=  choices[i].weight;
        }

        return loots;
    }
};
