 *
 * Oggi rappresentiamo l'heap come array.
 * a[1] radice
 * a[i] nodo
 * a[2i] figlio sinistro
 * a[2i+1] figlio destro
 * La radice non è a[0] perché 2*0=0.
 *
 * Non importa l'esatta implementazione, basta che faccia ciò che deve.
 * Funzioni necessarie: scambiaNodi()

Heap adatta:

Se la testa è a posto, a posto
Altrimenti, scambia la testa col figlio maggiore
Se hai A->B,C, dove B>C>A
Allora hai T=A, F=B
Dunque scambi testa e figlio
F->T,C, cioè B->A,C
Abbiamo già visto che B>C, quindi easy
Ma magari A li awen pakala, quindi si ripete su A finché non è una foglia (cioè è più di lungArray/2)