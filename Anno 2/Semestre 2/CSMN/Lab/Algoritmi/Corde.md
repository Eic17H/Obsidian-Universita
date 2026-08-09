---
cssclasses:
  - csmn
---
In questo caso, il valore di $m$ è scelto a priori e non cambia tra un'iterazione e l'altra. Deve quindi essere passato come parametro. 
```MatLab
function [x,k] = corde(fun, m, x0, tau, kmax)
	k = 0;
	f0 = fun(x0);
	if abs(f0)<tau
		x = x0;
		return;
	end
	if abs(m)<1e-100
		error("Il denominatore si annulla")
	end
	k = 1;
	x_new = x0 - (f0/m);
	flag = 1;
	while flag
		k = k+1;
		x0 = x_new;
		f0 = fun(x0);
		x_new = x0 - (f0/m);
		% Per stabilità numerica, moltiplichiamo anziché dividere
		flag = (abs(fun(x_new))>tau) && (abs(x_new-x0)>abs(x0)*tau) && (k<kmax);
	end
	if k>kmax
		warning("troppe iterazioni")
		x = inf;
	else
		x = x_new;
	end
end
```