---
cssclasses:
  - ga
---
Before, we need a secret third property:
3. CH is **==THE==** smallest ==1==.

#todo: better images

 We have a set $P$ of $n$ points. Let's suppose that its CH is a polygon.
 The simplest example of a convex polygon that contains all of $P$ is a rectangle.
 ![[Pasted image 20261006112432.png]]
 The nice thing about a rectangle is that it's aligned to the cartesian axes.
 Let's make it as small as possible, which means each of its sides would touch at least one of the points of $P$.
 ![[Pasted image 20261006112634.png]]
 We now have the smallest axis-aligned rectangle containing all the points: as soon as you try to shorten one side you are leaving at least one point of $P$ out of the rectangle. This is the ==axis-aligned bounding box==, or ==AABB==, or just *bounding box*.
 Now, can we try to do better if we use something other than a rectangle? A polygon that's somehow *more convex*? We can cut corners.
 Imagine I drew the points correctly the first time.
 ![[Pasted image 20261006113109.png]]
 We connect points on the boundaries, forming triangles, and remove the triangles. We now have a pentagon. If we try to do the same with the last pair of points on the boundaries, one point is left out
 ![[Pasted image 20261006113219.png]]
 We can connect the point with the three vertices of the triangle, forming three triangles, and removing two of them.
 ![[Pasted image 20261006113305.png]]
 I'm left with a pentagon, and I can't do anything better.
 ![[Pasted image 20261006113349.png]]
 This is not an actual proof, but at least we are now convinced that the convex hull is a polygon.
 The actual proof requires the *triangulation of a set*, which we will study much later in the course.