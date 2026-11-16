---
cssclasses:
  - dm
---
La qualità può essere compromessa alla creazione (problemi coi sensori, typo, risoluzione bassa), al salvataggio (non sta nello schema del tuo DB, unità di misura, è cambiato il formato) o alla lettura (etichette ambigue, dato duplicato, *data leakage*).

> Continua a menzionare il *data leakage* ma cos'è? Boh.

Che schifo c'è la stessa slide due volte ma brutta in due modi diversi.

![[Pasted image 20261116070822.png]]

![[Pasted image 20261116070833.png]]

## Rumore vs outlier

Il rumore mette i dati rilevati in una posizione sbagliata ma comunque in funzione di quella giusta. Quindi anche con un po' di rumore sai che il valore giusto è vicino a quello rilevato, basta fare tante rilevazioni e vedere intorno a quale valore si aggirano.

Un outlier è un singolo campione con un valore a caso che non c'entra niente con gli altri, quindi devi vedere se era un errore casuale o se davvero devi considerarlo come eccezione a quella che sembrava una regola.

## Data leakage

Bello non l'ho capito.

![[Pasted image 20261116071127.png]]