---
cssclasses:
  - ga
---
#todo: immagini migliori
## Art gallery guarding

> Imagine that you are asked by an art gallery (a museum).
> Imagine something completely hypothetical, imagine that in a big museum such as Louvre, completely hypothetically, as the Louvre is a *big museum* that's *perfectly guarded*, imagine it's vulnerable to jewelry theft.
> Imagine that you, as a computer scientist, are tasked to design a control system capable of keeping in sight the whole museum with the ==least== number of cameras.
> The cameras are pivoting, as in, they can rotate.
> The museum is approximated as a 2D environment, by imagining all the walls are vertical.
> The rooms are small enough to have the desired detail from any distance within the room.

Nice problem. How much do you want to be paid for this? Anyway, **==*least*==**, that's the most important part. If you have a simple square room, you can put the single camera anywhere and it will work. The problem is from 1973, before the term *computational geometry* was introduced as Michael Ian Shamos's PhD thesis title, and it became a field of computer science. Though even before we knew we could solve geometrical problems with computer science, as with this problem.

As long as the room is convex, we only need one camera. This follows from the definition of *convex*. When we say *in sight* we mean *straight lines*, also known as *segments*. So, we need to find the minimum amount of cameras such that, for all points in the room, we can trace a segment between that point and at least one camera such that it doesn't cross the boundaries.

The camera problem has been proved to be NP-hard, no polynomial solution, that means combinatorial explosion, intractable. So we can't find the *smallest*, we should aim for something *reasonably small*, that being the triangulation. So we can place a camera in each triangle. But actually, we can put a camera on each diagonal, each diagonal controls two triangles. But actually, even then there's overlap, because triangles can have multiple diagonals each. But if we put a camera on a vertex, it covers multiple diagonals at once. But there are more vertices than diagonals. But we don't **have** to put a camera on **every** vertex.

## Efficiency

Our attempts so far:

1. Place cameras in every triangle: $n-2$
2. Place cameras on diagonals: $\text{mess!}$
3. Place cameras on vertices: $\text{which?}$

Now... Let's look at one triangle. Let's color each vertex a different color. Let's look at a triangle that shares two vertices with it, and apply the same logic: two vertices are already colored, so the other one only has one option for a color. Let's apply this to every triangle, and this way we can give that property to every triangle. Now, we've grouped vertices in three groups, each with a different color. We want to make it so that we can solve the camera problem by placing cameras only on one of the tree groups.

1. Three different labels for vertices (colors)
2. Each triangle with vertices of different color

We need to find the dual graph of the shape.

> **==Dual graph==**: Swap nodes and arcs. In our case, nodes for triangles, arcs for adjacency.

So it has $n-2$ nodes and $n-3$ arcs, because diagonals determine adjacency. One less arcs than nodes, but that's a property of trees! But that's not enough to define a tree, we also need to have no loops, or in other words, removing any arc splits the graph in two (every arc is a *breach*). We get that property for free by using diagonals. **The dual graph of our triangulated polygon is a tree.**

We can explore a tree in at least two ways: depth first and breadth first.

![[Pasted image 20261014095221.png]]

We pick our first triangle as the root, and we explore the tree. In DFS, every time we explore a triangle, it's our first time seeing it, so it has one and only one uncolored vertex, and there's only one way left to color it, so we do.

![[Pasted image 20261014095418.png]]

That's the **==*three-coloring*==** of this graph.

Each color has at most $\left\lceil \frac n 3 \right\rceil$ vertices. In this case, $5$, $3$ and $3$.

> **Art gallery theorem**: ==upper bound==
> It is always sufficient and sometimes necessary to place $\left\lceil \frac n 3 \right\rceil$ cameras to control an art gallery with $n$ vertices.

We now have an upper bound.

It's hard to think of a polygon for which it's *necessary* to have exactly $\left\lceil \frac n 3 \right\rceil$ cameras.

![[Pasted image 20261014100106.png]]

Because three vertices define one prong of the comb, and then you need another one at the bottom.

We can settle for an upper bound for the solution, if the optimal solution is too hard to find. Finding a lower bound is too complex. *==Chi si accontenta gode.==*

You cannot triangulate a polygon in $O(n)$. Chezelle's proof and its $O(n+\ldots)$ algorithm is so complex that there is no implementation, it's a beautiful theoretical result but in practice it's almost unusable.

A more practical results gives us a complexity of $O(n \log n)$. There's a big difference with $n^2$.

| $n$ | $n^2$ | $n \log_2 n$ |
| --- | ----- | ------------ |
| 10  | 100   | \~ 32        |
| 1k  | 1M    | \~ 10k       |
| 1M  | 1T    | \~ 20M       |
