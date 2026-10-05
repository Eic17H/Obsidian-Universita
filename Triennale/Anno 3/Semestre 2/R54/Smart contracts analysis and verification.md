## Informazioni ufficiali

**Descrizione**: L'attività del tirocinio riguarda lo studio e la sperimentazione di tecniche avanzate di analisi e verifica per smart contracts su blockchain. Gli smart contracts sono programmi che vengono eseguiti in modo sicuro e trasparente da una blockchain, e in grado di gestire e distribuire crypto-asset agli utenti seguendo logiche personalizzate e complesse. La verifica degli smart contracts è un problema di notevole rilevanza pratica, in quanto anche un singolo bug può causare perdite multimilionarie di crypto-asset. L’obiettivo del tirocinio è fornire allo studente una solida introduzione alle nozioni fondamentali degli smart contract, delle blockchain e delle criptovalute, consentendogli di sviluppare competenze pratiche nella progettazione e verifica di sicurezza degli smart contracts e di comprendere i rischi che caratterizzano questo settore in rapida evoluzione.

Nello specifico, il tirocinante dovrà:

- approfondire lo studio di un linguaggio di programmazione per smart contracts;
- studiare uno strumento per l’analisi o la verifica di smart contracts;
- sperimentare lo strumento scelto su un insieme di use cases (vedi ad esempio https://github.com/bitbart/contracts-verification-benchmark);

I dettagli saranno concordati con il responsabile del progetto.

**Sede**: Dipartimento di Matematica e Informatica (Cagliari)

**Responsabile**: Massimo Bartoletti

## Indice

![[Altro/Linguaggi di programmazione/Solidity]]

## Concetto

Noi prendiamo dei contratti di Solidity e scriviamo dei test riguardo a quei contratti.

I test scritti in SolCMC sono composti da una funzione che può prendere dei parametri. Si utilizzano due comandi principali: require e assert. Una require prende un'espressione booleana, e ignora il test corrente se è falsa. Un assert invece fa fallire il test se l'espressione è falsa. Il resto del codice è normale codice Solidity, nello scope del contratto. La funzione viene eseguita più volte con valori casuali per i parametri. Si può eseguire col solver Z3 o Eldarica. Il tempo dell'ambiente non scorre durante un test.

I test scritti in Certora usano il linguaggio CVL. Non sono funzioni, ma blocchi di codice; i valori casuali sono assegnati alle variabili dichiarate senza inizializzazione. Anche qui si usano assert e require. La differenza è che si possono oddio è un casino se guardi no-send-in-agree. Stacca stacca, non ci capisco niente in realtà.
### Come lo spiego ai parenti

Un contratto di solito si scrive in una lingua umana.

> *Prestito di 200€ con interessi. Gli interessi sono calcolati secondo \[...\]*

Però in certi casi la lingua umana si può intepretare in modi diversi. È per questo che servono i tribunali.

I linguaggi di programmazione sono perfettamente inequivocabili, quindi un contratto scritto un un linguaggio di programmazione descrive regole chiare senza margine di errore.

```Solidity
contract Prestito {
	valore = 200;
	pagato = 0;
	interessi(tempo) = {...}
}
```

Però anche un contratto scritto in modo inequivocabile può essere difficile da leggere, perché anche se è scritto in modo strano e disordinato può comunque andare bene al computer.

Per risolvere questo problema, si definiscono certe proprietà che deve avere il contratto.

> *Gli interessi aumentano finché il debito non viene pagato.*

```
sapendo: pagato < dovuto,
sapendo: tempo1 < tempo2,
obbliga: interessi(tempo1) < interessi(tempo2)
```

Ciascuna di queste proprietà, da sola, è molto più facile da leggere rispetto al contratto intero. E chi scrive la proprietà può non essere chi scrive il contratto, quindi se il contratto è scritto in modo confusionario, puoi controllare che sia scritto correttamente scrivendo delle proprietà in modo comprensibile.

C'è un programma che prende un contratto e una proprietà e ti dice se quel contratto rispetta quella proprietà.

Io scrivo i contratti e le proprietà, qualcun altro scrive il programma che esegue quei controlli.

#materia