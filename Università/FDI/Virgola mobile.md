Coi numeri normali, non scriviamo $1250000000$ e $0,0000125$, scriviamo $125·10^7$ e $125·10^{-7}$.
Un qualsiasi numero è $±x_{n-1}···x_1x_0,y_{-1}y_{-2}···y_{-m}·B^{±···a_1a_0}$, segno, mantissa ed esponente intero.
Lo stesso vale per la codifica digitale dei numeri.
Vogliamo che la codifica sia univoca. Renderla univoca è il processo di normalizzazione.
Si normalizza la mantissa. Per esempio a $125·10-7$ si preferisce $0,125·10^{-4}$.
Un altro elemento è la polarizzazione dell'esponente. Vedi le slide.

Ragioniamo prima in base 10. Usando 2 cifre per l'esponente andiamo da 00 a 99.
Per andare in negativo, diciamo che “$00$” significa $-50$ e “$99$” significa $+49$.
Avviciniamoci alla verità in binario.
1 bit per il segno, 7 bit per l'esponente, 24 bit per la mantissa, 32 bit in totale.
Essenzialmente:
Rappresenti in virgola fissa;
Lo rappresenti in notazione esponenziale normalizzata: $0,100110…·2^x$;
All'esponente aggiungiamo (decodifica) o sottraiamo (codifica) 64 (in questo caso).
Ci sono due casi in cui ci sono problemi:
Non bastano i bit della mantissa: anziché float uso double;
Non bastano i bit dell'esponente: overflow.
Coi numeri grandi è un problema. Coi numeri piccoli, $1·2^{-65}$, che va in underflow, è quasi $0$.

La mantissa non comincia mai con $0$, per definizione. In binario, l'unica altra opzione è $1$.
Questo ci dà un vantaggio: visto che è ridondante, possiamo ometterlo e sarà sempre sottinteso, così risparmiamo due bit di spazio e possiamo essere più precisi.

Per l'esponente si usano i numeri da $000…01$ a $111…10$, quindi gli estremi no.
Il modulo più piccolo che si può rappresentare è $1·2^{minimo}$.
Visto che diamo per scontato che cominci con “$0,1$”, non possiamo rappresentare $0$.
Quindi si riserva un numero fatto completamente di “$00000000$” per il valore $0$.

Per la somma, se devi sacrificare (arrotondare) un bit, sacrifica quello meno significativo.
Non cambia molto tra $0,2718281828459045$ e $0,271828182845904$.
Per il prodotto invece:
Ok le mantisse le moltiplico.
Se sommo direttamente gli esponenti ho $E_1+k+E_2+k$, ma voglio $E_1+E_2+k$.
Devo stare attento a questa cosa.
Lo stesso vale per la divisione.