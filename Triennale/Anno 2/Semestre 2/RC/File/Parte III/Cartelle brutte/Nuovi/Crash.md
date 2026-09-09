---
cssclasses: rc
---
Vediamo come ci comportiamo dopo un crash, quando ritrasmettere, come evitare di perdere o duplicare dati. Questo dipende da quando avviene il crash in relazione alla scrittura dei dati ricevuti e all'invio dell'$ACK$. Che avvenga prima la scrittura o l'$ACK$ è qualcosa che viene deciso in anticipo.

## In pratica

Il mittente ha quattro modi in cui può ragionare:
* Ritrasmetti **sempre** quando c'è stato un crash;
* Non ritrasmettere **mai** anche se c'è stato un crash;
* Ritrasmetti se c'è stato un crash e non hai ancora ricevuto l'$ACK$;
* Ritrasmetti se c'è stato un crash e hai già ricevuto l'$ACK$;

Il destinatario ne ha due:
* Scrivi i dati ($W$) e poi invia l'$ACK$;
* Invia l'$ACK$ e poi scrivi i dati;

Ci sono poi tre possibilità per il crash in confronto a scrittura ed $ACK$: se avviene per primo, per secondo, o per terzo.

Il risultato può essere corretto, può risultare in un pacchetto duplicato, o in pacchetto perso.

Scriviamo le parti dopo il crash tra parentesi per indicare che non avvengono.

| Mittente   | Prima $ACK$ | <   | <     | Prima scrittura | <   | <     |
| ---------- | ----------- | --- | ----- | --------------- | --- | ----- |
|            | AC(W)       | AWC | C(AW) | C(WA)           | WAC | WC(A) |
| Sempre     | OK          | DUP | OK    | OK              | DUP | DUP   |
| Mai        | LOST        | OK  | LOST  | LOST            | OK  | OK    |
| Se ACK     | OK          | DUP | LOST  | LOST            | DUP | OK    |
| Se non ACK | LOST        | OK  | OK    | OK              | OK  | DUP   |
