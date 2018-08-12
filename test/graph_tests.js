const assert = require('assert');
const GraphADT = require('../graph').GraphADT;


describe("GraphADT", () => {

    describe("add_vertex", () => {
        it("should add a vertex", () => {
            let g = new GraphADT();
            g.add_vertex("Foo");
            assert.equal(Object.keys(g.nodes).length, 1);
            assert.equal(g.nodes["Foo"].name , "Foo");
        });
    });

    describe("add_edge", () => {
        it("should add an edge if possible", () => {
            let g = new GraphADT();
            g.add_vertex("Foo");
            g.add_vertex("Bar");
            g.add_edge("Foo", "Bar");
            assert.equal(g.nodes["Foo"].adj[0].name, "Bar");
            assert.equal(g.nodes["Bar"].adj[0].name, "Foo");
        });

        it("should fail if the nodes are undefined", () => {
            let g = new GraphADT();
            assert.throws(() => g.add_edge("Foo", "Bar"), SyntaxError);
        });
    });

    describe("dfs", () => {
        it("should work in the trivial single-vertex case", () => {
            let g = new GraphADT();
            g.add_vertex("Foo");
            let start = g.nodes["Foo"];
            let out = g.dfs(start);
            assert.deepEqual(out, new Set([start]));
        });

        it("should work with a linked list of nodes", () => {
            let g = new GraphADT();
            g.add_vertex("Foo");
            g.add_vertex("Bar");
            g.add_vertex("Baz");
            g.add_edge("Foo", "Bar");
            g.add_edge("Bar", "Baz");
            let out = g.dfs(g.nodes["Foo"]);
            assert.deepEqual(out, new Set([g.nodes["Foo"], g.nodes["Bar"], g.nodes["Baz"]]));
        });

        it("should work with a binary tree of nodes", () => {
            let g = new GraphADT();
            g.add_vertex("Foo");
            g.add_vertex("Bar");
            g.add_vertex("Baz");
            g.add_edge("Foo", "Bar");
            g.add_edge("Foo", "Baz");
            let out = g.dfs(g.nodes["Foo"]);
            assert.deepEqual(out, new Set([g.nodes["Foo"], g.nodes["Bar"], g.nodes["Baz"]]));
        });

        it("should work with cyclic graphs", () => {
            let g = new GraphADT();
            g.add_vertex("Foo");
            g.add_vertex("Bar");
            g.add_vertex("Baz");
            g.add_edge("Foo", "Bar");
            g.add_edge("Bar", "Baz");
            g.add_edge("Baz", "Foo");
            let out = g.dfs(g.nodes["Foo"]);
            assert.deepEqual(out, new Set([g.nodes["Foo"], g.nodes["Bar"], g.nodes["Baz"]]));
        });
    });

    describe("iter_dfs", () => {

        it("should work", () => {
            let g = new GraphADT();
            g.add_vertex("Foo");
            g.add_vertex("Bar");
            g.add_vertex("Baz");
            g.add_edge("Foo", "Bar");
            g.add_edge("Bar", "Baz");

            let iter = g.iter_dfs(g.nodes["Foo"]);
            assert.equal(iter.next().value.name, "Foo");
            assert.equal(iter.next().value.name, "Bar");
            assert.equal(iter.next().value.name, "Baz");
        });

    });

    describe("bfs", () => {
        it("should work in the trivial single-vertex case", () => {
            let g = new GraphADT();
            g.add_vertex("Foo");
            let start = g.nodes["Foo"];
            let out = g.bfs(start);
            assert.deepEqual(out, new Set([start]));
        });

        it("should work with a linked list of nodes", () => {
            let g = new GraphADT();
            g.add_vertex("Foo");
            g.add_vertex("Bar");
            g.add_vertex("Baz");
            g.add_edge("Foo", "Bar");
            g.add_edge("Bar", "Baz");
            let out = g.bfs(g.nodes["Foo"]);
            assert.deepEqual(out, new Set([g.nodes["Foo"], g.nodes["Bar"], g.nodes["Baz"]]));
        });

        it("should work with a binary tree of nodes", () => {
            let g = new GraphADT();
            g.add_vertex("Foo");
            g.add_vertex("Bar");
            g.add_vertex("Baz");
            g.add_edge("Foo", "Bar");
            g.add_edge("Foo", "Baz");
            let out = g.bfs(g.nodes["Foo"]);
            assert.deepEqual(out, new Set([g.nodes["Foo"], g.nodes["Bar"], g.nodes["Baz"]]));
        });

        it("should work with cyclic graphs", () => {
            let g = new GraphADT();
            g.add_vertex("Foo");
            g.add_vertex("Bar");
            g.add_vertex("Baz");
            g.add_edge("Foo", "Bar");
            g.add_edge("Bar", "Baz");
            g.add_edge("Baz", "Foo");
            let out = g.bfs(g.nodes["Foo"]);
            assert.deepEqual(out, new Set([g.nodes["Foo"], g.nodes["Bar"], g.nodes["Baz"]]));
        });
    });

    describe("iter_bfs", () => {

        it("should work", () => {
            let g = new GraphADT();
            g.add_vertex("Foo");
            g.add_vertex("Bar");
            g.add_vertex("Baz");
            g.add_edge("Foo", "Bar");
            g.add_edge("Bar", "Baz");

            let iter = g.iter_bfs(g.nodes["Foo"]);
            assert.equal(iter.next().value.name, "Foo");
            assert.equal(iter.next().value.name, "Bar");
            assert.equal(iter.next().value.name, "Baz");
        });

    });

    describe("shortest_path", () => {
        it("should work for the trivial self-invocation case", () => {
            let g = new GraphADT();
            g.add_vertex("Foo");

            assert.deepEqual(g.shortest_path(g.nodes['Foo'], g.nodes['Foo']), [])
        });

        it("should work for the simple adjacent case", () => {
            let g = new GraphADT();
            g.add_vertex("Foo");
            g.add_vertex("Bar");
            g.add_vertex("Baz");
            g.add_edge("Foo", "Bar");
            g.add_edge("Bar", "Baz");

            assert.deepEqual(g.shortest_path(g.nodes['Foo'], g.nodes['Bar']), [g.nodes['Foo'], g.nodes['Bar']])
        });

        it("should throw if the target node is not contained in the graph", () => {
            let g = new GraphADT();
            g.add_vertex("Foo");
            assert.throws(() => g.shortest_path(g.nodes['Foo'], g.nodes['Baz']), Error)
        });

        it("should work for non-adjacent cases", () => {
            let g = new GraphADT();
            g.add_vertex("Foo");
            g.add_vertex("Bar");
            g.add_vertex("Baz");
            g.add_edge("Foo", "Bar");
            g.add_edge("Bar", "Baz");

            assert.deepEqual(g.shortest_path(g.nodes['Foo'], g.nodes['Baz']),
                [g.nodes['Foo'], g.nodes['Bar'], g.nodes['Baz']])
        });
    });

    describe("topological_sort", () => {
        it("should work for the trivial single-node case", () => {
            let g = new GraphADT();
            g.add_vertex("Foo");
            assert.deepEqual(g.topological_sort(), [g.nodes['Foo']]);
        });

        it("should work with a linked list of nodes", () => {
            let g = new GraphADT();
            g.add_vertex("Foo");
            g.add_vertex("Bar");
            g.add_vertex("Baz");
            g.add_edge("Foo", "Bar");
            g.add_edge("Bar", "Baz");
            assert.deepEqual(g.topological_sort(), [g.nodes['Foo'], g.nodes['Bar'], g.nodes['Baz']]);
        });

        it("should work with a binary tree of nodes", () => {
            let g = new GraphADT();
            g.add_vertex("Foo");
            g.add_vertex("Bar");
            g.add_vertex("Baz");
            g.add_edge("Foo", "Bar");
            g.add_edge("Foo", "Baz");
            assert.deepEqual(g.topological_sort(), [g.nodes["Foo"], g.nodes["Baz"], g.nodes["Bar"]]);
        });

        it("should work with cyclic graphs", () => {
            let g = new GraphADT();
            g.add_vertex("Foo");
            g.add_vertex("Bar");
            g.add_vertex("Baz");
            g.add_edge("Foo", "Bar");
            g.add_edge("Bar", "Baz");
            g.add_edge("Baz", "Foo");
            assert.deepEqual(g.topological_sort(), [g.nodes['Foo'], g.nodes['Bar'], g.nodes['Baz']]);
        });
    });

});