Risolviamo un sistema generando una serie di soluzioni parziali che si avvicinano sempre di più a quello vero.

## Bisezione

Partiamo da un intervallo chiuso in cui la funzione è continua, i cui estremi, come ascisse, hanno ordinate di segno discorde nella funzione che stiamo considerando. Per il teorema di Bolzano-Weierstrass, in questo intervallo c'è uno zero della funzione. Quindi prendiamo il punto medio, e lo prendiamo come estremo; quello che teniamo tra i due estremi vecchi è quello discorde. Continuiamo finché non diventa più piccolo di un valore $τ$ tolleranza che definiamo a priori, o se l'ordinata al punto medio è minore di $τ$, o se il numero di iterazioni ha superato la soglia $k$ definita a priori.

```MatLab
function [x,k] = bisec(fun, a, b, tau, kmax)
```

Tra i parametri c'è una funzione che non abbiamo mai visto: una funzione passata come variabile. In MatLab si fa con i puntatori a funzione, che si scrivono con la `@`. Per esempio, `fun = @sin`, stiamo assegnando una funzione a una variabile. Di per sé è inutile stiamo creando un alias.

Un altro modo più utile per usarle è creare delle funzioni anonime: `fun = @(x) sin(x)+cos(x)`, creiamo un puntatore a una funzione che non abbiamo definito in un file a parte.

Tornando a noi

```MatLab
function [x,k] = bisec(fun, a, b, tau, kmax)
	% Controllo
	fa = fun(a);
	fb = fun(b);
	if fa*fb> 0
		error("Non è garantito che ci sia una radice nell'intervallo [a,b]")
	end
	
	% Punto medio e controllo
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
	
	% Errori
	if(k>=kmax)
		x = inf;
		warning("Non è stata trovata una soluzione");
	elseif(abs(fc)<tau)
		x = c;
	else
		x = (a+b)/2;
	end
end
```

## Metodo di newton

L'approccio è un po' diverso: si parte da un singolo valore, $x_0$, e lo si aggiorna iterativamente con la formula:$$x^{(k+1)} = x^{(k)} - \dfrac{f(x^{(k)})}{f'(x^{(k)})}$$
Ci si ferma se l'ordinata è minore della tolleranza, se ... vedi #slide.

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
		flag = (abs(x_new-xk)>abs(xk)*tau) && (k<kmax) && (abs(fun(x_new))>tau);
	end
	
	if k>kmax
		warning("troppe iterazioni")
		x = inf;
	else
		x = x_new;
	end
end
```

## Usarle

Vediamo lo script. Facciamo la funzione, la derivata, e il plot.

```MatLab
f = @(x) cos(4.*x) + 2.*x - 1;
fd = @(x) sin(4.*x)*4 +2;

x = linspace(-3,3,100);
y = f(x);

figure;
hold on;
plot(x,y,"-r");
title("Funzione f");
xlabel("X");
ylabel("Y");

[xb,kb] = bisec(f,0,1,1e-10,1e3);
[xn,kn] = newton(f,fd,1,1e-10,1e3);

% ob = cerchio blu
plot(xb,f(xb), "ob", "MarkerSize", 10, "DisplayName", "bisec");
plot(xn,f(xn), "or", "MarkerSize", 10, "DisplayName", "newton");

plot(x,zeros(size(x)), "-b");
hold off;
```

## Per casa (= per la relazione)

Implementare anche secanti e corde.