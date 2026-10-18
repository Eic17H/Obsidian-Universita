I test hanno tre componenti principali:
* `require`, che sono le condizioni senza le quali il test viene scartato
* Il codice
* `assert`, che sono le condizioni senza le quali il test non passa

In certi commenti, probabilmente per versioni vecchie dei linguaggi, vediamo invece cose del tipo "condizioni delle require `=>` condizioni degli assert". Scritto così, somiglia un pochetto al <span class="logica">[[calcolo dei sequenti]]</span>, e un po' è così. La differenza è che gli assert devono passare tutti, quindi abbiamo la congiunzione da entrambi i lati.

In un certo altro senso, se chiamiamo le require $P$, il codice $K$ e gli assert $A$, abbiamo concettualmente $P \vdash K \to A$, che abbiamo visto essere equivalente a $\vdash P \Rightarrow K \to A$.

Questo chiaramente ci torna, sapendo quello che sappiamo sui sequenti e sull'implicazione. In più, vediamo che se $P$ è falso, allora il test è vero qualunqe siano $K$ ed $A$, vale a dire, se nessuna require passa allora il test passa ma è vacuo.