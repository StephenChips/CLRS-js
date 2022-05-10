/**
 * 15-5 Edit Distance
 * 
 * # Time complexity
 * 
 * O(MN) where M and N is two input strings' length.
 * 
 * Explanation: there are `MN` subproblems in total, for two cursors
 * `i` and `j` can be at any position as long as not out of range.
 * For every subproblems, it depends on at most five other subproblems,
 * so the correspondent subproblem graphs will has at most `5MN` edges,
 * which will take at most `5MN` steps complete treversing it, therefore
 * lead us to O(MN) complexity.
 * 
 * # Space Complexity
 * 
 * It uses a 2D table to record each subproblems, so the space complexity
 * is O(MN).
 * 
 * It is quite space consuming, can we do better?
 * 
 */

// The default configuration of costs.
const COST = Object.freeze({
    KILL: 1,
    REPLACE: 1,
    DELETE: 1,
    COPY: 1,
    TWIDDLE: 1,
    INSERT: 1
});

/**
 * 
 * @param {string} s the first string
 * @param {string} t the 2nd string
 */
export function computeEditDistance(s, t, costs = COST) {
    const dp = [];
    const choices = [];

    for (let i = 0; i <= s.length; i++) {
        dp.push(Array(t.length + 1));
        choices.push(Array(t.length + 1));
    }

    const editDistance = getDistance(s, t, 0, 0);

    const editSequence = getEditSequence();

    return { editDistance, editSequence };

    /**
     * 
     * @param {string} s the first string
     * @param {string} t the second string
     * @param {number} i `s`'s cursor position
     * @param {number} j `t`'s cursor position
     */
    function getDistance(s, t, i, j) {
        if (i == s.length) {
            return costs.INSERT * (t.length - j);
        }
        if (j == t.length) {
            return Math.min(costs.KILL, costs.DELETE * (s.length - i));
        }

        if (dp[i][j] !== undefined) {
            return dp[i][j];
        }

        let insert, del, copy, twiddle, replace;
        insert = del = copy = twiddle = Number.POSITIVE_INFINITY;

        if (i < s.length - 1 && j < t.length - 1) {
            if (s[i + 1] == t[j] && s[i] == t[j + 1]) {
                twiddle = costs.TWIDDLE + getDistance(s, t, i + 2, j + 2);
            }
        }

        if (s[i] == t[j]) {
            copy = costs.COPY + getDistance(s, t, i + 1, j + 1);
        }

        replace = costs.REPLACE + getDistance(s, t, i + 1, j + 1);
        del = costs.DELETE + getDistance(s, t, i + 1, j);
        insert = costs.INSERT + getDistance(s, t, i, j + 1);

        dp[i][j] = Math.min(insert, del, copy, twiddle, replace);

        switch (dp[i][j]) {
            case insert:
                choices[i][j] = "insert";
                break;
            case del:
                choices[i][j] = "del";
                break;
            case copy:
                choices[i][j] = "copy";
                break;
            case twiddle:
                choices[i][j] = "twiddle";
                break;
            case replace:
                choices[i][j] = "replace"
                break;
        }

        return dp[i][j];
    }

    function getEditSequence() {
        let i = 0;
        let j = 0;

        const sequence = [];
        while (i < s.length && j < t.length) {
            switch (choices[i][j]) {
                case "twiddle":
                    sequence.push(`twiddle ${s[i]} and ${s[i + 1]}`);
                    i += 2;
                    j += 2;
                    break;
                case "copy":
                    sequence.push(`copy ${s[i]}`);
                    ++i;
                    ++j;
                    break;
                case "replace":
                    sequence.push(`replace ${s[i]} with ${t[j]}`);
                    ++i;
                    ++j;
                    break;
                case "insert":
                    sequence.push(`insert ${t[j]}`)
                    ++j;
                    break;
                case "del":
                    sequence.push(`delete ${s[i]}`);
                    ++i;
                    break;
            }
        }

        if (j < t.length) {
            for (; j < t.length; j++) {
                sequence.push(`insert ${t[j]}`);
            }
        } else if (i < s.length) {
            if (costs.KILL < costs.DELETE * (s.length - i)) {
                sequence.push("kill");
            } else {
                for (; i < s.length; i++) {
                    sequence.push(`delete ${s[i]}`);
                }
            }
        }

        return sequence;
    }
}
