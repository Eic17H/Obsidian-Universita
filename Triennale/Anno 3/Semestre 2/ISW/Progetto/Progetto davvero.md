---
cssclasses:
  - isw
---
In realtà nelle regole c'è scritto che bisogna comunicare con l'LLM in inglese, per comodità farò una versione in inglese di questo documento per fare copia incolla, potrei in realtà abbandonare la versione in italiano perché tanto il progetto cambierà l'anno prossimo e non frega a nessuno.
## Input (CSV)

La colonna più a destra contiene solo `0` e `1`. La prima riga è il nome, nell'esempio è `target` ma non lo sarà sempre. Il nome sarà passato come parametro (quindi tu alla funzione passi come parametro il file in input, il nome della colonna target, e altre cose)

Le altre colonne contengono numeri.

Possono essere vuote o quasi vuote, contenere solo `0` o quasi solo `0`. Quelle con una di queste quattro qualità sono il senso del progetto (mi sa)

## Preprocessing

1. Leggi CSV
2. Separa colonna target
3. Elimina colonne vuote, quasi vuote, `0` o quasi `0`, citate prima. Il "quasi" è definito da una percentuale che sarà passata come parametro.
4. Normalizzazione (vedi sotto)

### Normalizzazione

> Le feature devono essere normalizzate usando la standardizzazione z-score, cioè i valori sono trasformati con una trasformazione lineare in modo da avere media nulla e deviazione standard unitaria.

> La normalizzazione deve essere applicata sull’intero dataset, escluso ovviamente la colonna col target.


### Divisione del dataset

Il dataset è suddiviso considerando i primi M campioni come training set, e i campioni restanti come test set. Il parametro M va calcolato in base alla percentuale del test set sul totale dei campioni, fornita in input. La divisione del dataset va fatta con un “taglio netto” al campione M.

Entrambi i dataset (training e test) sono salvati su file `.csv`.

## Feature reduction

Direi che questa si vedrà dopo, per ora implemento l'input e il preprocessing.