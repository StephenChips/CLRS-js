import { describe, it, expect } from "@jest/globals";
import { lcsLength, lcsSolution } from "../longest-common-substring";

describe("lcsLength: get the length of a longest common sequence", () => {
    it("should pass", () => {
        expect(lcsLength("", "")).toBe(0);
        expect(lcsLength("ACBD", "ABB")).toBe(2);
    });
});

describe("lcsSolution: get the longest common sequence itself.", () => {
    expect(lcsSolution("", "")).toBe("");
    expect(lcsSolution("ACBD", "ABB")).toBe("AB");
    expect(lcsSolution("ABCD", "EFGH")).toBe("");
    expect(lcsSolution("ABCD", "")).toBe("");
    expect(lcsSolution("", "ABCD")).toBe("");
    expect(lcsSolution("ACCGGTCGAGTGCGCGGAAGCCGGCCGAA", "GTCGTTCGGAATGCCGTTGCTCTGTAAA")).toBe("GTCGTCGGAAGCCGGCCGAA");
})
