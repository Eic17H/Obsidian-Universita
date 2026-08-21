---
cssclasses: pr2
---
# Varargs

Capita di dover scrivere metodi con tanti parametri, o lo stesso metodo con un numero variabile di parametri. Soluzioni? Magari passare un array, o fare l'overloading tante volte quante sono le quantità possibili di argomenti. Entrambe le strategie hanno problemi. Gli array hanno dimensione fissa, stai riservando uno spazio in memoria, magari 1000 int, ma ne usi 3 nella maggior parte dei casi. Invece se fai l'overloading, immagina un metodo che fa la somma, 1000 metodi con la firma simile, e più vai avanti più la firma e lunga. E poi immagina dover fare modifiche.

Ecco perché sono stati introdotti i varargs. Tutti i parametri devono essere dello stesso tipo. Si scrive `(String... ingredienti)`, dove `ingredienti` diventa un array.

Finito.