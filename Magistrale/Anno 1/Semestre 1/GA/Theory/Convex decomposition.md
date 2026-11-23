---
cssclasses:
  - ga
date: 2026-10-14
---
Bad news: the convex decomposition problem is a very hard problem. Convex decomposition is splitting a concave polygon in convex portions.

We don't have a better way for convex decomposition than the following. Look at this, it's quite curious. 
1. [[Polygon triangulation|Triangulate]]: the triangulation of a polygon is *a* convex decomposition, but it's not the one with the *least* number of convex portions, it's the *greatest* possible number without adding vertices;
2. Remove diagonals: it's quite bizarre, right? Because the first thing you do is perform the decomposition in the most number of convex part;
3. #slide

If we can add new vertices, the best option is to use Steiner points. If you were asked to *perform the triangulation of a hexagon where all the triangles are equal*, you'd need to add a vertex at the center, that's a ==Steiner point==. That also lets you use six triangles rather than four.

## Triangulation

Let's assume we can do it. We [[Polygon triangulation#theorem|proved]] we can do it. We're using the $O(n^2)$ method, because in order to use the more efficient method we need to know about convex decomposition, which is what we've yet to do.

$O(n^2)$. For the time being that's okay.

Find the leftmost vertex, find the ajdacent vertices, if the connecting segment is a diagonal that's fine otherwise pick another one with a certain method, remove our three vertices from the list and recurse.

```JS
function triangulate(shape P) {
	if (P.size() == 0)
		return [];
	v = P.leftmostVertex();
	u = v.next();
	w = v.prev();
	return (v,u,w)::triangulate(P \ v \ u \ w);
}
```

And we proved that any triangulation of this shape is made by the same amount of triangles.
## Ear-cut algorithm

> **==Ear== of a polygon**: a partition of the polygon delimited by three consecutive vertices and the segments connecting them.

That means that two segments are sides, and one is a diagonal.

![[Pasted image 20261014101600.png]]

> **Theorem**:
> Every polygon has at least $\text{two}$ ears.

Finding all triples of consecutive edges is $O(n)$, for each we need to know if the segment is a diagonal which takes $O(n)$, in total it's $O(n^2)$.

In order to get it down to $O(n \log n)$, we need to introduce a new type of polygon: a [[Monotone polygon|monotone polygon]].