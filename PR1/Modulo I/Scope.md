## Settimana 11

Scope: strumenti per la pulizia di pavimenti…?
No. In inglese significa ambito di influenza.

Partiamo da una domanda filosofica: cos’è un nome? Quando si sono cominciati a utilizzare i nomi? Quando si è cominciato ad assegnare qualche tipo di proprietà alle persone.
Avete letto Le Vie dei Canti di Bruce Chatwin? Chatwin ha fatto un viaggio in Australia. Prima del nostro arrivo, era un bellissimo posto. Gli aborigeni avevano un’idea sull’origine del mondo: camminando per le vie dei canti, le persone vedevano cose e le chiamavano, e così cominciavano ad esistere.
Confronta la Bibbia: Dio è il verbo e il verbo è Dio. Verbo, logos, parola razionale.

Un nome è un’entità astratta che fa riferimento a qualcosa di concreto per poter conversare.
I nomi hanno anche un problema: possono essere ambigui.
In quest’aula ci sono tre Niccolò, ma sono distinti dai loro cognomi.
Ci sono tanti Niccolò ma nella famiglia Viale ce n’è uno.
Un cognome è uno scope.
Questo è un concetto proprio dei linguaggi ad alto livello. In quelli a basso livello, si usa la posizione fisica in memoria.

Nei tempi antichi, per identificare una persona si diceva “il secondo figlio di quello che sta nella quarta capanna nel terzo villaggio”.
Poi si trasferisce e succede un casino. Sistema migliore: gli do un nome proprio.
Come evitiamo che ci siano troppi Niccolò nel nostro programma?
[boh non ho capito]

I nomi sono il più potente strumento di astrazione.
Quando creo una persona, il processo di dare un nome legale è molto formale.
In programmazione ancora di più. Nome e oggetto sono binded finché questo oggetto è utilizzabile. Il primo momento di binding è alla progettazione del linguaggio. Tipi, costrutti.
Un binding statico collega un nome a una locazione di memoria.

L’altro meccanismo è il binding basato su stack: nomi visibili solo per una parte della durata del programma. Sembra strano, ma sono le subroutine.
In C e nella maggior parte dei linguaggi di programmazione (in Basic no), gli scope delle subroutine sono separati.

Perché è fondamentale? Se ci fosse conflitto, sarebbe difficile dividere il lavoro. “Io inizio i nomi con la A, tu con la B e lui con la C”. Immagina dover usare un nome diverso da quelli mai usati in tutti i programmi mai fatti prima.
Per fortuna non funziona così.

Dovrebbe ora essere chiaro che main() è una subroutine, con la particolarità che il sistema operativo lo esegue. La sua prima istruzione, per convenzione, è la prima istruzione del programma, il suo punto di ingresso.
È per questo che si chiama main, ed è per questo che deve esserci.
Può esistere un programma che non ha il main(), ma non farebbe nulla.
Ambito testuale (file).
Il C (alcuni altri no) fa definire più subroutine nello stesso file.
I corpi delle subroutine sono sottoambiti testuali.
main() e foo() non possono essere in esecuzione contemporaneamente (per quanto ci riguarda in questo corso).

Fare un programma del tipo:
int main(){
	…
	codice
	…
	int b;
	…
	{
	int b;
	}
	…
}
Non è un errore sintattico, ma non farlo.

In questo caso, lo scope del primo b è solo una parte di main(), e questo rende il codice più difficile da mantenere. In particolare, va da int b a { e da } alla fine di main().

Lo scope del secondo b invece è solo la parte racchiusa tra le graffe.
Questo si chiama mascheramento ed è ancora più perverso dell’altro b.
È ancora più perverso di for(int i=0;...;...), dove lo scope di i è solo il blocco for.


Variabili globali, file scope, definizione di simboli fuori da una subroutine.
Queste cose non sono mai necessarie. In C non sono errori sintattici, ma sono comunque delle porcherie. Sono il risultato della pigrizia, del non avere voglia di capire come fare bene i parametri delle subroutine per passare i valori o i puntatori giusti.
Sono anche un limite enorme: se una volta che il tuo file raggiunge le 1000 righe decidi di  separare il progetto in più file, non stai più passando i parametri e quindi lo scope delle tue variabili locali non include più le subroutine, e devi cambiare tutto ciò che hai già fatto perché adesso vengano passati i riferimenti, esattamente ciò che non hai voluto fare per pigrizia dichiarando variabili globali.
Quindi tanto vale non farlo dall’inizio.