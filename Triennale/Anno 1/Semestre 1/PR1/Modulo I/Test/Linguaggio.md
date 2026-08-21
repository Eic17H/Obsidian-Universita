

#linguaggio
Tra l’altro, i simboli matematici sono un linguaggio formalizzato solo dal ‘600, e ancora oggi non sono 100% univoci: la moltiplicazione ha \*, •, ×, e il nulla, la divisione ha :, ÷, /, –.
Prima si scriveva tutto a parole! Confrontiamo la lunghezza:
∀i∈Dx, …
Per ogni i divisore di x, …
Quando si parla di un linguaggio formale, “univocamente interpretabile” è sottinteso.

#linguaggio
Molti termini dei linguaggi di programmazione sono presi da lingue naturali, perlopiù dall’inglese. È per questo che in C troviamo “if() else” e non “profl()”, semplicemente fa comodo a noi perché è una parola familiare.

Ci sono linguaggi compilati e linguaggi interpretati.
Nei linguaggi compilati, come il C, viene prima controllato il codice per vedere se ha un significato logico, poi viene tutto tradotto in linguaggio macchina, e poi viene eseguito.
Nei linguaggi interpretati, si traduce, si esegue, traduci, esegui, sul momento.
I linguaggi interpretati erano passati di moda, ma poi python li ha salvati.


#linguaggio
L’architettura dei computer di oggi non è quella di 70 anni fa.
Abbiamo preferito adattare la programmazione ai nostri cervelli piuttosto che il contrario.

Ci sono tre tipi di linguaggi:
Linguaggi naturali: hanno circa 40mila parole, spesso di significato ambiguo, che è la parte difficile, ma la punteggiatura si può usare “a orecchio”;
Linguaggi formali di alto livello: la parte difficile è che hanno regole strette, ma hanno circa 30 o 40 parole, e assecondano l’essere umano;
Linguaggi formali di basso livello: hanno regole strette e poche parole, ma non assecondano l’essere umano e sono più simili al linguaggio macchina.
Ci sono anche altri elementi, come l’ortografia, la sintassi e il lessico.

In generale, i linguaggi umani hanno un lessico complesso ma sintassi semplice, mentre i linguaggi di programmazione hanno un lessico semplice, con pochissime parole chiave, e una sintassi complessa con regole strette.

Un neonato conosce poche parole. Sa esprimere concetti, ma sono concetti semplici espressi in modo semplice.

Si creano nuovi linguaggi di programmazione per adattarsi alle nuove caratteristiche delle macchine.


#linguaggio
Quando programmiamo in un linguaggio di alto livello, creiamo un programma che da solo è inutilizzabile, in quanto non c’è una macchina che possa comprenderlo: non è il linguaggio macchina di nessuna macchina.
Serve dunque un processo di traduzione.

“int main() …” è comprensibile per un essere umano.
“10110100101110100” è comprensibile per un computer.
Dobbiamo trovare un codice in linguaggio macchina che sia equivalente, cioè che abbia lo stesso contenuto semantico, del nostro codice in linguaggio di alto livello.
Se facciamo un programma in pascal, e facciamo un programma windows, un programma mac, e uno linux che siano equivalenti al nostro originale, e dunque, per proprietà transitiva, equivalenti tra di loro.

Spesso bisogna aggiustare qualcosa nell’adattare un programma ad altri sistemi operativi, ma grazie ai linguaggi ad alto livello non bisogna cambiare molto.

Ci sono due tipi di errore: un errore di compilazione è dovuto a un codice scritto male, un errore al runtime è dovuto a un ragionamento sbagliato.
C’è un tipo di file, un programma oggetto (file.o), scritto in linguaggio macchina, che però non è eseguibile.

#linguaggio
Grazie ai linguaggi di alto livello, non devo più sprecare tempo a capire il linguaggio macchina, basta risolvere il problema logico.
Nuovo problema: come ragiona l’essere umano?
Scomponiamo un problema in tanti problemi piccoli.
Lo facciamo sempre istintivamente, la nostra mente funziona così.
Scomponiamo un’azione in singoli passaggi, e i passaggi in piccoli movimenti.

Per convenzione, qui si scrive da sinistra a destra.
Se la programmazione fosse nata 1000 anni fa, quando i più colti erano gli arabi, programmeremmo da destra a sinistra.
I programmatori arabi sanno adattarsi a scrivere sia un una direzione che nell’altra.

Se ti dico “fai 12 passi”, non fai lo stesso passo 12 volte, ti “muovi”, perché cambi la condizione di partenza (lo stato del sistema).

Un linguaggio di programmazione deve poter:
Descrivere le istruzioni in modo ordinato;
Selezionare tra due branche di codice secondo una condizione;
Iterare dei comandi cambiando lo stato iniziale;
Noi lo facciamo sempre, ma senza formalizzare questi passaggi.
Nei linguaggi di programmazione introduci costrutti che fanno queste tre cose.
I programmi hanno un punto di inizio e almeno uno di fine.

#linguaggio
Non esiste il concetto di “questo si può programmare solo in C/C++/C#/JS/Java/…”.
Esiste “questo è più facile da programmare in C/…”. Al tuo datore di lavoro non importa.

C ha caratteristiche dei linguaggi di basso livello che non ci aspettiamo da uno ad alto livello.
C può accedere a certe parti dell’architettura della macchina che non dovrebbero essere accessibili ai linguaggi ad alto livello.
Vi può accedere perché dovevano farci un sistema operativo.
Ma per questo motivo, C non è 100% portabile.
Il programmatore ha “troppo potere”, quindi C è più adatto agli esperti.
C di base non può neanche gestire input e output, usa delle librerie per farlo.
Eppure, è il primo linguaggio che si insegna, perché lo usano tutti.
(Questo ci porta alla differenza tra istruzioni del linguaggio e istruzioni delle librerie, più tardi)

Secondo il professor Scateni, Pascal è un ottimo linguaggio per uso didattico.
C’è solo un problema con Pascal: è inutile.
Non lo usa nessuno.
C si usa perché è utile, è molto usato e lo sono anche i suoi derivati, è pieno di ottimi compilatori di C, quindi c’è poco da cambiare per il porting.


#linguaggio
Il compilatore capisce se la sintassi è giusta. Solo la sintassi.
Si può descrivere la sintassi di un linguaggio naturale (vedi anche slide).
Lo stesso si può fare per un linguaggio formale, e c’è una notazione specifica per farlo.
BNF: Backus e Naur si sono resi conto che serviva un sistema.
\<reale> e \<cifra> sono categorie sintattiche.
“blu”, “ligneo”, “3” eccetera sono simboli terminali.
Per esempio:
\<attribuzione> ::= \<gruppo_nominale> è \<aggettivo>;
\<aggettivo> ::= blu|rosso|basso|ligneo|…;
Dove “::=“ significa “può essere” e “|” significa “o”, la congiunzione.
L’insieme delle regole della sintassi di una lingua è detto grammatica.
[Regole dalle slide]
Per costruire una frase partiamo dal basso (voglio un reale) e andiamo in alto (32.21).

|         3         |    2     |  .  |         2         |    1     |
| :---------------: | :------: | :-: | :---------------: | :------: |
|     \<cifra>      | \<cifra> |  .  |     \<cifra>      | \<cifra> |
| \<sequenza_cifre> |    <     |  .  |     \<cifra>      | \<cifra> |
| \<sequenza_cifre> |    <     |  .  | \<sequenza_cifre> |    <     |
|     \<reale>      |    <     |  <  |         <         |    <     |


12 non è un reale.
È così che il compilatore decide come tradurre un numero da caratteri a linguaggio macchina (vedi FDI, rappresentazione dei numeri interi e razionali).
Lessico: insieme dei simboli e dei termini.

I modelli linguistici generativi generano linguaggio da:
Sintassi;
Vocabolario;
Informazioni esterne.
[Vedi slide col diagramma ad albero etc]
G=(T, N, P, S)


#vedioriginale
Sintassi
Semantica
La tenda
V
V
Lo tenda
V
X

”Lo tenda” al compilatore va bene, siamo noi che dobbiamo controllare la semantica.
Secondo la sintassi, “lo tenda” è giusto perché è “\<articolo> \<nome>”.


#linguaggio
Una frase di senso compiuto è una frase il cui significato è contenuti nella frase stessa.
Abbiamo imparato il nostro linguaggio naturale copiando gli altri e poi imparando le regole.
Per fortuna, per imparare i linguaggi di programmazione non si fa così, si studia prima tutta la parte formale, e poi si comincia a usarlo.
Costruiamo una frase, che nei linguaggi di programmazione è un programma.
Quando abbiamo solo simboli terminali abbiamo finito di costruire la frase.
“La tenda” e “lo tenda” sono entrambi sintatticamente corretti.
Ma, il secondo non ha senso semantico.

Nella programmazione, la parte facile è correggere la sintassi, quella difficile è controllare che la semantica sia corretta, cioè ciò che voglio.
Non c’è semantica oggettivamente corretta, dipende da cosa voglio che faccia.
Alla sintassi ci pensa il compilatore.
Come si fa per la semantica?
Si controllano tutte le combinazioni input-output?
Certo, ma no, questo metodo è solitamente impossibile.
Inferno. Non c’è una risposta, mi dispiace.
Il compito di un bravo compilatore è fare un programma che sia facile da testare.
C’è tutto un ramo di studi per questa cosa.

Per la sintassi, usiamo un grafo sintattico. [vedi slide]
È ancora più facile imparare il lessico.
È il contrario delle lingue naturali, dove la sintassi è semplice e il lessico è difficile.
Gli identificatori, essendo stati scelti dai progettatori dei del linguaggio di programmazione, non possono essere usati dal programma stesso.
Gli identificatori (o nomi) sono le parole del linguaggio. In C ce ne sono 33.
Tutti i linguaggi di programmazione sono così. Quello con più parole è Ada, sviluppato negli anni ‘70 dalla difesa statunitense per essere il miglior linguaggio per la sicurezza. Oggi lo usano solo loro. È il linguaggio con più parole riservate e ne ha 110.
Tra l’altro, in C ci sono più operatori che identificatori. Alcuni sono inutili per noi però.

Quando il compilatore vede “/\*”, ignora tutto e cerca un “\*”. Se lo trova, se dopo c’è un “/“, riprende a compilare, altrimenti continua a ignorare.
Questo testo, ignorato dal compilatore, racchiuso tra “/\*” e “\*/“, si chiama commento.

{
	etc…
}

Questo, racchiuso tra parentesi graffe, è un blocco di codice

#linguaggio
Calx (sasso) -> calculus (sassolino) -> calcolo renale, calcolo (sassolino dell’abaco).
Anche adesso, anche coi computer, calcolare è contare.
“Il computer sa fare…” = La macchina è progettata per fare…

Mettere gli operatori infissi non è legge, è convenzione.
Se li mettessimo prefissi o postfissi, non servirebbero le parentesi, non servirebbe la precedenza degli operatori, si leggerebbe sempre da sinistra a destra.
La precedenza degli operatori è una proprietà implicita.
Se esiste, complichi la realizzazione del compilatore.

Il C nasce per avere un compilatore semplice, eppure ha operatori infissi.
Più si va avanti, più i linguaggi di programmazione si fanno simili al linguaggio umano.