/**
 * Explanation on this question:
 * 
 * Unit-Length interval: interval that has length of 1. e.g. [0, 1], [4, 5]
 * 
 * Greedy Assumption:
 * Sort the numbers ascendingly. and iterate through the array. Add a unit
 * interval to the result once we find a number  that is not in the largest
 * interval.
 *  
 * The proof is from https://sites.math.rutgers.edu/~ajl213/CLRS/Ch16.pdf
 * 
 * Consider the leftmost interval. It will do no good if it extends any further
 * left than the leftmost point, however, we know that it must contain the leftmost
 * point. So, we know that it’s left hand side is exactly the leftmost point. So, we
 * just remove any point that is within a unit distance of the left most point since
 * they are contained in this single interval. Then, we just repeat until all points
 * are covered. Since at each step there is a clearly optimal choice for where to
 * put the leftmost interval, this final solution is optimal.
 * 
 * Personally I think it requires more explanation.
 * 
 */
export function minUnitInterval(numbers) {
    if (numbers.length == 0) return [];

    numbers.sort();

    let result = [
        [numbers[0], numbers[0] + 1]
    ];

    for (const num of numbers) {
        const lastInterval = result[result.length - 1];
        if (num > lastInterval[1]) {
            result.push([num, num + 1])
        }
    }

    return result;
}

