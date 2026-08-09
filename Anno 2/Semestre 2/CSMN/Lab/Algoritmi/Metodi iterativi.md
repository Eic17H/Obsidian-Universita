---
cssclasses:
  - csmn
---
Teoria: [[Anno 2/Semestre 2/CSMN/Teoria/Sistemi lineari/Metodi iterativi]]

Ne vediamo due: [[Anno 2/Semestre 2/CSMN/Lab/Algoritmi/Gauss-Seidel|Gauss-Seidel]] e [[Anno 2/Semestre 2/CSMN/Lab/Algoritmi/Jacobi|Jacobi]]

Entrambe le funzioni prendono in input $A$ e $b$, il vettore di partenza $x_0$, la tolleranza $τ$, e $k_{max}$, il numero massimo di iterazioni dopo il quale assumiamo che non converga.

Controlliamo il raggio spettrale per sapere subito se non converge.

Per sapere se siamo arrivati alla convergenza, controlliamo se l'errore relativo tra due vettori è minore di un certo numero molto piccolo, quello che noi abbiamo chiamato $\tau$. Potremmo controllarlo con `norm(x_new-x0)/norm(x0)>tau`, ma al denominatore potremmo avere $0$, quindi moltiplichiamo a destra e a sinistra e otteniamo `norm(x_new-x0)>tau*norm(x0)`.

Usciti dal ciclo, segnaliamo all'utente se ci sono stati problemi.