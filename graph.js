class _Node {
    constructor(name) { this.name = name; this.adj = []; }
}

// Graph.
class GraphADT {
    constructor() { this.nodes = {}; }

    add_vertex(name) { this.nodes[name] = new _Node(name); }
    add_edge(n1, n2) {
        if ((!this.nodes.hasOwnProperty(n1)) || (!this.nodes.hasOwnProperty(n2))) {
            throw SyntaxError("Cannot add edges between non-existent node(s).")
        } else {
            let [n1_n, n2_n] = [this.nodes[n1], this.nodes[n2]];
            n1_n.adj.push(n2_n);
            n2_n.adj.push(n1_n);
        }
    }

    // All-at once depth-first traversal algorithm.
    dfs(start, seen=new Set()) {
        seen.add(start);
        let remaining = start.adj.filter(v => !seen.has(v));
        remaining.forEach(n => {
            let nodes_traversed = this.dfs(n, seen=seen);
            nodes_traversed.forEach(n => seen.add(n));
        });
        return seen;
    }

    // Iterative depth-first traversal algorithm.
    * iter_dfs(start, seen=new Set()) {
        seen.add(start);
        yield start;

        let remaining = start.adj.filter(v => !seen.has(v));
        for (let _next of remaining) { yield* this.iter_dfs(_next, seen=seen); }
    }

    // All-at-once breadth-first search.
    bfs(start) {
        function next_nodes(start, seen) { return start.adj.filter(v => !seen.has(v)); }

        let todo = new Set([start]);
        let next_todo = new Set();
        let seen = new Set();

        while (todo.size !== 0) {
            todo.forEach(n => {
                next_todo = new Set([...next_todo, ...next_nodes(n, seen=seen)]);
                seen.add(n);
            });
            todo = next_todo;
            next_todo = new Set();
        }

        return seen;
    }

    // Iterative breadth-first traversal algorithm.
    * iter_bfs(start) {
        function next_nodes(start, seen) { return start.adj.filter(v => !seen.has(v)); }

        let todo = new Set([start]);
        let next_todo = new Set();
        let seen = new Set();

        while (todo.size !== 0) {
            for (let n of todo) {
                seen.add(n);
                next_todo = new Set([...next_todo, ...next_nodes(n, seen=seen)]);
                yield n;
            }
            todo = next_todo;
            next_todo = new Set();
        }
    }

}

module.exports = {
    GraphADT: GraphADT
};