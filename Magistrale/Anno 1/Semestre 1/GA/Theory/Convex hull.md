---
cssclasses:
  - ga
---
The **convex hull** of a shape $P$ is the smallest shape $\text{CH}$ such that $\text{CH}$ is convex and all points of $P$ are points of $\text{CH}$. What does that mean?

## Concept

### Convex

> A portion of the plane is **==convex==** if and only if taken any pair of points in that portion, you can connect them with a segment formed only by points that are in that portion.

"Convex" and "not convex" are generic groups. We'll be dealing with polygons, which can also be convex or not convex. It's easier to construct the convex hull of a polygon, as you only need to consider its corners to do so, whereas with a rounded shape you need to consider its whole boundary.

#todo: image

We notice that we have two types of corners: ones with an internal angle less than $180°$, and ones with an internal angle larger than $180°$. Convex polyhons have none of the second type.

### Hull

> A **==hull==** is a closed part of the plane.

## Finding the convex hull

For the time being, we are modeling our problem. Once we have modeled it, we can begin solving it. But first, we need to figure out what we are looking for.

It's good to remind which are the input and the output of the problem.

* ==Input==: A set $P$ of points in $\mathbb R ^2$
* ==Output==: The convex hull of $P$

By $\mathbb R^2$ we practically mean the plane. But technically, they are different. The plane is a geometric entity, $\mathbb R^2$ assumes we are using real cartesian coordinates, which we will be.

What is the convex hull of $P$? We know two things for now:

1. CH is a closed portion of $\mathbb R ^2$.
2. CH is convex.

Crucial question to deliver the solution via an algorithm that can solve it: Is CH a polygon?

> *Raise your hand if you think it is. Raise your hand if you think it isn't. We have 90% abstention, no wonder nobody votes in Italy.*
> - Scateni

The topic of this course is algorithms. But, don't tell anyone, we'll make an... *[[CH is a polygon|empirical proof]]*.

Yes, the convex hull of a set $P$ is a polygon. Not only is it a polygon, but the vertices of that polygon are points in $P$. So, the algorithm that finds those vertices takes $P$ as an input and outputs a subset of $P$, or, in a single word: ==selection==.

The CH is the vertices *and the edges* though. Let's figure out what's special about the edges, compared to the segments connecting any other pair of points in $P$.

> **If and only if the segment is an edge of the convex hull, then the straight line it lies on splits the plane in two halfplanes, one of which, if closed, contains all the points of $P$**

Now we can design [[Convex hull algorithm|an algorithm]].