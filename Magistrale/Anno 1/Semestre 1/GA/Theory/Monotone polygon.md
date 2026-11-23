---
cssclasses:
  - ga
---
> *This doesn't mean they're boring.*

The analytical concept of monotonicity:

> **Monotone function**
> $y = f(x)$
> $\forall x_i,x_j,\ x_i > x_j \Rightarrow f(x_i)\geq f(x_j)$

For a strictly monotone function, take out the equals sign from the disequation.

> **Monotone polygons** (with respect to a direction)

Our direction will be the $y$ axis, so we'll talk about y-monotone polygons.

> **y-Monotone polygons**
> Take the highest point (largest $y$) and the lowest point (smallest $y$).
> To get from the highest to the lowest point, you have two paths: the left chain and the right chain.
> If the polygon is y-monotone, the two chains of edges are themselves monotone, in the sense that every vertex of the chain going from the highest to the lowest has a $y$ that is smaller or equal to the previous.

![[Pasted image 20261014102733.png]]

The two chains are defining monotone functions.

Monotone polygons have a nice property that we'll prove next week. #todo 

> We can [[Polygon triangulation|triangulate]] monotone polygons in... (drums rolling...) $O(n)$!!!

It's very nice. Normal polygons, $O(n^2)$, monotone polygons, $O(n)$.

How can we transform a normal polygon into a monotone polygon? We cannot, but we can split a normal polygon into a monotone polygon.

The goal is:

1. Split $P$ in monotone parts: ==partition==;
2. Triangulate each part;

If I can perform both steps, and they're sequential, and if none of them is more complex than $O(n \log n)$, then the whole algorithm is $O(n \log n)$. The second one is $O(n)$, next time we'll prove the complexity of the first part.

[[Magistrale/Anno 1/Semestre 1/GA/Raw/20261021]]
#slide per la lezione dopo