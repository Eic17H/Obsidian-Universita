`plot(x,y)`: vettore ascisse, vettore ordinate.

Esempio:
```MatLab
x = 0:0.1:10;
y = cos(x);
plot(x,y)
```

Possiamo anche aggiungere stile usando altri parametri:
```MatLab
plot(x,y, "LineWidth",3, "Color",[1,0.5,0.1], "LineStyle","--")
```
Linea di spessore 3, arancione, tratteggiata.

Per aggiungere un altro grafico insieme, passiamo altre coordinate, però mantiene lo stesso stile:
```MatLab
plot(x,sin(x),x,cos(x))
```

Per dare stili diversi, dobbiamo creare un altro grafico, chiamando di nuovo `plot()`. Però lo mette in un riquadro separato. Per metterli insieme, usiamo `hold on`:
```MatLab
plot(...)
hold on
plot(...)
```

Possiamo anche mettere un titolo e una legenda:
```MatLab
title("Funzioni seno e coseno")
legend("coseno, seno)
```