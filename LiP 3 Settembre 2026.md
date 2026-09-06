Dal mese prossimo non ci sarà più Pinna, ma è possibile che gli esami rimangano simili.
## Valutazione

$$\newcommand{\ifthenelse}[3]{\textbf{if } #1 \textbf{ then } #2 \textbf{ else } #3}\newcommand{\letin}[2]{\textbf{let } #1 \textbf{ in } #2}\newcommand{\apply}{\textbf{apply}}\newcommand{\fun}{\textbf{fun}}\newcommand{\too}{\rightsquigarrow}\newcommand{\llangle}{⟪}\newcommand{\rrangle}{⟫}\letin{y=3}{\apply(\apply(\fun(x,x),\fun(z,times(z,2))),y)}$$
### Big step

Ho aggiunto nomi (lettere greche) alle regole per rendere chiaro lo svolgimento. I nomi non sono presenti nelle regole fornite da Pinna e non devono essere inclusi nello svolgimento.

$$\begin{matrix}
\dfrac{}{\langle x, \delta \rangle \to \delta(x)}Α \qquad
\dfrac{}{\langle c, \delta \rangle \to c}Β \qquad
\dfrac{}{\langle \fun(x,t),\delta\rangle\to \fun(x,t)}Γ \\
\dfrac{\langle t_1,\delta\rangle \to v_1 \qquad \ldots\ldots \qquad \langle t_{a_{i}}, \delta \rangle \to v_{a_{i}}}{\langle op_i (t_1, \ldots, t_{a_i}),\delta \rangle \to \widetilde{op}(v_1,\ldots,v_{a_i})}Δ \\
\dfrac{\langle t_0, \delta \rangle \to true \qquad \langle t_1,\delta\rangle\to v}{\langle\ifthenelse{t_0}{t_1}{t_2},\delta\rangle\to v} Ε \qquad
\dfrac{\langle t_0, \delta \rangle \to false \qquad \langle t_2,\delta\rangle\to v}{\langle\ifthenelse{t_0}{t_1}{t_2},\delta\rangle\to v} Ζ \\
\dfrac{\langle t_1,\delta\rangle\to \fun(x,t) \qquad \langle t_2,\delta \rangle \to v' \qquad \langle t,\delta[x/v']\rangle\to v}{\langle \apply(t_1,t_2),\delta \rangle \to v}Η \\
\dfrac{\langle t_1,\delta \rangle \to v_1 \qquad \langle t_2,\delta[x/v_1]\rangle \to v}{\langle \letin{x=t_1}{t_2},\delta\rangle\to v}Θ
\end{matrix}$$
Svolgimento:



<span class="small-latex">$$\dfrac{\dfrac{}{\langle 3, \bot \rangle \to 3}Β \qquad \dfrac{\dfrac {\dfrac{}{\langle \fun(x,x),δ' \rangle \to \fun(x,x)}Γ \qquad \dfrac{}{\langle \fun(z,times(z,2)),δ' \rangle \to \fun(z,times(z,2))}Γ \qquad \dfrac{}{\langle x, δ''\rangle \to \fun(z,times(z,2))}Α}{\langle \apply(\fun(x,x),\fun(z,times(z,2))) , δ' \rangle \to \fun(z, times(z,2))}Η \qquad \dfrac{}{\langle y, δ' \rangle \to 3}Α \qquad \dfrac{\dfrac{}{\langle z, δ''' \rangle \to 3}Α \qquad \dfrac{}{\langle 2 , δ''' \rangle \to 2}Β}{\langle times(z,2), δ''' \rangle \to 6}Δ}{\langle \apply(\apply(\fun(x,x),\fun(z,times(z,2))),y), δ' \rangle \to 6}Η}{\langle\letin{y=3}{\apply(\apply(\fun(x,x),\fun(z,times(z,2))),y)},\bot\rangle \to 6}Θ$$</span>
Dove: $$\begin{matrix*}[l]
δ' = \bot[y/3]
\\ δ'' = δ'[x/\fun(z,times(z,2))]
\\ δ''' = δ'[z/3]
\end{matrix*}$$
<div style="break-after: page;"></div>

### Small step

L'ho fatta male, quindi riporto solo le regole.$$\begin{matrix}
\dfrac{}{\llangle x, \Delta \rrangle \too \llangle top(\Delta)(x),\Delta\rrangle}(1) \qquad
\dfrac{}{\llangle\textbf{op}_i(v_1,\ldots,v_{a_i}),\Delta\rrangle\too\llangle v, \Delta \rrangle}(2) \\
\dfrac{\llangle t_j, \Delta \rrangle \too \llangle t'_j, \Delta' \rrangle}{\llangle \textbf{op}_i(v_1,\ldots,v_{j-1},t_j,\ldots,t_{a_i}),\Delta \rrangle \too \llangle \textbf{op}_i(v_1,\ldots,v_{j-1},t'_j,\ldots,t_{a_i}),\Delta'\rrangle}(3) \\
\dfrac{}{\llangle \ifthenelse{true}{t_1}{t_2},\Delta\rrangle\too\llangle t_1,\Delta\rrangle}(4) \qquad
\dfrac{}{\llangle\ifthenelse{false}{t_1}{t_2},\Delta\rrangle\too\llangle t_2,\Delta\rrangle}(5) \\
\dfrac{\llangle t_0, \Delta \rrangle \too \llangle t_0', \Delta' \rrangle}{\llangle\ifthenelse{t_0}{t_1}{t_2},\Delta\rrangle\too\llangle\ifthenelse{t_0'}{t_1}{t_2},\Delta'\rrangle}(6) \\
\dfrac{}{\llangle\apply(\fun(x,t),v),\Delta\rrangle\too\llangle funblock(t),push(top(\Delta)[x/v]),\Delta\rrangle}(7) \\
\dfrac{\llangle t_1, \Delta \rrangle \too \llangle t_1', \Delta' \rrangle}{\llangle\apply(t_1,t_2),\Delta\rrangle\too\llangle \apply(t_1',t_2),\Delta'\rrangle}(8) \\
\dfrac{\llangle t_2, \Delta \rrangle \too \llangle t_2', \Delta' \rrangle}{\llangle \apply(\fun(x,t),t_2),\Delta\rrangle\too\llangle \apply(\fun(x,t),t_2'),\Delta'\rrangle}(9) \\
\dfrac{\llangle t,\Delta\rrangle \too \llangle t',\Delta'\rrangle}{\llangle funblock(t),\Delta\rrangle\too\llangle funblock(t'),\Delta'\rrangle}(10) \qquad
\dfrac{}{\llangle funblock(v),\Delta\rrangle\too\llangle v,pop(\Delta)\rrangle}(11) \\
\dfrac{\llangle t_1, \Delta \rrangle \too \llangle t_1', \Delta' \rrangle}{\llangle \letin{x=t_1}{t_2},\Delta\rrangle\too\llangle \letin{x=t_1'}{t_2},\Delta\rrangle}(12) \\
\dfrac{}{\llangle \letin{x=v}{t},\Delta\rrangle\too\llangle funblock(t),push(top(\Delta)[x/v],\Delta)\rrangle}(13)
\end{matrix}$$
<div style="break-after: page;"></div>

## Grammatica

Linguaggio:$$\{a^nb^mc^k\ |\ 2k=n+m\ \land\ n\text{ pari}\}$$
Grammatica:$$G = (\{S,A\},\{a,b,c\},\mathcal{P},S)$$
$$\mathcal P = \left\{ \begin{matrix*}[l]
S \to aaSc\ |\ A\ |\ ε
\\ A \to bbAc\ |\ ε
\end{matrix*} \right.$$
<div style="break-after: page;"></div>

## Tipizzazione

### Tipo
$$((int \to bool)*int)\to bool$$
### Termine

$$\lnot apply(fst(x),snd(x)+1)$$

### Inferenza

Il tipo dell'esame è quasi identico a quello che ha usato come esempio, quindi ho copiato l'esempio con poche modifiche senza aver capito l'argomento.

![[Pasted image 20260823012008.png]]