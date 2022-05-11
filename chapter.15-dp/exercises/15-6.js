/**
 * 15-6 Planning a comany party
 * 
 * Emmm. Cannot work out the brute-force's time complexity.
 * 
 * The DP version will be O(N) where N is the number of stuffs in the company.
 * The space complexity is easy to compute: O(N), precisely, 2N.
 * 
 * @typedef {Object} Hierarchy
 * @property {string} Hierarchy.name 
 * @property {number} Hierarchy.score
 * @property {Hierarchy[] | undefined} Hierarchy.subordinates
 * 
 * @param {Hierarchy} hierarchy 
 * @returns {{maxConviviality: number, participants: Set<`${string}#${number}`>}}
 */
export function bestGuests(hierarchy) {
    /** @type {Map<[number, number]>} */
    const dp = new Map();
    /** @type {Map<[boolean, boolean]>} */
    const choices = new Map();

    const maxConviviality = bestGuestsDP(hierarchy, false);
    const participants = getParticipants();

    return { maxConviviality, participants };

    /**
     * @param {Hierarchy} stuff a node in the hierarchy tree
     * @param {boolean} willSupervisorJoin will the supervisor of the stuff (parent) join the party?
     * @returns {number} the maximum conviviality sum
     */
    function bestGuestsDP(stuff, willSupervisorJoin) {
        let dpArr = dp.get(stuff);
        if (!dpArr) {
            dpArr = [null, null];
            dp.set(stuff, dpArr);
        }
        let choicesArr = choices.get(stuff);
        if (!choicesArr) {
            choicesArr = [false, false];
            choices.set(stuff, choicesArr);
        }

        const index = Number(willSupervisorJoin);
        if (dpArr[index] !== null) return dpArr[index];

        if (stuff.subordinates) {
            if (willSupervisorJoin) {
                dpArr[index] = stuff.subordinates.reduce((acc, sub) => acc + bestGuestsDP(sub, false), 0);
            } else {
                const willJoin = stuff.subordinates.reduce((acc, sub) => acc + bestGuestsDP(sub, true), stuff.score);
                const willNotJoin = stuff.subordinates.reduce((acc, sub) => acc + bestGuestsDP(sub, false), 0);

                dpArr[index] = Math.max(willJoin, willNotJoin);
                if (dpArr[index] === willJoin) {
                    choicesArr[index] = true;
                }
            }
        } else {
            if (willSupervisorJoin) {
                dpArr[index] = 0;
            } else {
                dpArr[index] = stuff.score;
                choicesArr[index] = true;
            }
        }

        return dpArr[index];
    }

    function getParticipants() {
        /** @type {Hierarchy} */
        const participants = new Set();
        
        searchHierarchy(hierarchy, false);

        return participants;

        /**
         * 
         * @param {Hierarchy} stuff 
         * @param {boolean} willSupervisorJoin 
         */
        function searchHierarchy(stuff, willSupervisorJoin) {
            const willJoin = choices.get(stuff)[Number(willSupervisorJoin)];
            if (willJoin) participants.add(`${stuff.name}#${stuff.score}`);

            if (stuff.subordinates) {
                for (let sub of stuff.subordinates) {
                    searchHierarchy(sub, willJoin);
                }
            }
        }
    }
}
