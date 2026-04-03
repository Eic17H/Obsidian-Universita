---
cssclasses:
  - pr1
---
## Call stack

Dentro la funzione iterativa ci sono invocazioni alla funzione stessa
Lo scope definisce qual è l’ambito di visibilità degli identificatori.
`a=fib(3);` Prima cosa da valutare: rvalue.
[orrendi grafici sul quaderno che non ricreerò]
L’insieme di funzioni invocate si può visualizzare come una pila di invocazioni, una call stack in cui una funzione che ne invoca un’altra la mette sopra sé stessa. L’unica funzione attiva è quella in cima, l’ultima chiamata, quelle sotto sono in pausa, congelate.
Si chiama *freeze/thaw*, congelare/scongelare.

Quello che abbiamo visto sulla gestione dei simboli:
* Statica: stanze
* Stack: cassette della frutta

Contesto: set di identificatori visibili adesso.
Si parla di context switch.
Il cambio di scope avviene creando un record di attivazione della subroutine per contenere tutte le variabili.
Vedi slide, indirizzo di ritorno.
Tutti questi cambiamenti di contesto non esistono nel linguaggio macchina.
Il debugger ci dice in quale punto della call stack siamo.
Non tutti i linguaggi hanno la call stack. Alcuni hanno solo binding statico e globale.

Stack overflow: chiamo `fib(2450)`, non c’è spazio per nuovi processi sullo stack.

La memoria è divisa in 4:
* Program (sezione speciale)
* Static,
* Heap
* Call stack

Static, heap e call stack sono collettivamente detti data. Non sono necessariamente tutte della stessa dimensione, ma hanno una dimensione.

## Modelli di gestione

Non dovrebbe mai arrivare il momento di parlare di gestione di memoria quando si parla di linguaggi ad alto livello, quindi perché è arrivato?
Aveva senso quando si avevano kB di memoria, ma ora siamo 6 ordini di grandezza sopra.

Finora abbiamo pensato a una macchina astratta con memoria infinita. La macchina di Turing ha una memoria infinita. Ma la macchina astratta poi va tradotta in una macchina reale limitata.
Vedi slide.
Abbiamo fatto finta che non ci sia spreco di memoria.
Il meccanismo, più che alternativo, aggiuntivo è un retaggio del passato.
Oggi non capita di usare lo stesso computer più persone allo stesso tempo.
Quando c’erano 4 computer al mondo, non era “mio”, “tuo”, “suo”.
Oggi invece, “computer” è sinonimo di “PC”.
“Mi serve memoria, la chiedo, poi la restituisco”, prima serviva perché era condivisa, oggi si fa per non finirla.

Heap, mucchio, pagliaio. Ammasso disordinato, prendi quanto vuoi.
Memoria ammuntonata.

Ci sono due modi per gestire l’heap.
* Bello: come lo stack, implicitamente, automaticamente, al runtime.
* Brutto: esplicitamente, a scelta del programmatore.
Si applica sia ad allocare memoria che a rilasciarla.
L’ambiente a runtime non commette errori. Neanche Michele commette errori, ma qualche altro programmatore di sicuro sì.
Programmatore, prendi, sono tutti `@tuoi`!
Se lo fai bene bene, se no male.
* A carico del runtime: difficile, pesante, complesso.
* A carico del programmatore: facile, ci vuole meno, più errori.

Il rilascio automatico è detto garbage collection.
Un DeVizia passa per la memoria, trova memoria che non serve e la rende nuova.
La garbage collection è caratteristica dei linguaggi progettati bene: C#, Java, non C.
Costa.

#vedioriginale

Puntatori: nuova tipologia di simboli che, sinceramente, non vorremmo che esistessero, per un motivo molto semplice:
Mondo
Macchina astratta
:)
Si vive bene, non c’è bisogno di conoscere tutto sul computer.

⊡ Questo è Gianfranceso, la mia variabile con un nome e un valore.

😈 E questo è un puntatore.
Inferi
Macchina reale
):
Registri, assembler, locazioni di memoria.

`&231`
`1010000`
Locazioni di memoria, ciascuna con un numero lunghissimo che mi devo ricordare.
`&232`
`1010010`
`&233`
`0110001`
`&234`
`1001001`

Torniamo a una cosmogonia classica. Grecia classica. C’erano il mondo e gli inferi, coi demoni. Dove avresti voluto vivere? Quanto ci ha messo Dante a raccontare cosa c’è all’inferno…
Ci siamo svincolati dagli inferi, e poi, improvvisamente, chi arriva nel nostro mondo? I puntatori, gli emissari degli inferi, agenti delle potenze infernali.
Questo valore non è più un int, un bool, ma una locazione di memoria.
Abbiamo aperto le porte degli inferi.
(Un tempo tutto questo era sensato).

Se proprio devi fare queste cose, cambia linguaggio.
“Eh no ma io se lo faccio in C ci metto 3ms di meno e quindi con 7’000’000 di iterazioni risparmio 10 secondi”-
Benissimo! Bene!
A tuo rischio e pericolo.

Quando allochi della memoria dall’heap, ‘sto gran pezzo di me…
moria è una cosa reale.

Non esiste alternativa per allocare dinamicamente la memoria e utilizzarla.
Poi te la dimentichi e usi solo il nome.

I puntatori non sono mai necessari (quasi).

Quando fai int\*p, int non serve a niente finché p non comincia a puntare.

I progettisti del linguaggio, ‘ste merde, hanno reso possibili tutti questi modi (e altri) per dichiarare un puntatore: `int* p`, `int *q`, `int*r`, `int * s`…


`&` è un operatore unario prefisso che…
…pathos…
…
…
…
restituisce l’indirizzo di una variabile.
??? Ma?
La variabile vive nella macchina astratta.
Ma `&`, Orfeo, che cerca Euridice all’inferno, ma è un fesso, ma il nostro `&orfeo`, lo chiamiamo così per amicizia, va negli inferi e ripesca un indirizzo.

Il corso comincia separando i due mondi con i linguaggi ad alto livello, e ora ciò che abbiamo cacciato dalla porta rientra dalla finestra.

Non so nulla sul risultato e mi fido della macchina.
Non saprò mai il valore della mia espressione.