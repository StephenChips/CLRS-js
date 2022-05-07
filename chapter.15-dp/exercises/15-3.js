import { scan } from "ramda";

/**
 * Print a passage neatly.
 * 
 * Time complexity:
 * O(N) for the best situation,
 * O(N^2) for the worst situation.
 * 
 * This is a DP algorithm. It may be possible to rewrite
 * into a greedy algorithm for better performance.
 * 
 * @param {string[]} words words to be printed nealty
 * @param {number} M maximum character limit per line
 * @returns 
 */
export function printNeatly(words, M) {
    if (words.some(word => word.length > M)) return null;

    const numberOfWordsAtLastline = Array(words.length + 1);
    const dp = Array(words.length + 1);
    dp[0] = 0;

    const sumOfWordLengthsFromStart = scan((acc, word) => acc + word.length, 0, words);
    const sumOfWordLengths = (start, len) =>
        sumOfWordLengthsFromStart[start + len] - sumOfWordLengthsFromStart[start]

    for (let n = 1; n < dp.length; n++) {
        dp[n] = Number.POSITIVE_INFINITY
        for (let k = 1; k <= n; k++) {
            const extraSpace = extraSpaceCount(n - k, k);
            if (extraSpace < 0) break;
            const result = extraSpace ** 3 + dp[n - k];
            if (result < dp[n]) {
                numberOfWordsAtLastline[n] = k;
                dp[n] = result;
            }
        }
    }

    const result = [];
    let i = words.length;
    while (i > 0) {
        result.push(words.slice(i - numberOfWordsAtLastline[i], i));
        i -= numberOfWordsAtLastline[i];
    }

    result.reverse();

    return {
        spaceCubeSum: dp[words.length],
        result
    };

    function extraSpaceCount(start, number) {
        let end = start + number - 1;
        const result = M - end + start - sumOfWordLengths(start, number);
        return result >= 0 && end == words.length - 1 ? 0 : result;
    }
}
