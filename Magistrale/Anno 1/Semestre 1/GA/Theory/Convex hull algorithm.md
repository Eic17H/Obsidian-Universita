---
cssclasses:
  - ga
---
Let's now try to design the algorithm.

Here is your toolbox:
1. Figure out if a point $P$ is in a half plane or another with respect to the segment $\overline{P_jP_k}$.

And here is the algorithm:
1. Take all the <span class="am">[[Coppia ordinata|pairs]]</span> in $P$, that is $P \times P$, whose <span class="am">[[Teoria degli Insiemi#Prodotto cartesiano|cardinality]]</span> is $|P|^2$, important to know for [[Comune/Complessità|complexity]];
2. For each pair, use the ==tool== to see which halfplane the other $n-2$ points are in.

Let's ignore how it's done, you have your tools, they're black boxes, like library functions.

With $n$ points, how many pairs do we have? $O(n^2)$. How many checks for each pair? $O(n)$. Then, how many checks in total? They're nested loops, so we multiply them: $O(n^3)$. **Great**.

So, we have our first algorithm, and it's bullshit, because an algorithm with complexity $O(n^3)$ is bullshit.

So. Our algorithm:

> $\text{SlowConvexHull}(P)$
> Input: A set $P$ of points in the plane.
> Output: A list $L$ containing the vertices of $\text{CH}(P)$ in clockwise order.
> 1: $E \leftarrow \emptyset$
> 2: **for** all ordered pairs $(p,q) \in P \times P$ with $p \neq q$**:**
> 	3: **do** $\text{valid} \leftarrow \text{true}$
> 	4: **for** all points $r \in P$ not equal to $p$ or $q$**:**
> 		5: **do if** $r$ lies to the left of the directed line from $p$ to $q$**:**
> 			6: **then** $\text{valid} \leftarrow \text{false}$
> 	7: **if** $\text{valid}$ **then** add the directed edge $\overline{pq}$ to $E$
> 8: From the set $E$ of edges construct a list $L$ of vertices of $\text{CH(P)}$, sorted in clockwise order.
> 9: **return** $L$

We see that a polygon is also defined by the order of its vertices, corresponding to its edges. We also see that we are given an implementation suggestion, that is, the type of variables, and a flag that we set to $\text{true}$ by default and falsify under certain conditions.

The reason we need step 8 is that $E$ is a set, it's not ordered, and we need $L$ to be an ordered list.

## Complexity

Still, we have a problem: steps from 1 to 7 are $O(n^3)$.

Well, someone was able to prove that computing the CH of a set of points is in the same complexity class as sorting, that is, $O(n \log n)$. It's always interesting to have proofs about the complexity class of a problem, because it tells us that we *can* design algorithms with that complexity for that problem, even if we don't yet know what that algorithm is.

And then there's the opposite of efficiency: brute-force approach. Sometimes, the brute-force approach is what you want, because it's simple. We described the brute-force algorithm for humans in two steps, a human can execute it in two seconds. Claude... can execute it in much less, sadly, frustratingly, we don't need programming languages to make computers run algorithms anymore.

The problem arises when we have a lot more points, like a billion. But, we don't have to say that the brute-force approach is ==*evil*==, just that sometimes it's inadequate.

You have to keep two things in mind:
1. ==No free lunch==: you have to pick between simplicity and efficiency, there are trade-offs;
2. ==No silver bullet==: it's never-ish true that there's the single perfect optimal solution for a problem, or for a class of problems, you have to adapt;
3. **==damned AI!==**: it all feels useless, we can do this by eye in a second, but Claude can do it in a fraction of a second, we're losing the art of good algorithms.

## Clarifying

Let's now clarify two points of the algorithm:
* In step 5, how can we find if $r$.....
* In step 8, how.........

Point on #slide. We just have to compute the determinant of a $3 \times 3$ matrix. And this is **the** operation that determines the efficiency of the algorithm, because we are performing this operation $n^3$ times.

Sorting the edges is easy. The second vertex of an edge is the first vertex of the next edge. We could say it's $O(n)$, nothing compared to finding the edges.

Now, the question is: does the algorithm even work? Yes, because it's checking **all** the pairs of points, it's analyzing all the possible segments. Well, it's not that robust. Edge, cases, like three aligned points break the algorithm, three almost-aligned points may be subject to rounding errors, skipping an edge or adding an extra edge inside the polygon.