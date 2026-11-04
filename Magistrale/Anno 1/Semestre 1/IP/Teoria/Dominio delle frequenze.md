---
cssclasses:
  - ip
---
## Concetto

Di solito, abbiamo una matrice di pixel e ad ogni elemento associamo un reale o un intero che ne rappresenta l'intensità:$$I(x,y)=\text{intensity}$$
Invece nel dominio delle frequenze, abbiamo ampiezza e fase in funzione delle frequenze spaziali:$$F(w_x,w_y)=(\text{amplitude},\text{phase})$$
E lo trattiamo come numero immaginario, perché anche quelli possono essere considerati come fase e ampiezza.

Le funzioni sono onde, e le onde sono funzioni. Un'onda monodimensionale ha un valore dell'ordinata per ogni valore dell'ascissa, e come ascissa si considera il tempo, per esempio un'onda audio, e si può rappresentare come somma di molte sinusoidi con fase e ampiezza diverse. In un'onda bidimensionale, cioè un'immagine, la coppia in input è le coordinate del pixel in cui vogliamo guardare.

Se fissiamo una coordinata, per esempio $x=1$, possiamo vedere una <span class="am">[[Vincoli|slice]]</span> di un'immagine bidimensionale come onda monodimensionale.

![[Pasted image 20261104110757.png]]

## Fourier

Fourier trovò modi per rappresentare funzioni in funzione di funzioni trigonometriche.

* **==Serie di Fourier==**: qualunque funzione che si ripete periodicamente si può esprimere come somma di seni e coseni con frequenze e pesi diversi.
* **==Trasformata di Fourier==**: qualunque funzione non periodica ma con area finita sotto la curva si può esprimere come integrale di seni e/o coseni con frequenze e pesi diversi.

Rappresentare un'onda sotto forma di serie o trasformata permette di eseguire trasformazioni che la restaurano.

### Funzione armonica

Una funzione armonica si esprime come:$$y = A\sin(\omega x + \phi)\qquad y = A \cos (\omega x + \phi)$$
Dove:
* $A$ è l'ampiezza, la distanza massima dall'equilibrio (che noi consideriamo come $0$), espressa in decibel ($dB$).
* $\omega$ è la frequenza angolare, quante volte si ripete per intervallo di tempo, espressa in radianti al secondo ($rad/s$)
* $T$ è il periodo, quanto ci mette a ripetersi espresso in secondi, e $\omega = 2 \pi / T$.
* $\phi$ è la fase, che è $0$ se la funzione parte all'inizio della funzione trigonometrica, altrimenti ci dice quanto è scostata dall'inizio, e $2\pi$ è un ciclo completo.
![[Pasted image 20261104111822.png]]

![[Pasted image 20261104111833.png]]

Appunto, le serie di Fourier esprimono le funzioni periodiche come somme di funzioni armoniche:

![[Pasted image 20261104111928.png]]

## Dominio delle frequenze

Abbiamo appunto visto che possiamo scomporre un segnale in una somma di funzioni armoniche, e abbiamo rappresentato questa somma nel dominio temporale (che è come il dominio spaziale).

Abbiamo una lista di funzioni armoniche, ciascuna con una frequenza e un'ampiezza. Ognuna quindi ha due valori: la frequenza e l'ampiezza. Facciamo un piano cartesiano, usiamo la frequenza come $x$ e l'ampiezza come $y$. Non ci sono due punti con la stessa $x$, perché risulterebbero in un nuovo punto con la stessa $x$ e la somma delle due $y$, quindi è una relazione induttiva, quindi è una funzione. Appunto, questo è il dominio delle frequenze.

![[Pasted image 20261104113429.png]]

Possiamo fare lo stesso per le funzioni non periodiche, perché possiamo rappresentarle come integrali di somme di funzioni armoniche (per le funzioni $f(x)$ tali che $\int_{-\infty}^{\infty}|f(x)|$ è finito).

Possiamo vedere la trasformata di Fourier come <span class="alf">[[Funzioni di secondo ordine|funzione di secondo ordine]]</span>.

Non ho voglia di digitare tutto, lo farò più avanti, #todo 
![[Pasted image 20261104114420.png]]

No dai è tantissimo, lo farò a casa, #slide.

I concetti sono il fatto che il risultato è complesso, quindi possiamo applicare funzioni come lo spettro (modulo), la fase, e lo spettro potenza che è il quadrato dello spettro.

Poi le slide spiegano come computare la trasformata decidendo la precisione, che somiglia alla serie di Taylor. #todo 

In 2D invece la formula è mostruosa.

Poi spiega casi specifici e filtri.