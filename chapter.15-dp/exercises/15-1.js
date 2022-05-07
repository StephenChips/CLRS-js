/**
 * A DAG's shortest path (with DP, not Dijisktra)
 */

/**
 * 
 * @param {{ weight: number, to: number }[]} graph 
 */
export function shortestPathDP(graph, from, to) {
    let order = reversedPostDFS(graph, from);

    let dp = new Array(graph.length);
    let nextVertex = new Array(graph.length);

    dp[to] = 0;

    const index = order.findIndex((val) => val == to);

    if (index === -1) return {
        path: [],
        weight: Number.POSITIVE_INFINITY
    };

    for (let i = index + 1; i < order.length; i++) {
        let vertex = order[i];
        
        dp[vertex] = Number.POSITIVE_INFINITY;
        
        for (let edge of graph[vertex]) {
            if (dp[vertex] > dp[edge.to] + edge.weight) {
                dp[vertex] = dp[edge.to] + edge.weight;
                nextVertex[vertex] = edge.to;
            }
        }

        if (vertex == from) break;
    }

    const path = makePath(from, to);

    return {
        path,
        weight: dp[from]
    };

    function makePath(from, to) {
        const path = [];
        let current = from;
        do {
            path.push(current);
            current = nextVertex[current];
        } while (current !== to);

        path.push(to);

        return path;
    }
}

/**
 * 
 * @param {{ weight: number, to: number }[][]} graph 
 * @param {number} from 
 * @returns {number[]}
 */
export function reversedPostDFS(graph, from) {
    const result = [];
    const visited = new Array(graph.length).fill(false);

    helper(from);

    return result;

    function helper(vertex) {
        for (let edge of graph[vertex]) {
            if (visited[edge.to]) continue;
            helper(edge.to);
        }
        result.push(vertex);
        visited[vertex] = true;
    }
}
