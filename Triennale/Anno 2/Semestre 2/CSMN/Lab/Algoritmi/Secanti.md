---
cssclasses:
  - csmn
---
Il metodo delle secanti è una variante del metodo di Newton in cui $m_k=\dfrac{f(x^{(k+1)})-f(x^{(k)})}{x^{(k+1)}-x^{(k)}}$.

Non c'è più bisogno di passare la derivata della funzione come parametro, però ci sono due valori di partenza come il metodo di bisezione.

```MatLab
function [x,k] = secanti(fun, x0, x1, tau, kmax)
	k = 0;
	
	f0 = fun(x0);
	if abs(f0)<tau
		x = x0;
		return;
	end
	
	f1 = fun(x1);
	if abs(f1)<tau
		x = x1;
		return;
	end
	
	% Usiamo il reciproco di m per non dividere due volte
	mrec = (x1-x0)/(f1-f0);
	if abs(f1-f0)<1e-100
		error("Il denominatore si annulla")
	end
	
	k = 1;
	x_new = x1 - (f1*mrec);
	flag = 1;
	
	while flag
		k = k+1;
		x0 = x1;
		x1 = x_new;
		f0 = fun(x0);
		f1 = fun(x1);
		
		mrec = (x1-x0)/(f1-f0);
		if abs(f1-f0)<1e-100
			error("Il denominatore si annulla")
		end
		
		x_new = x1 - (f1*mrec);
		
		% Per stabilità numerica, moltiplichiamo anziché dividere
		flag = (abs(fun(x_new))>tau) && (abs(x_new-x1)>abs(x1)*tau) && (k<kmax);
	end
	
	if k>kmax
		warning("troppe iterazioni")
		x = inf;
	else
		x = x_new;
	end
end
```