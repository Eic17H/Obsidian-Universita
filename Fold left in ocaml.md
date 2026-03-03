Una cosa che non avevo capito finché non l'ho trovata nell'esame è fold_left quindi te lo dico in caso
Perché pensavo funzionasse in modo completamente diverso da come funziona

Prende una funzione, un valore e una lista
Fai che il valore è di tipo V e la lista è di tipo L
La funzione deve prendere un V e un L, e restituire un V
Il V che restituisce sarà il valore della volta dopo che lo applica

Quindi metti che hai una funzione che prende una stringa, per esempio "ciao", e un numero, per esempio 2, e ti ridà la stessa stringa ma con alla fine la lettera in quella posizione, quindi "ciaoi"
List.fold_left f "ciao" [1;2;3;4] restituisce "ciaociao", perché i passaggi sono
* f ciao 1 → ciaoc
* f ciaoc 2 → ciaoci
* f ciaoci 3 → ciaocia
* f ciaocia 4 → ciaociao

Io l'avevo capita al contrario e infatti non sapevo fare quello che c'era all'esame