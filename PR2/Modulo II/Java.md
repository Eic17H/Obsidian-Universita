## Installazione

Useremo [[Terminale di Linux - cheatsheet|Ubuntu]], Java e GEdit.
* Ci serve JVM (Java Virtual Machine), e quindi dobbiamo scaricare il pacchetto da JRE (Java Runtime Edition). Con questo si esegue Java già compilato.
* Per sviluppare ci serve anche il compilatore, il JDK (Java Development Kit).

Queste cose vanno sapute all'esame.
* "Per sviluppare codice Java serve la JRE": <span class="rosso">**falso**</span>, serve la JDK.
* "Per eseguire bytecode Java serve la JDK": <span class="rosso">**falso**</span>, serve la JRE o la JDK, una delle due.

Ci serve Java almeno versione 1.8 (anche detto Java 8).


* Controlliamo se abbiamo Java dal terminale: `java -version`
  * Se non c'è, te lo dice
* Le JDK sono sviluppate da più compagnie, e chiunque può crearne una
  * Noi usiamo la OpenJDK, va bene anche quella di oracle
* Se ce l'hai installato devi controllare che sia installato anche il compilatore: `javac -version`
* Controlliamo anche che ci sia gedit: scrivi "`gedit`", se parte c'è
  * Per installare sia Java che GEdit: `sudo apt install default-jdk gedit`
* La password dei computer del laboratorio dovrebbe essere "`Studente`"
* Può essere utile aggiornare la lista dei pacchetti con "`sudo apt-get update`" se non funziona