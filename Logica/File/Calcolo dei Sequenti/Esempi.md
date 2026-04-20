# De Morgan

$\vdash_{PK} \; \Rightarrow ¬(p \lor q) \rightarrow ¬p \land ¬q$

$$\dfrac{¬ (p \lor q) \Rightarrow ¬p \land ¬q}{\Rightarrow ¬ (p \lor q) \rightarrow ¬p \land ¬q}\rightarrow d$$
Questa era semplice. Ora che facciamo? Smontiamo l'antecedente o il conseguente? Smontando la negazione porto a destra e non ramifico, smontando la congiunzione a destra ramifico, mi duplica dell'informazione. In questo caso vedremo che poco cambia, ma in generale è meglio non ramificare. Smontiamo la negazione.$$\dfrac{\dfrac{\dfrac{\dfrac{\Rightarrow p, q, ¬p \land ¬q}{\Rightarrow ¬p \land ¬q, p, q}sd}{\Rightarrow ¬p \land ¬q, p \lor q}\lor d}{¬ (p \lor q) \Rightarrow ¬p \land ¬q}¬s}{\Rightarrow ¬ (p \lor q) \rightarrow ¬p \land ¬q}\rightarrow d$$
Guarda, da qui è semplice capire come continuare ma difficile digitare, mi sto abituando.

# Legge di Frege

Vediamolo con le variabili per ora, visto che non abbiamo ancora quel teorema.

$\vdash_{PK} \; \Rightarrow (p \rightarrow (q \rightarrow r)) \rightarrow ((p \rightarrow q)\rightarrow(p \rightarrow r))$

Cominciamo: $${\Rightarrow (p \rightarrow (q \rightarrow r)) \rightarrow ((p \rightarrow q)\rightarrow(p \rightarrow r))}$$L'unico connettivo presente è l'implicazione, quindi ci servono perlopiù le sue regole, più eventualmente le regole strutturali.

Come ho ottenuto questa formula? L'unica regola strutturale possibile è uhh non ho sentito. Vediamo l'introduzione dell'implicazione, perché se abbiamo l'implicazione a destra facciamo sempre così. Il lato sinistro è concettualmente simile al lato delle assunzioni.$$\dfrac{p \rightarrow (q \rightarrow r) \Rightarrow (p \rightarrow q)\rightarrow(p \rightarrow r)}{\Rightarrow (p \rightarrow (q \rightarrow r)) \rightarrow ((p \rightarrow q)\rightarrow(p \rightarrow r))}\rightarrow d$$Rifacciamo, ricordando che quello che spostiamo va sempre a sinistra:$$\dfrac
{\dfrac{\dfrac{p,\;(p \rightarrow q),\;p \rightarrow (q \rightarrow r) \Rightarrow r}{(p \rightarrow q),\;p \rightarrow (q \rightarrow r) \Rightarrow(p \rightarrow r)}\rightarrow d}
{p \rightarrow (q \rightarrow r) \Rightarrow (p \rightarrow q)\rightarrow(p \rightarrow r)}\rightarrow d}
{\Rightarrow (p \rightarrow (q \rightarrow r)) \rightarrow ((p \rightarrow q)\rightarrow(p \rightarrow r))}
\rightarrow d$$Quando facciamo più scambi, li condensiamo, Il professore fa una doppia riga ma non so come farla qui: $$\dfrac
{\dfrac{\dfrac
{\dfrac{p\rightarrow(q \rightarrow r),\;p,\;p \rightarrow q \Rightarrow r}{p,\;(p \rightarrow q),\;p \rightarrow (q \rightarrow r) \Rightarrow r}ss}
{(p \rightarrow q),\;p \rightarrow (q \rightarrow r) \Rightarrow(p \rightarrow r)}\rightarrow d}
{p \rightarrow (q \rightarrow r) \Rightarrow (p \rightarrow q)\rightarrow(p \rightarrow r)}\rightarrow d}
{\Rightarrow (p \rightarrow (q \rightarrow r)) \rightarrow ((p \rightarrow q)\rightarrow(p \rightarrow r))}
\rightarrow d$$Adesso devo ramificare, perché non ho più niente da smontare. Ricordiamo di copiare il contesto ogni volta:$$\dfrac{\dfrac{\dfrac{\dfrac{\dfrac{p, p\rightarrow q \Rightarrow r,p\enspace \enspace \enspace q \rightarrow r,\;p,\;p \rightarrow q \Rightarrow r}{p\rightarrow(q \rightarrow r),\;p,\;p \rightarrow q \Rightarrow r}}
{p,\;(p \rightarrow q),\;p \rightarrow (q \rightarrow r) \Rightarrow r}ss}
{(p \rightarrow q),\;p \rightarrow (q \rightarrow r) \Rightarrow(p \rightarrow r)}\rightarrow d}
{p \rightarrow (q \rightarrow r) \Rightarrow (p \rightarrow q)\rightarrow(p \rightarrow r)}\rightarrow d}
{\Rightarrow (p \rightarrow (q \rightarrow r)) \rightarrow ((p \rightarrow q)\rightarrow(p \rightarrow r))}
\rightarrow d$$
A sinistra, semplice, abbiamo la stessa variabile a sinistra e a destra, sappiamo già come farlo, chiudiamo senza neanche pensarci. Perché? Ripensiamo all'esempio del matematico che rimette la padella nel cassetto. Non la ricordi? Scacchi. A un certo punto, puoi renderti conto che la partita è in una posizione in cui il tuo avversario, se gioca perfettamente (e sai che gioca perfettamente), può garantire una vittoria, quindi ammetti la sconfitta senza continuare fino alla fine. Qui è la stessa cosa, da qui sappiamo che si può fare ma non lo facciamo perché sarebbe inutile. Chiudiamo.$$\dfrac{\dfrac{\dfrac{\dfrac{\dfrac{p, p\rightarrow q \xRightarrow{\times} r,p \enspace \enspace \enspace q \rightarrow r,\;p,\;p \rightarrow q \Rightarrow r}{p\rightarrow(q \rightarrow r),\;p,\;p \rightarrow q \Rightarrow r}}{p,\;(p \rightarrow q),\;p \rightarrow (q \rightarrow r) \Rightarrow r}ss}{(p \rightarrow q),\;p \rightarrow (q \rightarrow r) \Rightarrow(p \rightarrow r)}\rightarrow d}{p \rightarrow (q \rightarrow r) \Rightarrow (p \rightarrow q)\rightarrow(p \rightarrow r)}\rightarrow d}
{\Rightarrow (p \rightarrow (q \rightarrow r)) \rightarrow ((p \rightarrow q)\rightarrow(p \rightarrow r))}
\rightarrow d$$
Per non faticare con la notazione, creiamo un altro albero per il ramo destro:$$\dfrac{}{q \rightarrow r,\; p,\; p \rightarrow q \Rightarrow r}$$Dobbiamo di nuovo ramificare:$$\dfrac{
p, \; p \rightarrow q \Rightarrow r,\;q
\enspace \enspace \enspace
r,\;p,\;q \rightarrow q \Rightarrow r
}{q \rightarrow r,\; p,\; p \rightarrow q \Rightarrow r}$$A destra abbiamo un altro uovo fritto$$\dfrac{
p, \; p \rightarrow q \Rightarrow r,\;q
\enspace \enspace \enspace
r,\;p,\;q \rightarrow q \xRightarrow{\times} r
}{q \rightarrow r,\; p,\; p \rightarrow q \Rightarrow r}$$Ramo sinistro:$$\dfrac{
\dfrac
{
\dfrac
{p \xRightarrow{\times} r,\;q,\;p \enspace \enspace \enspace
q,\;p \xRightarrow{\times} r,\;q}
{p \rightarrow q,\;p \Rightarrow r,\;q}
}
{p, \; p \rightarrow q \Rightarrow r,\;q}ss
\enspace \enspace \enspace
r,\;p,\;q \rightarrow q \xRightarrow{\times} r
}{q \rightarrow r,\; p,\; p \rightarrow q \Rightarrow r}$$
E abbiamo finito.

Per divertimento, l'albero tutto insieme:

$$\dfrac
{\dfrac{\dfrac
{\dfrac
{\dfrac{

p, p\rightarrow q \xRightarrow{\times} r,p
\enspace \enspace \enspace
{
\dfrac{

\dfrac
{
\dfrac
{p \xRightarrow{\times} r,\;q,\;p \enspace \enspace \enspace
q,\;p \xRightarrow{\times} r,\;q}
{p \rightarrow q,\;p \Rightarrow r,\;q}

}


{p, \; p \rightarrow q \Rightarrow r,\;q}ss


\enspace \enspace \enspace
r,\;p,\;q \rightarrow q \xRightarrow{\times} r
}{q \rightarrow r,\; p,\; p \rightarrow q \Rightarrow r}
}

}{p\rightarrow(q \rightarrow r),\;p,\;p \rightarrow q \Rightarrow r}}
{p,\;(p \rightarrow q),\;p \rightarrow (q \rightarrow r) \Rightarrow r}ss}
{(p \rightarrow q),\;p \rightarrow (q \rightarrow r) \Rightarrow(p \rightarrow r)}\rightarrow d}
{p \rightarrow (q \rightarrow r) \Rightarrow (p \rightarrow q)\rightarrow(p \rightarrow r)}\rightarrow d}
{\Rightarrow (p \rightarrow (q \rightarrow r)) \rightarrow ((p \rightarrow q)\rightarrow(p \rightarrow r))}
\rightarrow d$$
Mancano ovviamente i nomi delle regole.

# Legge di esportazione

Possiamo di nuovo fare vuoto, sequenza, qualcosa, ma partiamo da una versione già parzialmente smontata.$$
p \lor q \rightarrow r \Rightarrow p \rightarrow (q \rightarrow r)
$$Adesso, condensiamo già due passaggi in uno, che nuovamente non so scrivere ma ci andrebbe la doppia riga:$$
\dfrac
{q, \; p, \; p \land q \rightarrow r \Rightarrow r}
{p \lor q \rightarrow r \Rightarrow p \rightarrow (q \rightarrow r)}
\rightarrow d
$$Perché in quest'ordine? Last in first out. di nuovo doppia riga che non posso fare:$$
\dfrac
{\dfrac
{p \lor q \rightarrow r, \; q, \; p \Rightarrow r}
{q, \; p, \; p \land q \rightarrow r \Rightarrow r}
ss
}
{p \lor q \rightarrow r \Rightarrow p \rightarrow (q \rightarrow r)}
\rightarrow d
$$E poi ramifichiamo.$$
\dfrac
{\dfrac
{
\dfrac
{
q,\;p \Rightarrow r, p\land q
\enspace \enspace \enspace
r,\;q,\;p \xRightarrow{\times}r
}
{p \lor q \rightarrow r, \; q, \; p \Rightarrow r}
\rightarrow s
}
{q, \; p, \; p \land q \rightarrow r \Rightarrow r}
ss
}
{p \lor q \rightarrow r \Rightarrow p \rightarrow (q \rightarrow r)}
\rightarrow d
$$Adesso a sinistra abbiamo una bella congiunzione, tanto per cambiare, quindi ramifichiamo:$$\dfrac{\dfrac{\dfrac{{\dfrac{q,\;p \xRightarrow{\times} r,\;p\enspace \enspace \enspace q,\;p \xRightarrow{\times} r,\;q}{q,\;p \Rightarrow r, p\land q}Λd}\enspace \enspace \enspace r,\;q,\;p \xRightarrow{\times}r}{p \lor q \rightarrow r, \; q, \; p \Rightarrow r}\rightarrow s}{q, \; p, \; p \land q \rightarrow r \Rightarrow r}ss}{p \lor q \rightarrow r \Rightarrow p \rightarrow (q \rightarrow r)}\rightarrow d$$
