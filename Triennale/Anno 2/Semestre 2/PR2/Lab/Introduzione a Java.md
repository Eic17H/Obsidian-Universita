---
cssclasses: pr2
---
Useremo Ubuntu, Java e GEdit.
Ci serve JVM, e quindi dobbiamo scaricare il pacchetto da JRE. Con questo si esegue Java già compilato.
Per sviluppare ci serve anche il compilatore, il JDK.
Java Virtual Machime Java Runtime Edition, Java Development Kit.
Queste cose vanno sapute all'esame.
"Per sviluppare codice Java serve la JRE" falso, serve la JDK.
"Per eseguire bytecode Java serve la JDK" falso, serve la JRE o la JDK, una delle due.
Ci serve Java almeno versione 1.8 (anche detto Java 8).

Controlliamo se abbiamo Java dal terminale: `java -version`.
Se non c'è, te lo dice.
Le JDK sono sviluppate da più compagnie, e chiunque può crearne una.
Noi usiamo la OpenJDK, va bene anche quella di Oracle.
Se ce l'hai installato devi controllare che sia installato anche il compilatore: `javac -version`.
Controlliamo anche che ci sia GEdit: scrivi `gedit`, se parte c'è.
Per installare sia Java che GEdit: `sudo apt install default-jdk gedit`.
La password dei computer del laboratorio dovrebbe essere "Studente".
Può essere utile aggiornare la lista dei pacchetti con `sudo apt-get update` se non funziona.

## Consigli vari da lezioni varie


`String + int` = `String`. Per esempio `"io" + 1` = `"io1"`.
`print()` non va a capo, `println()` va a capo. Possiamo anche andare a capo a mano.

`Integer` è una classe *wrapper*. Con `Integer.parseInt()` trasformo una stringa in un intero.
Per farti stampare gli assert non passati, fai `java -ea NomeClasse`.
Non puoi fare `equals()` coi tipi primitivi.

Se fai un costruttore di una sottoclasse, non mettere all'inizio `super()`, quindi il costruttore vuoto della superclasse, perché viene richiamato in automatico, quindi se lo metti di nuovo potrebbero decidere di penalizzarti.

La `filter()` prende come parametro un metodo bool. Se non si può applicare a tutti gli elementi, non compila. Per esempio con superclassi e interfacce quello non è scontato. Se tutti gli oggetti sono dello stesso tipo, il metodo è d'istanza, altrimenti è statico. Quella è la frase da ricordare. Essenzialmente se non è statico non lo puoi usare su tutti.