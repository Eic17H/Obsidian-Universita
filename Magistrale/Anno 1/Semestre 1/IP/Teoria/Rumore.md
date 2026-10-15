---
cssclasses:
  - ip
---
#damettereinordine 

Categorizziamo il rumore sulla base della distribuzione dei valori, la sua PDF (probabilità density function) (vedi #slide). Il rumore gaussiano segue una distribuzione gaussiana, il rumore che boh ha una distribuzione uniforme, e il rumore sale-e-pepe ha solo due valori.

Quella distribuzione si riferisce al rumore puro, che si trova aggiunto a un'immagine. Quindi il rumore è la differenza tra l'immagine rumorosa e l'immagine "pulita".

Il rumore gaussiano è quello più comune nella fase di acquisizione. Il rumore può dipendere sia dall'ambiente, che dalla qualità dei sensori (e anche come sono influenzati dalla temperatura).

Vedremo anche i rumori di tipo: #slide.

## Riduzione

Per ridurre il rumore usiamo dei [[Magistrale/Anno 1/Semestre 1/IP/Teoria/Filtri/Filtri spaziali|filtri spaziali]], per esempio:
* Media aritmetica: somma e poi divisione (norma a 1), l'immagine si sfoca, quindi il rumore si mischia con lo sfondo;
* Media geometrica: prodotto e poi radice (norma a 2), #slide , sfoca meno
* Media armonica: ?????????????????????????????????????????????????????????????????????????????, funziona bene per ridurre il rumore di tipo sale (bianco), ma amplifica il rumore di tipo pepe (nero)
* Media contrarmonica: c'è un parametro (ordine) $Q$, tratta il rumore di tipo sale e pepe, ma a seconda del segno di $Q$ tratta il ==p==epe (==p==ositivo) o ==s==ale (~~negativo~~ ==s==otto zero).

#todo: aggiungi link alle norme (quegli appunti sono anche da mettere in ordine).

Oggi sono fuso (quando mai) quindi questi appunti sono tremendi, ma le slide non sono male e non sta dicendo poi così tanto perché si tratta molto di vedere e descrivere le immagini.

Poi ci sono filtri che nono sono la media:
* Filtro mediana: prende la mediana, utile per contrastare il rumore sale-e-pepe e rumori combinati che lo contengono
* Filtri min e max: stessa logica, ma contrastano rispettivamente sale e pepe
* Alfa-bilanciato (alpha-trimmed): prendiamo un filtro di dimensione $n \times n$, facendo il ranking dei pixel presenti avrò $n \times n$ posizioni, le metto in un vettore dal più piccolo al più grande, ho un parametro $d$, escludo i primi $d/2$ e gli ultimi $d/2$ elementi della classifica, e faccio la media di quelli che rimangono, chiaramente posso anche fare $n \times m$; la media aritmetica è il caso $d=0$, e il filtro mediano è il caso $d=n-1$.