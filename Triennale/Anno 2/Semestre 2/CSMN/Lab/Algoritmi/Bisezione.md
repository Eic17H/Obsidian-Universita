---
cssclasses:
  - csmn
---
Questo algoritmo ha cinque parametri: la funzione di cui vogliamo una radice, gli estremi $a$ e $b$ dell'intervallo nel quale si trova la radice che vogliamo trovare, una tolleranza detta $τ$ e il numero massimo di iterazioni, $k_{max}$.

Assumendo che la funzione sia continua, per il teorema di Bolzano-Weierstrass, se i valori della funzione in $a$ e in $b$ sono discordi, allora è sicuro che una radice si trovi in quell'intervallo. In caso contrario, l'algoritmo genera un errore.

Un'ordinata minore o uguale a $τ$ è considerata nulla.

Ad ogni iterazione, il punto medio di $[a, b]$, detto $c$, viene scelto come nuovo estremo, sostituendo quello concorde a $c$. Alla fine dell'algoritmo, $c$ è la radice.
<div style="break-after: page;"></div>

```MatLab
function [x,k] = bisec(fun, a, b, tau, kmax)
	% Controllo degli estremi e del punto medio
	fa = fun(a);
	fb = fun(b);
	if fa*fb> 0
		error("Non è garantito che ci sia una radice nell'intervallo [a,b]")
	end
	c = (a+b)/2;
	fc = fun(c);
	if abs(fc)<tau
		x = c
		return;
	end
	% Iterazioni
	flag = 1;
	k = 0;
	while flag
		k = k+1;
		if fa*fc<0
			b = c;
			fb = fc;
		else
			a = c;
			fa = fc;
		end
		
		c = (a+b)/2;
		fc = fun(c);
		
		flag = (abs(a-b)>tau) && abs(fc)>tau && (k<kmax);
	end
	if(k>=kmax) % Superato il numero massimo di iterazioni
		x = inf;
		warning("Non è stata trovata una soluzione");
	elseif(abs(fc)<tau) % Trovata una radice
		x = c;
	else % I due estremi sono uguali
		x = (a+b)/2;
	end
end
```