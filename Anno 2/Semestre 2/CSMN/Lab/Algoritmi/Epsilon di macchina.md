---
cssclasses:
  - csmn
---
Equivale a trovare un certo $ε$ tale che $1+ε>1$.

```MatLab
e = 1;
while 1+e/2>1
    e = e/2;
end
disp("L'epsilon di macchina è "+e)
disp("L'epsilon secondo MatLab è "+eps)
```

Teoria: [[Aritmetica di macchina]]