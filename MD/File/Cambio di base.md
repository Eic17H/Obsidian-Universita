---
cssclasses:
  - md
---
Lo stesso argomento: <span class="fdi">[[FDI/File/Basi numeriche|FDI]]</span>, <span class="csmn">[[CSMN/Teoria/Rappresentazione dei numeri/Basi numeriche|CSMN]]</span>

Una domanda sarà su questo.

Stessa cosa già vista con Puglisi.

Per convertire in base 10, moltiplica ogni cifra per una potenza della base, poi somma.
$ABC,DEF_{11} = A×11^2 + B×11 + C + D×11^{-1} + E×11^{-2} + F×11^{-3}$.

Per convertire dalla base 10, ci vogliono più passaggi.
* Separa la parte intera da quella decimale.
* Dividi la parte intera per la nuova base, ripetutamente.
* Il resto ottenuto ogni volta è una cifra, si parte dalle unità.
* Il quoziente intero è il nuovo numero che sarà diviso.
* Continua finché non arrivi a $0$.
* La parte decimale, che sarà qualcosa del tipo “$0,32776$”, va invece moltiplicata.
* La nuova cifra delle unità, anche se è $0$, è la prossima cifra nella sequenza.
* Se non è $0$, rendila $0$ prima di continuare.
* Continua finché non hai le cifre richieste o non arrivi a $0$.

Esempio:

$\color{red}15$$\color{white},$$\color{pink}4375$ in base $\color{lightblue}2$:

$\color{red}15$$\color{white}/$$\color{lightblue}2$ $\color{white}=$ $\color{orange}7$$\color{white}r$$\color{blue}1$
$\color{orange}7$$\color{white}/$$\color{lightblue}2$ $\color{white}=$ $\color{yellow}3$$\color{white}r$$\color{blue}1$
$\color{yellow}3$$\color{white}/$$\color{lightblue}2$ $\color{white}=$ $\color{lightgreen}1$$\color{white}r$$\color{blue}1$
$\color{lightgreen}1$$\color{white}/$$\color{lightblue}2$ $\color{white}=$ $\color{white}0$$\color{white}r$$\color{blue}1$

$\color{white}0,$$\color{pink}4375$$\color{white}×$$\color{lightblue}2$ $\color{white}=$ $\color{blue}0$$\color{white},$$\color{lightorange}8750$
$\color{white}0,$$\color{lightorange}8759$$\color{white}×$$\color{lightblue}2$ $\color{white}=$ $\color{blue}1$$\color{white},$$\color{lightyellow}750$
$\color{white}0,$$\color{lightyellow}75$$\color{white}×$$\color{lightblue}2$ $\color{white}=$ $\color{blue}1$$\color{white},$$\color{lightgreen}50$
$\color{white}0,$$\color{lightgreen}5$$\color{white}×$$\color{lightblue}2$ $\color{white}=$ $\color{blue}1$$\color{white},$$\color{white}0$

$\color{blue}1111$$\color{white},$$\color{blue}0111$