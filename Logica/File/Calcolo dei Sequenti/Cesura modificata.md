La cesura è scomoda. Vediamo una modifica.

Supponiamo di avere una regola in cui si possiamo fare una cesura di questo tipo:$$\dfrac{Γ\RightarrowΔ,a \qquad a,Π\RightarrowΣ}{Γ,Π \Rightarrow Δ,Σ}cut*$$
Adesso il contesto può essere diverso. Sembra più generale, sembra ci permetta di dedurre più cose, e invece dimostriamo che è equivalente a $cut$. Come? Assumiamo le premesse di $cut$ e dimostriamole usando $cut*$, poi il converso, assumiamo le premesse di $cut*$ e dimostriamole usando $cut$.
$$\dfrac
{Γ\RightarrowΔ,a \qquad a,Γ\RightarrowΔ}
{Γ,Γ\RightarrowΔ,Δ}cut*$$Tipico caso in cui possiamo usare la contrazione. Vero? Falso. $Γ$ e $Δ$ sono sequenze, quindi $Γ,Γ$ può essere $p,q,p,q$, lì non si può fare la contrazione. Semplice, usiamo lo scambio$$\dfrac{\dfrac
{Γ\RightarrowΔ,a \qquad a,Γ\RightarrowΔ}
{Γ,Γ\RightarrowΔ,Δ}cut*}
{Γ\RightarrowΔ}cs,cd,ss,sd$$Abbiamo già finito.

Proviamo il converso. Non possiamo usare subito la cesura perché i contesti sono diversi, che possiamo risolvere con l'indebolimento.$$\dfrac
{
\dfrac
{Γ\RightarrowΔ,a}
{Γ,Π\RightarrowΔ,Σ,a}is,id,ss,sd
\qquad
\dfrac
{a,Π\RightarrowΣ}
{a,Γ,Π\RightarrowΔ,Σ}is,id,ss,sd}
{Γ,Π\RightarrowΔ,Σ}cut$$
Le due cesure sono, per motivi che sarebbe lungo spiegare, sono dette additiva e moltiplicativa.

Notiamo come, per dimostrare l'equivalenza di queste due regole, sono necessarie le regole di indebolimento, contrazione e scambio. Senza quelle tre, le cesure sarebbero completamente distinte. Infatti, in altre logiche è importante quale definizione della cesura usiamo, come nella logica lineare.