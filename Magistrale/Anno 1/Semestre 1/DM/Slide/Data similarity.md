Possiamo parlare di somiglianza e distanza. Sono due modi opposti per descrivere la stessa cosa: la somiglianza va da $0$ (diverso) a $1$ (uguale), e basta. La distanza invece può non avere un limite, più è bassa più sono simili, e deve soddisfare non-negatività, identità, simmetria e disuguaglianza triangolare.

Boh guarda, boh. Slop su slop su slop, sembra una pubblicità.

![[Pasted image 20261116071639.png]]

Formula matematica insensata, che cosa stai provando a dire?????$$D(x,y)=\dfrac{\sum_K w_K \delta _K (x_K,y_K)}{\sum_K w_K}$$Rendiamoci conto che non significa nulla. Gli unici simboli definiti sono $D$ (distanza) e $w_K$ (peso della feature $K$). Come fa tutto (tutto) ad avere $K$ al pedice? Quando fai la... Io ci provo. Immaginiamo che $\delta_K(x_K,y_K)$ sia `x.K - y.K`. Ok ma comunque non ha senso dividere per $\sum_K w_K$. No non ha un senso.

Come calcoli la distanza tra due punti? Immagina semplicemente un piano cartesiano, c'è la distanza taxicab, la distanza euclidea e la distanza di Chebyshev. Non è importante per l'esame di sicuro, ma è interessante vedere che vengono tutte dalla stessa formula, ma con un parametro che è $1$, $2$ e $\infty$ rispettivamente, infatti mi sa che sono come le norme matriciali.

Se per ogni dato hai due valori, per esempio età e stipendio. Metti che hai tre punti, $A$ $B$ $C$. Se consideri solo l'età, $A$ è più vicino a $C$. Se consideri solo lo stipendio, $B$ è più vicino a $C$. In totale, chi è più vicino? Dipende dalla scala, dipende da cosa consideri "1 unità" nei due campi.

Se li consideri come punti su un piano cartesiano, e consideri i punti come vettori, puoi confrontare la somiglianza in modulo o in angolo. E poi puoi anche considerare la correlazione.

E nel caso binario? Immagina che per ogni dato hai $n$ campi binari. Se vuoi confrontare due dati, prendi un campo alla volta: hai quattro casi, che sono $00$, $01$, $10$ e $11$. Tendenzialmente vuoi vedere se l'occorrenza di una combinazione particolare ha qualche significato. Ottieni quattro valori per ogni coppia di dati, che chiamiamo $f_{00}$ e così via, e questo valore è "quante volte compare $00$?". Da lì le slide ci danno queste due formule:
* Simple Matching Coefficient: $(f_{11}+f_{00})/n$, un confronto di uguaglianza vero e proprio.
* Coefficiente di Jaccard; $f_{11}/(f_{11}+f_{10}+f_{01})$, ignora le assenze doppie, da usare quando sono frequenti.

E poi c'è la somiglianza di Gower, che è essenzialmente quella formula stupida di prima.

Non ho capito questa cosa:

![[Pasted image 20261116073432.png]]