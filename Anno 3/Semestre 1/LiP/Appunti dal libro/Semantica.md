---
cssclasses:
  - lip
aliases:
---
La grammatica descrive la struttura di un linguaggio, ma non ci dice cosa significa. "Come" è una sequenza di simboli accettata sia dall'italiano che dall'inglese, ma ha un significato diverso nelle due lingue. La differenza tra le due si trova non nella grammatica ma nella **semantica**.

Per quanto ci riguarda, la semantica definisce *cosa fa* un programma sintatticamente corretto. Permette di sviluppare tecniche di ottimizzazione e di debugging, di verificare la correttezza, di tradurre tra formalismi diversi.

Il libro descrive quattro definizioni della semantica (algebrica, assiomatica, operazionale, denotazionale), ma non si capisce niente. Lo riporto comunque a grandi linee:
* **Algebrica**: le operazioni sono definite con equazioni; descrive bene i tipi di dato astratti, come moduli e classi.
* **Assiomatica**: caratterizza gli stati, si basa su una descrizione di cosa fa un costrutto; utile per verificare la correttezza.
* **Operazionale**: si definisce un interprete del linguaggio su una macchina ospite le cui componenti si descrivono matematicamente; lo stato descrive il sistema, la transizione descrive un passo di computazione che modifica lo stato e/o il programma, una computazione è una serie di transizioni di stato; utile perché dà un modello di implementazione.
* **Denotazionale**: una funzione dagli input agli output del programma, si concentra sulla trasformazione sugli stati indotta dal programma, su qual è la trasformazione, non su come avviene.

A dire il vero, poi li definisce di nuovo: vedi [[Stili di semantica]].

Come si può intuire dalla descrizione più lunga, noi ci concentriamo sulla semantica operazionale (e infatti, avendo fatto il progetto prima dello scritto, mi è familiare). Prima però, dobbiamo dare la nozione di paradigma.

## Paradigma di programmazione

Un insieme di strumenti concettuali forniti da un linguaggio di programmazione per la stesura del codice sorgente di un programma. Definisce la concezione del programma e la sua esecuzione.

Vediamo quindi qualche paradigma:

### Imperativo

Il programmatore decide qual è l'istruzione successiva, la scrittura del programma definisce la sua esecuzione. Si vede l'algoritmo come sequenza di passi.

Un passo di computazione modifica lo stato.

Questo paradigma si basa sui primi linguaggi di programmazione, come il Fortran.

### Funzionale

Il programmatore definisce delle funzioni, e definisce come vengono invocate e usate. Non ci si concentra sull'algoritmo, ma sull'applicazione di funzioni e sui loro risultati.

Un passo di computazione restituisce un valore.

Questo paradigma si basa sul λ-calcolo.

### Procedurale

Unisce un po' quello imperativo a quello funzionale. Le funzioni vengono chiamate procedure, e vengono viste sia dal punto di vista della sequenza di passi corrispondente, sia per il loro eventuale valore restituito.

Un passo di computazione modifica lo stato, e può restituire un valore.

Due esempi sono Pascal e Algol.

### Oggetti

Le parti del programma interagiscono scambiandosi messaggi. Sia i messaggi che le parti del programma sono visti come oggetti.

L'esempio principale è lo SmallTalk, che ha semantica algebrica.

### Logico

Si basa sulla logica, sulle clausole di Horn. Il linguaggio proprio di questo paradigma è il Prolog.

## Semantica operazionale

Definiamo la semantica operazionale basandoci sulla nozione di stato. Dato un programma $p$, indichiamo con $\mathbf{Name}(p)$ l'insieme dei *nomi* che compaiono nel programma, cioè tutti gli identificatori. A ciascun nome può essere associato un valore. Indichiamo con $\mathbf{Value}$ l'insieme dei valori possibili, che non dipende dal programma stesso.

> **Stato** - Dato un programma $p$, il suo stato è una funzione da $\mathbf{Name}(p)$ a $\mathbf{Value}$.

La struttura dello stato dipende dal paradigma. Nel paradigma imperativo e in quello procedurale, lo stato si compone di *ambiente* (una funzione da nomi a *oggetti denotabili*), *memoria* (una funzione da *locazioni denotabili* a *oggetti memorizzabili*), uno heap (una struttura dati per memorizzare le strutture dati dinamiche). Invece nel paradigma funzionale c'è solo l'ambiente.

Cosa fa una semantica operazionale? Dipende dal linguaggio e dal paradigma. Nei linguaggi imperativi, la semantica operazionale definisce un cambiamento di stato, nei linguaggi funzionali la semantica operazionale restituisce un valore.

Una computazione, in generale, è una catena di cambiamenti (cambiamenti di stato o di valori). Questi cambiamenti sono descritti da [[Comune/Regole di inferenza|regole di inferenza]], della forma $\dfrac{\text{premessa}}{\text{conseguenza}}$.
Queste regole sono guidate dalla sintassi. Le transizioni per un costrutto composto $A \; op \; B$ sono date in termini di quelli dei componenti $A$ e $B$.