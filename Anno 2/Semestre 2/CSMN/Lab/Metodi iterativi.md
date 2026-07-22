Oggi implementiamo i metodi iterativi.

## Piccolo recap

Abbiamo $Ax=b$, e in questo caso anziché fare esattamente $n$ passi per ottenere il risultato, otteniamo il risultato iterativamente, ad ogni iterazione approssimiamo sempre meglio il risultato.

I metodi che abbiamo visto a lezione sono *metodi lineari stazionari*, dove cioè $x^{(k+1)} = Bx^{(k)}+f$, dove $B$ ed $f$ rimangono uguali (stazionari) ad ogni passo.

Abbiamo visto il metodo di Jacobi e il metodo di Gauss-Seidel.

Perché questi metodi convergano, la matrice $A$ dei coefficienti deve soddisfare certe condizioni.

### Prepariamo la matrice

Condizione sufficiente: $A$ deve essere strettamente diagonalmente dominante, cioè per ogni riga, il valore sulla diagonale deve essere maggiore della somma di tutti gli altri elementi della riga, in valore assoluto.

Generiamo prima quindi una matrice diagonalmente dominante. Per prima cosa estraiamo la diagonale per sottrarla. Poi generiamo la nuova diagonale partendo la somma per ogni riga e aumentandola. Perché $d$ è così? Perché `sum()` fa la somma delle colonne, quindi trasponendo $A$ otteniamo la somma delle righe.
```MatLab
A = randn(5);
D = diag(diag(A));
A = A-D;
d = sum(abs(A'));
d = 2*d;
A = A + diag(d);
```

## Risoluzione di un sistema

### Gauss-Saidel

Creiamo un nuovo file per creare una funzione.

Questa funzione prende in input $A$ e $b$ ovviamente, $x_0$ che sarà il vettore di partenza, $\tau$ che vedremo dopo, e $k_{max}$, il numero massimo di iterazioni dopo il quale assumiamo che non converga.

Facciamo lo split additivo. `A\B` sarebbe $A^{-1}B$. È una sorta di divisione al contrario, dove `A/B` intuitivamente sarebbe $AB^{-1}$.

Controlliamo il raggio spettrale per sapere subito se non converge.

`x_new` contiene $x^{(k+1)}$.

Per controllare se siamo arrivati alla convergenza, vediamo se l'errore relativo tra due vettori è minore di un certo numero molto piccolo, quello che noi abbiamo chiamato $\tau$. Potremmo controllarlo con `norm(x_new-x0)/norm(x0)>tau`, ma al denominatore potremmo avere $0$, quindi moltiplichiamo a destra e a sinistra e otteniamo `norm(x_new-x0)>tau*norm(x0)`.

Usciti dal ciclo, segnaliamo all'utente se ci sono stati problemi.

```MatLab
function [x, k] = gauss_seidel(A, b, x0, tau, kmax)
    % Parametri opzionali
    if nargin < 3 || isempty(x0)
        x0 = zeros(size(b));
    end
    if nargin < 4 || isempty(tau)
        tau = 1e-6;
    end
    if nargin < 5 || isempty(kmax)
        kmax = 1000;
    end

    % Split additivo
    D = diag(diag(A));
    E = -tril(A,-1); % parametro per non prendere la diagonale
    F = -triu(A,1); % il parametro cambia segno

    B = (D-E)\F;
    f = (D-E)\b;

    rho = max(abs(eig(B)));
    if rho >= 1
        error("Il metodo non converge, raggio spettrale %.4f", rho);
    end

    flag = true;
    k = 0;
    x_new = x0;

    while flag
        x0 = x_new;
        k = k+1;
        x_new = B*x0+f;

        flag = k<kmax && norm(x_new-x0)>tau*norm(x0);
    end
    if k >= kmax
        error("Il metodo non converge entro %d iterazioni", kmax)
    end
    x = x_new;
end
```

Abbiamo completamente ignorato la parte in alto. Quando chiamiamo questa funzione, possiamo passare meno di 5 parametri, oppure lasciare vuoto un parametro. In quel caso, possiamo permettere alla funzione di definire dei valori default di quei parametri.

### Jacobi

$B = D^{-1}(E+F)$, $f = D^{-1}b$.

```MatLab
function [x, k] = jacobi(A, b, x0, tau, kmax)
    % Parametri opzionali
    if nargin < 3 || isempty(x0)
        x0 = zeros(size(b));
    end
    if nargin < 4 || isempty(tau)
        tau = 1e-6;
    end
    if nargin < 5 || isempty(kmax)
        kmax = 1000;
    end

    % Split additivo
    D = diag(diag(A));
    E = -tril(A,-1);
    F = -triu(A,1);

    B = D\(E+F);
    f = D\b;

    rho = max(abs(eig(B)));
    if rho >= 1
        error("Il metodo non converge, raggio spettrale %.4f", rho)
    end

    flag = true;
    k = 0;
    x_new = x0;

    while flag
        x0 = x_new;
        k = k+1;
        x_new = B*x0+f;

        flag = k<kmax && norm(x_new-x0)>tau*norm(x0);
    end
    if k >= kmax
        error("Il metodo non converge entro %d iterazioni", kmax)
    end
    x = x_new;
end
```

### Test

Per controllare, possiamo decidere $x$ in anticipo, e trovare $b$ da $Ax$. Così, sappiamo qual è il risultato che ci aspettiamo dalla funzione.

```MatLab
for n = 10:10:100
    % Generiamo una matrice diagonalmente dominante
    A = randn(n);
    D = diag(diag(A));
    A = A-D;
    d = sum(abs(A'));
    d = 2*d;
    A = A + diag(d);

    % Soluzione di esempio
    x = ones(n,1);
    b = A*x;

    % Preparazione dei parametri
    x0 = zeros(n,1);
    tau = 1e-100;
    kmax = 1000;

    % Chiamiamo le funzioni
    [xgs, kgs] = gauss_seidel(A, b, x0, tau, kmax);
    [xj, kj] = jacobi(A, b, x0, tau, kmax);

    % Troviamo l'errore relativo
    err_gs = norm(xgs-x)/norm(x);
    err_j = norm(xj-x)/norm(x);

    % Output
    fprintf("Dimensione %d\n", n);
    fprintf("Gauss-Seidel:\nErrore: %d\nIterazioni: %d\n", err_gs, kgs);
    fprintf("Jacobi:\nErrore: %d\nIterazioni: %d\n", err_j, kj);
    fprintf("\n");
end
```