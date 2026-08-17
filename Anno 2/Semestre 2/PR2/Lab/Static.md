---
cssclasses: pr2
---
Certe volte le varibili si riferiscono a una classe intera, anziché a un oggetto. Con la keyword `static`, una variabile che fa parte di una classe, anziché avere un'istanza per ciascun oggetto, è un'unica variabile per l'intera classe, condivisa da tutte le istanze della classe. Per questo motivo, sono dette anche *variabili di classe*.

La memoria di Java è come uno stack:

|      oggetto      | oggetto |      oggetto      | oggetto |      oggetto      | oggetto |
| :---------------: | :-----: | :---------------: | :-----: | :---------------: | :-----: |
|      classe       |    <    |      classe       |    <    |      classe       |    <    |
| variabile statica |    <    | variabile statica |    <    | variabile statica |    <    |
|  metodo statico   |    <    |         <         |    <    |         <         |    <    |

Allo stesso modo, i metodi statici possono essere chiamati non tramite un oggetto, ma direttamente tramite la classe: `Math.sqrt()`. Non c'è bisogno di `new`.