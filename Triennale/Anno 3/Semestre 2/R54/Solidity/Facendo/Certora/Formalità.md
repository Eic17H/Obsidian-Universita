## Modello

Un modello, o esempio, è un'istanza, cioè una tupla di valori assegnata alle variabili. Un test che ha tre variabili numeriche avrà modelli che sono terne di numeri.

## Vacuità

Una vacuità (*vacuity*) o affermazione vacua (*vacuous statement*) è una tautologia che non ci dà informazioni utili, per esempio $p(x)\ \forall x \in \mathbb N\ |\ x \lt 0$: certo che non ci sono controesempi, non stai dicendo niente.

In Certora, una regola vacua è una regola i cui `require` scartano tutti i test, quindi nessun test arriverà mai ad un `assert` falso, e quindi tutti i modelli passano. `require(false)` è come $\bot \vdash p$, ex absurdo quodlibet.