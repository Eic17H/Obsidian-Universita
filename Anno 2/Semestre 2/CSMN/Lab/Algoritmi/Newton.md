---
cssclasses:
  - csmn
---
L'approccio è un po' diverso: si parte da un singolo valore, $x_0$, e lo si aggiorna iterativamente con la formula:$$x^{(k+1)} = x^{(k)} - \dfrac{f(x^{(k)})}{f'(x^{(k)})}$$
Ci si ferma se l'ordinata è minore della tolleranza, se il valore di $x$ nelle due iterazioni è cambiato poco, o se si è superato il numero massimo di iterazioni.

Ci si ferma se:
* L'ordinata è minore o uguale alla tolleranza, $f(x)\leqτ$;
* Il valore di $x$ è cambiato poco nelle ultime due iterazioni, $\dfrac{|x^{(k+1)}-x^{(k)}|}{|x^{(k)}|}\leqτ$;
* Si è superato il numero massimo di iterazioni.

Questo metodo non si può usare se la derivata si annulla in $x_0$, o in qualunque $x^{(k)}$ durante l'esecuzione.

I parametri sono la funzione di cui vogliamo trovare la radice, la derivata di quella funzione, $x_0$, $τ$ e $k_{max}$.

```MatLab
function [x,k] = newton(fun, fund, x0, tau, kmax)
	k = 0;
	
	f0 = fun(x0);
	if abs(f0)<tau
		x = x0;
		return;
	end
	
	fd = fund(x0)
	if abs(fd)<1e-100
		error("La derivata in x0 si annulla")
	end
	
	k = 1;
	x_new = x0 - (f0/fd);
	flag = 1;
	
	while flag
		k = k+1;
		xk = x_new;
		fk = fun(xk);
		fd = fund(xk);
		
		if abs(fd)<1e-100
			error("La derivata si annulla")
		end
		
		x_new = xk - (fk/fd);
		
		% Per stabilità numerica, moltiplichiamo anziché dividere
		flag = (abs(fun(x_new))>tau) && (abs(x_new-xk)>abs(xk)*tau) && (k<kmax);
	end
	
	if k>kmax
		warning("troppe iterazioni")
		x = inf;
	else
		x = x_new;
	end
end
```

Questo metodo ha delle varianti. Generalizzando la formula come $x^{(k+1)} = x^{(k)} - \dfrac{f(x^{(k)})}{m_k}$, possiamo considerare il metodo di Newton come un caso specifico in cui $m_k=f'(x^{(k)})$. Possiamo quindi derivarne altri metodi variando la formula da cui otteniamo $m_k$: [[Secanti]] e [[Corde]].