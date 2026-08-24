---
cssclasses:
  - fdi
---
# Overflow

Usiamo 3 bit per fare $4+5=9$.

|       |   $1$   | $0$ | $0$ | $+$ |
| :---: | :-----: | :-: | :-: | :-: |
|       |   $1$   | $0$ | $1$ | $=$ |
| $(1)$ |   $0$   | $0$ | $1$ |     |
|       | $4+5=1$ |  <  |  <  |     |

Ma è sbagliato.
Questo è perché 9 va oltre 3 bit.
Questo fenomeno si chiama overflow.
Devo usare parole con abbastanza bit per rappresentare anche il risultato.

Facciamolo con 4 bit ma [[Complemento|con segno]]:

|       | $0$ |      $1$       | $1$ | $1$ | $+$ |
| :---: | :-: | :------------: | :-: | :-: | :-: |
|       | $0$ |      $1$       | $1$ | $0$ | $=$ |
| $(1)$ | $1$ |      $1$       | $0$ | $1$ |     |
|       |     | $+7 + +6 = -5$ |  <  |  <  |     |

|       | $1$ |      $1$       | $1$ | $1$ | $+$ |
| :---: | :-: | :------------: | :-: | :-: | :-: |
|       | $1$ |      $1$       | $1$ | $0$ | $=$ |
| $(1)$ | $0$ |      $1$       | $0$ | $1$ |     |
|       |     | $-7 + -6 = +5$ |  <  |  <  |     |

Addirittura sommando due numeri concordi otteniamo un cambio di segno.
In realtà questa assurdità ci aiuta a notare che c'è stato un overflow.