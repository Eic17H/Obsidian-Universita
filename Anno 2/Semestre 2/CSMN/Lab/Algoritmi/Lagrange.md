---
cssclasses:
  - csmn
---
Ci troviamo tutti i valori di $L$, e poi facciamo la combinazione lineare.

Il denominatore non dipende da $x$, quindi ci calcoliamo prima tutti i denominatori.

```MatLab
function yy = lagrint(x,y,xx)
	x = x(:);
	y = y(:);
	
	n = length(x);
	if length(y) ~= n
		error("Dimensioni diverse per x e y")
	end
	
	% Troviamo i denominatori
	
	den = zeros(n,1);
	for j=1:n
		den(j) = prod(x(j)-x([1:j-1,j+1:end]));
	end
	
	m = size(xx);
	yy = zeros(m,1);
	
	% Troviamo i numeratori: x-xk
	
	% Dividiamo per xk per toglierlo
	for i=1:m
		num = prod(xx(i)-x)./(xx(i)-x);
		
		L = num./den;
		
		yy(i) = y'*L;
	end
	
	plot(x,y,"or", xx,yy,"b-");
	legend("dati da interpolare","polinomio interpolante");
```