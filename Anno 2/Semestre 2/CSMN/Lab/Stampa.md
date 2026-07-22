Il `;` non è obbligatorio. Però, di default i comandi stampano il risultato, il punto e virgola impedisce la stampa. Si impedisce perché è computazionalmente lenta.

Stampa:
* Un metodo semplice è appunto non mettere il `;`: `x`.
* Un altro modo è `disp(x)`, formattata: `disp("Il valore di x è "+x)`.
* La stampa formattata simile al C si fa con `fprintf()`: `fprintf("x = %d", x)`. `%d %f \n`.
* Per prendere valori in input si usa `input()`: `x = input("Inserisci un valore");`.