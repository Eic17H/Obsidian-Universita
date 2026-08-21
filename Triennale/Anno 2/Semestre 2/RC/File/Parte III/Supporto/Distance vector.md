---
cssclasses: rc
---
Un [[Algoritmi dinamici|algoritmo dinamico]].

Compongo una tabella dei ritardi. Ogni nodo ha un vettore dei ritardi, e ogni elemento del vettore corrisponde al ritardo tra quel nodo e un altro nodo, oltre alla linea in uscita usata per arrivarci.

Per i vicini immediati basta usare un [[ECHO]] per sapere il ritardo, lo fai un po' di volte e fai la media.

A intervalli regolari ogni router manda la sua tabella a tutti i suoi vicini. Ricevuta, calcola il ritardo tra sé stesso e i non vicini immediati col una logica che concettualmente è simile all'<span class="asd">[[Triennale/Anno 1/Semestre 2/ASD/New/Dijkstra|algoritmo di Dijkstra]]</span>.