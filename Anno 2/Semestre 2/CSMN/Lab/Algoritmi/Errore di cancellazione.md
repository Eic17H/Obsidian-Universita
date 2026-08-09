---
cssclasses:
  - csmn
---
Proviamo a fare un limite:$$\lim\limits_{x\rightarrow0}\dfrac{1-\cos(x)}{x^2}=\dfrac12$$

```MatLab
for i=-1:-1:-10
    x = 10^i;
    y = (1-cos(x))/x^2
end
```

Se lo eseguissimo, il risultato sarebbe $0$. Questo è dovuto all'errore di cancellazione: $1-cos(x)$ diventa talmente piccolo da diventare $0$ come numero di macchina. La soluzione è di riformulare la formula per evitare quel numero piccolo.$$\lim\limits_{x\rightarrow0} \dfrac12\left(\dfrac{\sin\left(\dfrac x2\right)}{\dfrac x2}\right)^2$$
```MatLab
for i=-1:-1:-10
    x = 10^i;
    y = 1/2*(sin(x/2)/(x/2))^2
end
```

<div style="break-after: page;"></div>
