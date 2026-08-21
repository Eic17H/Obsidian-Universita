---
cssclasses:
  - csmn
---
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