## Perché usare gli LLM
* Meno tempo per abbozzare i test;
* Suggerisce casi positivi e negativi, e quali casi limiti ignorare;
* Meno tempo per creare mock object;
* L'utilità maggiore è per il codice con cui non si è familiari, cioè il codice legacy e le librerie;
* Non è molto utile da solo, più come pair programmer.

## Come usare gli LLM
1. Fornisci del contesto all'LLM, dando il codice coinvolto, gli obiettivi, e il framework di test che vuoi usare;
2. Chiedi i casi di test, come happy path, errori, edge case ed eccezioni;
3. Genera i test;
4. Gira i test per vedere se li ha fatti bene (magari non fanno nulla, magari ti ha capito male);
5. Raffinali migliorando coverage e leggibilità.

## Cosa dare in input

### Minimo indispensabile
* Codice da testare;
* Comportamento atteso;
* Framework;
* Versione del linguaggio;
* Vincoli (input automatizzato, mock object, gestione delle eccezioni).
### Aggiunte
* Esempi di coppie input-output;
* Dipendenze da simulare;
* Stile del progetto;
* Altri file del progetto.

## Consigli

* Specifica il framework. Pytest è spesso il migliore.
* Imponi vincoli, come l'assenza di accesso a rete, FS e DB reali.
* Chiedi di coprire errori, edge case e regressioni.
* Fai tanti prompt specifici e iterativi, non una singola grande richiesta generica.

## Rischi

* Assunzioni sbagliate: import, comportamenti, eccezioni inventati;
* Nessun coverage;
* Fragilità: asserzioni troppo specifiche che dipendono dall'implementazione e non dalla funzionalità;
* Test plausibili ma inutili;
* Il modello è un assistente, non una fonte di verità.