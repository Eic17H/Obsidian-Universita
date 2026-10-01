Eldarica è un model checker per le [[clausole di Horn]], Numerical Transition Systems e programmi software.

## Cos'è

### Clausole di Horn

Le clausole di horn sono delle proposizioni formate solo da disgiunzioni e negazioni, in cui le negazioni sono applicate a letterali e non a proposizioni composte. Quindi, sono della forma $\lnot A \lor B \lor \lnot C$, ma non $\lnot(A \lor \lnot B) \lor C$.

L'altro vincolo è che uno e solo uno dei letterali deve essere vero, tutti gli altri devono essere falsi.

Queste due proprietà le rendono equivalenti a implicazioni il cui conseguente è formato solo da una lettera proposizionale $\lnot A \lor B \lor \lnot C$ equivale a $A \lor \lnot B \to C$.

## Cosa fa