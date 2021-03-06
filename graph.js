class _Node {
    constructor(name) { this.name = name; this.adj = []; }
}

// Graph data structure. Note: uses raw nodes as inputs, not names.
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
                next_todo = new Set([...next_todo, ...next_nodes(n, seen)]);
                yield n;
            }
            todo = next_todo;
            next_todo = new Set();
        }
    }

    shortest_path(start, target) {
        if (start.name === target.name) { return []; }

        function next_nodes(start, seen) { return start.adj.filter(v => !seen.has(v)); }

        let todo = new Set([start]);
        let next_todo = new Set();
        let seen = new Set();
        let paths = {}; paths[start.name] = [start];

        while (todo.size !== 0) {
            for (let node of todo) {
                let next_nodeset = next_nodes(node, seen);
                for (let next_node of next_nodeset) {
                    const path = [...paths[node.name], next_node];
                    if (next_node.name === target.name) {
                        return path;
                    } else {
                        paths[next_node.name] = path;
                        next_todo.add(next_node);
                    }
                }
                seen.add(node);
            }
            todo = next_todo;
            next_todo = new Set();
        }

        throw Error("The target node was not found in the graph.")
    }

    /**
     * Performs a topological sort. The Graph class is undirected, but is implicitly treated as directed by
     * this algorithm. In other words, this topological sort essentially builds a directed minimum spanning tree on
     * the graph.
     * @returns {Array} - A list of nodes in topological prefix order.
     */
    topological_sort() {
        let head = this.nodes[Object.keys(this.nodes)[0]];
        let L = [];
        let perma_marks = new Set();
        let temp_marks = new Set();

        function visit(n) {
            if (!perma_marks.has(n.name)) {
                temp_marks.add(n.name);
                for (let adj of n.adj) {
                    if (!temp_marks.has(adj.name)) {
                        visit(adj);
                    }
                }
                perma_marks.add(n.name);
                L.push(n);
            }
        }

        visit(head);
        return L.reverse();
    }

}

module.exports = {
    GraphADT: GraphADT
};