---
cssclasses: rc
---
I quattro timer del livello di trasporto in [[TCP]].

La lunghezza del timer è decisa da un algoritmo dinamico, vedi [[SRTT]].

Il più importante è l'**==RTO==** (retransmission timeout). Si invia un segmento. Se si riceve un $ACK$, tutto ok, se invece scade l'RTO prima dell'$ACK$ allora il segmento si ritrasmette e il timer si resetta.

Poi c'è il ==**timer di persistenza**==, che ci dice quante volte reiterare un'azione, per evitare uno stallo. Per esempio, se il ricevente invia un $ACK$ con [[Finestra ACK|finestra]] a $0$ e chiede al mittente di aspettare, poi il mittente aggiorna la finestra, ma il pacchetto dell'aggiornamento si perde. Il mittente sta aspettando il ricevente e viceversa. Starebbero fermi all'infinito se non fosse per il timer. Quando scade, il mittente manda una sonda (*window probe*) per guardare se la finestra è ancora a $0$, perché se non lo è, può riprendere a inviare dati, altrimenti era fatto di proposito e riparte il timer. (mi sembra un po' confuso).

**==Timer keep alive==**. Quando una connessione è inattiva da un po', scade il timer, e uno dei due chiede all'altro se c'è ancora. Se c'è ancora, bene, altrimenti termina la connessione. Però ha degli svantaggi, perché aggiunge carico di lavoro e *può terminare una connessione attiva a causa di una partizione temporanea della rete*.

**==Timed wait==**. Faccio copia e incolla direttamente, è strano. Può essere stimato su singole comunicazioni ed è l’ultimo timer utilizzato da ogni connessione TCP nello stato $\text{TIMED WAIT}$ appunto. Il suo conteggio prosegue per un tempo pari al doppio del tempo di vita massimo del pacchetto, per garantire che alla chiusura di una connessione tutti i pacchetti creati siano stati rimossi.