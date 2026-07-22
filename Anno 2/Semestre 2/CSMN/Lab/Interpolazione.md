Abbiamo dei punti, e vogliamo generare una funzione che passa per tutti quei punti.

## Interpolazione polinomiale/canonica

La teoria l'abbiamo vista a lezione di teoria, non faccio in tempo a riscriverla.

```MatLab
function yy = canint(x,y,xx)
	% Ci assicuriamo che x e y siano vettori colonna
	x = x(:);
	y = y(:);
	
	% Vediamo la dimensione
	n = length(x);
	if length(y) ~= n
		error("Dimensioni diverse per x e y")
	end
	
	% Generiamo la matrice
	x = zeros(n);
	for j = 1:n
		X(:,j) = x.^(j-1);
	end
	
	a = X\y;
	
	yy = zeros(length(xx), 1);
	for i = 1:length(xx)
		s = 0;
		for k = 1:n
			s = s+a(k)*xx(i)^(k-1);
		end
		yy(i)=s;
	end
	
	plot(xx,yy,"b", x,y,"ro")
end
```

## Lagrange

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

## Main

```MatLab
f = @(x) 1./(1+25*x.^2);

n = 20;
xx = linspace(-1,1,500);

yy = f(xx);

plot(xx,yy,"b-", "DisplayName","Funzione da interpolare");
xlabel("X");
ylabel("Y");
legend show;

% Adesso dobbiamo campionare i punti

% Equidistanti
x_eq = linspace(-1,1,n+1);
y_eq = f(x_eq);
canint(x_eq,y_eq,xx);
lagrint(x_eq,y_eq,xx);

% Altrimenti usiamo i nodi di Chebychev
k = (0:n)';
x_ch = cos((2*k+1)./(2*(n+1))*pi);
y_ch = f(x_ch);
canint(x_ch,y_ch,xx);
lagrint(x_ch,y_ch,xx);
```