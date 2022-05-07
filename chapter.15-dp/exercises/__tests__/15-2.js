import { expect, describe, it } from "@jest/globals";
import { longestPalindrome } from "../15-2.js";

describe("longestPalindromeSubstring", () => {
    it("valid cases", () => {
        expect(longestPalindrome("character")).toBe("carac");
    });
});
