/**
 * # Greedy Assumption
 * The solution must include the most valuable item, which according to
 * the question, it is the lightest.
 * 
 * Proof (by contradiction):
 * 
 * Hypothetically, if the solution doesn't has the most valuable item,
 * we can replace any items in the knapsack with it, and we will have a
 * solution with higher total value, and since this item is lighest
 * among all goods, replacing it will only make the knapsack lighter,
 * so the knapsack will never be overloaded, this garenteet that it is
 * surely a valid solution. Since we have found a better solution than
 * the optimal solution, we found a contradition, hence the hypothesis
 * is false, and the greedy assumption holds.
 * 
 * # Time and space complexity
 * 
 * If the input array has been sorted:
 *   time complexity: O(n)
 *   space complexity: O(1)
 * 
 * Otherwise:
 *   time complexity: O(n*log(n))
 *   space complexity: O(1) or O(n) (if you cannot change the input array)
 */

/**
 * 
 * @param {{ weight: number, price: number }[]} items list of available items
 * @param {number} capacity the capacity of the knapsack
 */
export function zeroOneKnapsack(items, capacity) {
    const indice = [...range(0, items.length - 1)];

    indice.sort((a, b) => items[a].weight - items[b].weight);

    const result = [];
    let totalWeight = 0;

    for (let i = 0; i < indice.length; i++) {
        totalWeight += items[indice[i]].weight;
        if (totalWeight > capacity) break;
        result.push(items[indice[i]]);
    }

    return result;
}

function *range(from, to, step = 1) {
    for (let i = from; i <= to; i += step) {
        yield i;
    }
}
