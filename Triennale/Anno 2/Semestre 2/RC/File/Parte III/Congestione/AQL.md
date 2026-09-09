---
cssclasses:
  - rc
---
Average queue length, lunghezza media coda. Utilizzato nella [[RED]].

I router RED usano un filtro passa-basso (low-pass filter) per il calcolo dell'AQL. Se c'è un cambiamento repentino, questo non influisce immediatamente sulla media, invece deve durare un po' perché la media cambi molto.

È una media dinamica pesata esponenziale (EWMA - Exponential Weighted
Moving Average):$$avg' = (1-w_q)\cdot avg+w_qq$$Dove il peso $w_q$ è una costante del tempo.

Ci sono un sacco di cose incomprensibili a pagina 172. Essenzialmente dice che è importante scegliere un buon valore per $w_q$, un buon valore indicativo è $0.002$.