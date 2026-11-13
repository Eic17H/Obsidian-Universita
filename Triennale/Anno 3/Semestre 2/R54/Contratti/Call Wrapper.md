---
cssclasses:
  - r54
---
Questo contratto è semplicissimo. Non so come sia possibile dover cambiare qualcosa per portarlo agli standard di Bank.

È un contratto che ha un solo metodo, `callwrap`, il cui scopo è di fare da tramite per le chiamate esterne.

Proprietà:

* **bal**: il bilancio del contratto non cambia dopo `callwrap`. $cw \Rightarrow \lnot \Delta \$$
* **stor**: lo storage (variabili) del contratto non cambia dopo `callwrap`. $cw \Rightarrow \lnot \Delta stor$

Immagino che tutti i test siano già presenti e funzionanti.

```log
ERROR:root:versions/Caller_v1.sol: Couldn't retrieve contract name.
ERROR:root:versions/Caller_v1.sol: Couldn't retrieve contract name.
ERROR:root:versions/Caller_v3.sol: Couldn't retrieve contract name.
ERROR:root:versions/Caller_v3.sol: Couldn't retrieve contract name.
ERROR:root:Could not retrieve versions/Caller_v1.sol contract name.
ERROR:root:Could not retrieve versions/Caller_v1.sol contract name.
ERROR:root:Could not retrieve versions/Caller_v3.sol contract name.
ERROR:root:Could not retrieve versions/Caller_v3.sol contract name.
ERROR:root:versions/Caller_v4.sol: Couldn't retrieve contract name.
ERROR:root:versions/Caller_v4.sol: Couldn't retrieve contract name.
ERROR:root:Could not retrieve versions/Caller_v4.sol contract name.
ERROR:root:Could not retrieve versions/Caller_v4.sol contract name.
ERROR:root:versions/Caller_v2.sol: Couldn't retrieve contract name.
ERROR:root:Could not retrieve versions/Caller_v2.sol contract name.
ERROR:root:versions/Caller_v5.sol: Couldn't retrieve contract name.
ERROR:root:versions/Caller_v2.sol: Couldn't retrieve contract name.
ERROR:root:Could not retrieve versions/Caller_v5.sol contract name.
ERROR:root:Could not retrieve versions/Caller_v2.sol contract name.
ERROR:root:versions/Caller_v5.sol: Couldn't retrieve contract name.
ERROR:root:Could not retrieve versions/Caller_v5.sol contract name.
```

Queste naming conventions a caso di questo script python insopportabile, come ti pare. Il file si deve chiamare come il contratto, o almeno in modo simile.

Interessante, i test non passano tutti. Molto strano, mi sembra estremamente semplice.

| SolCMC |     <     |    <     |      <       |     <     |    <     | Certora |    <    |     <     |
| :----: | :-------: | :------: | :----------: | :-------: | :------: | :-----: | :-----: | :-------: |
| **Z3** |     <     |    <     | **Eldarica** |     <     |    <     |         |    <    |     <     |
|        |  **bal**  | **stor** |              |  **bal**  | **stor** |         | **bal** | **stor**  |
| **v1** |    TN!    |   TP!    |    **v1**    |    TN!    |   TP!    | **v1**  |   TN    |    TP!    |
| **v2** | ==🔴FP!== |   TP!    |    **v2**    | ==🔴FP!== |   TP!    | **v2**  |   TN    |    TP!    |
| **v3** |    TN!    |   TN!    |    **v3**    |    TN!    |   TN!    | **v3**  |   TN    | ==🔴FP!== |
| **v4** |    TN!    |   TN!    |    **v4**    |    TN!    |   TN!    | **v4**  |   TN    | ==🔴FP!== |
| **v5** | ==🔴FP!== |   TP!    |    **v5**    | ==🔴FP!== |   TP!    | **v5**  |   TN    |    TP!    |
Vediamo cosa fa ciascuna versione:

1. Rientrante
2. Non rientrante
3. Rientrante, con un nuovo metodo rientrante
4. Non rientrante, con un nuovo metodo rientrante
5. Non rientrante, con un nuovo metodo non rientrante

Il nuovo metodo è `modifystorage`, che prende in input un dato e lo sovrascrive al dato già presente.

Cos'hanno v2 e v5 in comune? Sono completamente non rientranti. A quanto pare, questo basta per far credere a SolCMC che il loro bilancio non possa cambiare. In realtà può comunque cambiare a causa della chiamata esterna, come nota Certora.

Cos'hanno v3 e v4 in comune? `modifystorage` è rientrante, che permette di eseguire `callwrap` durante `modifystorage`, che permette a `data` di cambiare durante `callwrap`. Questa è una limitazione di Certora già nota dagli altri contratti, non so se posso farci qualcosa.

Vediamo **bal**.sol. Molto semplice, confronta il bilancio prima e dopo la chiamata. Onestamente non so cosa cambiare.

Doveva essere semplice. Doveva essere semplicissima. Com'è possibile. Forse se faccio i test Certora coi hook funziona, devo vedere come interagiscono con la rientranza.