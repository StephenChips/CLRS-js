export function longestPalindrome(str) {
    const dp = [];

    for (let i = 0; i < str.length; i++) {
        dp.push(new Array(str.length));
    }

    for (let i = 0; i < dp.length; i++) {
        dp[i][i] = 1;
    }

    for (let i = 0; i < dp.length - 1; i++) {
        dp[i][i + 1] = 0;
    }

    for (let i = str.length - 2; i >= 0; i--) {
        for (let j = i + 1; j <= str.length; j++) {
            if (str[i] === str[j]) {
                dp[i][j] = dp[i + 1][j - 1] + 2;
            } else if (dp[i + 1][j] > dp[i][j - 1]) {
                dp[i][j] = dp[i + 1][j];
            } else {
                dp[i][j] = dp[i][j - 1];
            }
        }
    }

    return getSolution(str, dp, 0, str.length - 1);
}

function getSolution(str, dp, i, j) {
    let padindrome = "";

    while (dp[i][j] >= 2) {
        if (dp[i][j] == dp[i + 1][j - 1] + 2) {
            padindrome += str[i];
            i++;
            j--;
        } else if (dp[i][j] == dp[i + 1][j]) {
            i++;
        } else {
            j--;
        }        
    }

    const reversed = [...padindrome].reverse().join("");

    if (dp[i][j] === 1) {
        return padindrome + str[i] + reversed;
    } else {
        return padindrome + reversed;
    }
}