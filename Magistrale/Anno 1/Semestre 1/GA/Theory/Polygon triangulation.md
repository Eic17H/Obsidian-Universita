---
cssclasses:
  - ga
date: 2026-10-13
---
Polygon triangulation can be thought of as an algorithm of the class ==*divide and conquer*==: you take a problem, you split your problem in smaller parts that are easier to be solved, then, once you have the easiest possible solution to your problem, you collect the solutions to all your small problems into one big solution. Merge sort is one example.

Now, *why* do we care about polygon triangulation? Let's ease into it by looking at another problem, *[[Tricoloring|art gallery guarding]]*.

## Triangulating

Here's a nice property:

> **Every triangle is convex**

Why can't there be a concave triangle? Because the sum of the angles of a triangle is $180°$, but a concave polygon needs at least one angle $>180°$, so the simplest concave polygon is a quadrilateral such as this one:

#todo: image

![[Pasted image 20261013113310.png]]

That means that if we divide a polygon into triangles, we can split it into convex portions. So that's our problem:

1. Split (*[[Partitioning|partition]]*) the polygon into ==convex== portions;
2. Control each portion with a camera.

Let's partition a polygon. Let's pick a point inside it and create segments from it to the boundary of the polygon.

#todo: image

![[Pasted image 20261013114104.png]]

All partitions are convex in this case, but it could've been a coincidence, the procedure was random.

Let's do the same, but only using ==diagonals==:

> **Diagonal**: segment connecting two vertices of a polygon, such that all points or the segment are inside the polygon, and the segment is not an edge of the polygon.

In a convex polygon, all segments connecting two vertices other than edges are diagonals. By using diagonals, you can be sure you aren't introducing new vertices.

#todo: image

![[Pasted image 20261013114400.png]]

This concave shape only has one diagonal. A segment connecting the bottom two vertices would be outside the polygon. So there's only one way to partition this polygon with diagonals.

By doing this, I split up the polygon into two convex polygons. I **triangulated** it.

In **triangulation**, I keep drawing diagonals **that don't cross existing diagonals** until I can't anymore.

#todo: image

![[Pasted image 20261013115157.png]]


## Properties of triangulation
### Alternatives

We can't add any more diagonals. But we could've done it another way. The number of possible triangulations is the Catalan number of the amount of vertices, which is in $O(n!)$.

This polygon has $13$ vertices, this triangulation has $11$ triangles and $10$ diagonals.

Let's focus on one part of the triangulation and change one diagonal for another.

#todo: image

![[Pasted image 20261013115306.png]]

Still $11$ triangles and $10$ diagonals. Of course, I swapped a diagonal for another, and each quadrilateral can be split into two triangles only so I swapped two triangles for two different triangles.

### Invariant

Let's look at the concave shape from earlier, $4$ vertices, $2$ triangles and $1$ diagonal.

> Conjecture: if a polygon has $n$ vertices, its triangulation has $n-2$ triangles and $n-3$ diagonals.

Let's look at a hexagon.

#todo: image

![[Pasted image 20261013115630.png]]


Well, for each vertex, I can form a diagonal with all the vertices that are neither the same ($1$) or adjacent ($2$), that being, $n-3$. I can form triangles with two diagonals and an edge, or two edges and a diagonal when one of the edges is adjacent to the vertex I'm considering (the ajdacent edges count as diagonals), so one for each edge that's not adjacent to the vertex, $n-2$.

What about with concave polygons? Is it the same rule? The proof is a proof by induction, but it's really hard to come up with.

> **Simple polygon**: a polygon with no holes and with no edges crossing over each other (the polygon is not self-crossing).

#### Theorem

> **Theorem**: Every simple polygon $P$ with $n$ vertices can be triangulated in $n-2$ triangles.

Proof by induction:

* Base: a polygon with $n=3$ vertices (a triangle);
* Induction: if a polygon with $p<m$ vertices is triangulatable with $p-2$ triangles, then a polygon with $m$ vertices is triangulatable with $m-2$ triangles.

We know that a triangle can be triangulated in $n-2=1$ triangle with $n-3=0$ diagonals (all possible vertex pairs already form edges).

To prove the induction step, let's work backwards, starting from a large $m$.
1. From a polygon $P$, pick the vertex $V$ with smallest $x$ ($O(n)$);
2. Find its neighbors $u$ and $w$ ($O(1)$ if we have an ordered array of vertices);
3. Check if $uw$ is a diagonal ($O(n)$) to find out:
4. If yes:
	1. If yes, I have split the polygon into a triangle and a polygon with $m-1$ vertices, triangulatable with $m-1-2$ triangles;
	2. The full polygon can be triangulated with those triangles, plus the other one we just found, in total $m-1-2+1=m-2$ triangles, QED.
5. If not:
	1. There's at least one vertex inside the triangle $uvw$, find the one closest to $v$ and call it $v'$;
	2. **==🟢Fantastic geometric trick:==**
		1. Draw a line parallel to $uw$ passing through $v'$;
		2. $uv$, $vw$ and that line bind a triangle that contains no vertex;
		3. $vv'$ is a diagonal that splits $P$ into two smaller polygons $P_1$ and $P_2$ with $m_1<m$ and $m_2<m$ vertices, triangulatable with, by assumption, $m_1-2$ and $m_2-2$ triangles, so the whole polygon can be split in $m_1+m_2-4$ triangles;
		4. $m_1+m_2$ is $m+2$ because the two vertices $v$ and $v'$ are in common and thus are double counted;
	3. $P$ can be triangulated in $m+2-4=m-2$ triangles, QED.

The camera problem has been proved to be NP-hard, no polynomial solution, that means combinatorial explosion, intractable. So we can't find the *smallest*, we should aim for something *reasonably small*, that being the triangulation. So we can place a camera in each triangle. But actually, we can put a camera on each diagonal, each diagonal controls two triangles. But actually, even then there's overlap, because triangles can have multiple diagonals each. But if we put a camera on a vertex, it covers multiple diagonals at once. But there are more vertices than diagonals. But we don't **have** to put a camera on **every** vertex.

#damettereinordine: ho fatto un casino, [[20261014]] andava messo qua in mezzo
## Efficiency

Thanks to [[Monotone polygon|monotone polygons]], we've more or less solved the problem. We started from the gallery guarding problem, we realized that the best way to solve it is to triangulate the polygon, [[Tricoloring|tricolorate]] the vertices, and place cameras on just one color, giving us at most $\lceil \tfrac n 3 \rceil$ cameras.

We don't just want to solve the problem, we want to solve the problem in the best possible way. And Chazelle proved that the best way is $O(n+f(r))$, where $r$ is the number of reflex vertices and $f()$ is some function we don't care about. What happens when our polygon is convex? There are no reflex vertices, making the complexity $O(n)$. And we do indeed have a simple way to triangulate a convex polygon, by just picking one vertex and connecting it to all non-adjacent vertices, which is $n-2$, $O(n)$.

The method to triangulate convex polygons also works on polygons with holes, but we only care about simple polygons.

How to triangulate a simple polygon:
1. Partition in monotone parts.
2. Triangulation of each part.

We work with $y$-monotonicity.

Notice how reflex vertices aren't a problem for monotone polygons.

All convex polygons are monotone. Sta parlando di CH di sopra e CH di sotto, mi sa che non c'ero, #slide. #todo: image

![[Pasted image 20261020112351.png]]

The left chain has an edge that changes the y direction compared to the other edges (so does the right chain). There's one that goes up.

Let's classify vertices:

* ==🟡Start==: convex angle, both neighbors have a smaller y;
* ==🔴End==: convex angle, both neighbors have a larger y.
* ==🟢Regular==: one neighbor has larger y, and one has smaller y.
* Turn:
	* ==🟡Split==: reflex angle with two smaller neighbors.
	* ==🔴Merge==: reflex angle with two larger neighbors.

The top vertex is not the only start vertex, and the bottom vertex is not the only end vertex. The turn vertices are the evil guys.

![[Pasted image 20261020113604.png]]

If you draw a diagonal from a start or end vertex, they're still start and end vertices. But if you draw a diagonal up from a split vertex, or down from a merge vertex, they turn into regular vertices.

#todo: image

![[Pasted image 20261020114009.png]]

Since there are no turn vertices, I've partitioned my polygon into monotone parts.

How do I pick the other end point of my diagonal though? Take for example the Christmas tree polygon:

#todo: image

![[Pasted image 20261020114925.png]]

How much does it cost to find the other end point of the diagonal to remove a turn vertex? $O(n)$. There are $O(n)$ turn vertices, the whole thing is $O(n^2)$. All of this to once again find an $O(n^2)$ algorithm? No please, we're here to improve the efficiency!

Objective: find an efficient strategy to identify the other end-point of the diagonals from turn vertices.

In cases like this, an easy way to reduce complexity is to order the set, because it turns finding an element from $O(n)$ to $O(\log n)$.

Our polygon is given to us as an ordered list of vertices based on their clockwise order, we can order it in a different way.

### Sweeping line algorithm

To order the vertices we use the ==sweeping line algorithm==:
* Imagine a straight horizontal line starting above the polygon and going down;
* It first touches a single point forming a 0-length segment, then the length grows, and once it finds another vertex it's still a single segment,
* But when it finds a split vertex it ==*splits*== into two segments!!!!!!!
* And when it finds a merge vertex two segments *==merge==* into one!!!!!
* When I get to an end vertex, a piece disappears, a segment *ends*, and when I get to a *start* vertex a new segment appears (starts).

So that's why they're called that.

I can easily draw a diagonal upwards when I find a split vertex, because I already know the previous vertices.

I want a diagonal, how did we define a diagonal? ... . So the candidate is the ==lowest== vertex ==over== the split vertex ==in between== the edges immediately to the left and the right of the split vertex.

![[Pasted image 20261020121259.png]]

This way I'm sure it can't cross an edge ( #todo: image:ehhh l'ho messo in basso ma andava l'altro in basso per coerenza).

How can I have this information at hand efficiently? I need to keep this information during the sweeping. How? Keep the sweeped edges sorted in $x$, so that I can know which one is to the left and which one is to the right, making it $O(\log n)$. Also, keep the lowest vertex attached to these two edges.

Easy. Easy! Not. How do I do that with merge vertices? I need to look downwards, where I haven't looked. When I find a merge vertex, I need to remember it. And then non ho capito che cosa sta dicendo helper vertex che cos'è.

The slides have the proof that removing all the turn vertices gives you a monotone polygon.

Vedi #slide per le tecnicalità, come strutture dati eccetera.

left regular = regular vertex in the left chain