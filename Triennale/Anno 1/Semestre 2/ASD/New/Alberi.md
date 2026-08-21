---
cssclasses:
  - asd
---
[[ABR]], [[Triennale/Anno 1/Semestre 2/ASD/New/Heap]], [[Alberi decisionali]], [[Code con priorità]]

## Rappresentazione

### Array

Per rappresentare un albero come array, mettiamo la radice in $a[1]$. Per ogni nodo $a[n]$, mettiamo il suo figlio sinistro in $a[2n]$ e il figlio destro in $a[2n+1]$.

### Puntatori

Ogni nodo è una struttura che ha come campi il dato, il puntatore al figlio sinistro e il puntatore al figlio destro.