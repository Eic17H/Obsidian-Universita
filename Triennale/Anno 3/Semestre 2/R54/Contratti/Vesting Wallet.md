---
cssclasses:
  - r54
---
non so come tenere conto dell'errore di arrotondamento. non lo so. non lo so. csmn dovrebbe avermelo insegnato ma non l'ho capito. ho prvoato a bruteforce ma mi esce errore potenzialmente infinito, non lo so. devo capirlo meglio, ma non sono abbadtanza intelligenge. basta.

queso è il mio ragionamento

> How to correct for integer truncation
> 
> Let $a$, $b$ and $c$ be three timestamps such that $start<a<b<c<end$.
> Let $T$ be the constant `totalAllocation`, let $D=end-start$.
> Assume $start=0$, thus $end=D$.
> Let $v()$ be `vestingSchedule()`:
>      $v(x) := Tx/D$.
> Let $x=v(a), y=v(b), z=v(c)$.
> 
> If we're dealing with real numbers, then we want:
>      $(a-b)/(x-y) === (b-c)/(y-z)$
>      $(a-b)*(y-z) === (b-c)\cdot(x-y)$
> 
> Let's consider integer $v(x)$, that is, $⌊v(⌊x⌋)⌋$.
>      $⌊Ta⌋=Ta$, but $⌊Ta/D⌋\neq Ta/D$
>      We need an upper bound for $Ta/D-⌊Ta/D⌋$.
>          Call that upper bound E, we'll have:
>              $abs((a-b)\cdot(y-z)-(b-c)\cdot(x-y)) < E$
>      How do we compute $E$ in Solidity?
>      Looking back at all of this, this doesn't make sense, as $E<1$.
>      Could the error just be $4$?
>      I think the problem is that I assumed $start=0$;
> 
> Assume $start = S$
> $v(x) := T\cdot(x-S)/D$
> What's the error now?
> I just feel like it's still $4$ (of course I checked it and it's wrong).
> I'm just gonna test it in C.
> The test gives $1$ as maximum error.
> I did it wrong. What's at most 1 is $abs((a-b)\cdot(y-z)-(b-c)\cdot(x-y))/T$.
> Actually very rarely it's $>1000$.

Questo è il codice C bruttissimo che ho usato:

```C
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <math.h>

int start;
int duration;
int end;

int vestingSchedule(int totalAllocation, int timestamp) {
    if (timestamp < start) {
        return 0;
    } else if (timestamp > start + duration) {
        return totalAllocation;
    } else {
        return (totalAllocation * (timestamp - start)) / duration;
    }
}

float vestingScheduleFloat(int totalAllocation, int timestamp) {
    if (timestamp < start) {
        return 0;
    } else if (timestamp > start + duration) {
        return totalAllocation;
    } else {
        return ((float) (totalAllocation * (timestamp - start))) / ((float) duration);
    }
}

int main() {
    srand(time(0));

    start = abs(rand())%0xFFFF;
    duration = abs(rand())%0xFFFF;
    end = start+duration;

    printf("%d, %d, %d\n", start, duration, end);

    int totalAllocation = abs(rand())%0xFFFF;

    int e;

    float prod;

    float taError, sError, eError;

    for(int i = 0; i<1000; i++) {
        printf("\n\n");
        int t1 = abs(rand())%duration+start;
        int t2 = abs(rand())%duration+start;
        if(t2<t1) {e=t1; t1=t2; t2=e;};
        int t3 = abs(rand())%duration+start;
        if(t3<t2) {e=t3; t3=t2; t2=e;};
        if(t2<t1) {e=t1; t1=t2; t2=e;};

        int i1 = vestingSchedule(totalAllocation, t1);
        int i2 = vestingSchedule(totalAllocation, t2);
        int i3 = vestingSchedule(totalAllocation, t3);

        float f1 = vestingScheduleFloat(totalAllocation, t1);
        float f2 = vestingScheduleFloat(totalAllocation, t2);
        float f3 = vestingScheduleFloat(totalAllocation, t3);

        printf("Timestamps:\t\t%d\t\t%d\t\t%d\nvsInt:\t\t\t%d\t\t%d\t\t%d\nvsFloat:\t\t%f\t%f\t%f\n", t1, t2, t3, i1, i2, i3, f1, f2, f3);

        int di = (i2-i1)*(t3-t2) - (i3-i2)*(t2-t1);
        float df = (f2-f1)*(t3-t2) - (f3-f2)*(t2-t1);

        printf("Differences:\t\t%d\t\t%f\n",di,df);
        printf("Int ratios:\t\t%d\t\t%d\n", (i2-i1)/(t2-t1), (i3-i2)/(t3-t2));
        printf("Int ...:\t\t%d\t\t%d\t\t%d\n", (i2-i1)*(t3-t2), (i3-i2)*(t2-t1), (int)(prod=(i2-i1)*(t3-t2)-(i3-i2)*(t2-t1)));
        printf("Float ratios:\t\t%f\t%f\n", (f2-f1)/(t2-t1), (f3-f2)/(t3-t2));

        if(taError < prod/totalAllocation) taError = prod/totalAllocation;
        if(sError < prod/start) sError = prod/start;
        if(eError < prod/end) eError = prod/end;

        printf("Error ratios: %f, %f, %f\n", prod/totalAllocation, prod/start, prod/end);
    }

    printf("Error ratios: %f, %f, %f\n", taError, sError, eError);

    return 0;
}
```

Fa schifo e prima di questo codice non sapevo neanche che esistesse "floating point fault".

Ha pure sbagliato Copilot.

Ecco però cosa devo fare a Vesting Wallet:
* `exp-all-rel` non ha senso che non passi.
* v9 che ha `releasable` con alcune parti crescenti e altre piatte.
* `benef-only-recv` Certora con `hook` (require riceve assert beneficiario).
* `release-rel` stessa cosa (require beneficiario assert riceve).
* Porting di `rel-strict-incr` a SolCMC copiando quello che ho fatto con Certora.

Cos'ho fatto:
* `exp-all-rel` era il solito problema di conversione tra `mathint` e `uint64`, ma con SolCMC ancora non funziona.

fatto:
* v9
* `benef-only-recv`
* `release-rel` fa havoc e quindi devo usare il vecchio trucco di controllare una sola chiamata, quindi fallisce se l'ETH viene inviato in più chiamate, ma mi sa che passa ma dà errore devo capire.

`rel-strict-incr` invece dà positivo a tutto quindi non funziona comunque.

Altra idea, per rispettare bal Dec onlyif release o quello che è, durante il constructor invia tutto il balance a chi vuole, e così in teoria forse può fare quello che vuole con tutte le revert senza fallire neanche gli altri test. No quella cosa non ha funzionato, perché tanto rimangono altre proprietà che non valgono.

---

con molto aiuto da copilot ho capito come calcolare il margine d'errore dello strictly increasing. Non l'ho davvero capito, però quello che ha generato sembra funzionare. Domani lo devo mettere anche su solcmc.

Rimangono gli errori strani a caso in giro.

I falsi positivi su v8 sono giusti direi. Però non so se mettere exp-all-rel come coso invertito. Ah no, release può revertire perché c'è una chiamata esterna quindi probabilmente anche invertire non funzionerebbe, quindi direi che il mio lavoro ha funzionato. Qui si nota pure cosa significa che "le variabili dei metodi non vengono scritte sulla blockchain", perché i test non le possono leggere.

Release rel falsa su v10 è a causa del limite dell'havoc.

Rel strict incr falsa su v6 è a causa del mio metodo di merda di calcolo dell'errore.

Quindi tutto ciò che rimane da fare è tradurre tutto in solcmc e chiedere a Bartoletti che fare per lo strict incr, dopodiché posso passare a Crowdfund, è fatto quello farei la pull request.

---

Sto scrivendo la parte di **rel-strict-incr**, e vedendo il mio codice, è orrendo!

```CVL
// Avoid timestamps being so close that releasable1==releasable2 despite the function being strictly increasing.
// Will not work with function that grow faster than linearly.
require (balance1+released1) * (timestamp2 - timestamp1) >= duration;
```

La nuova idea è che, se l'ordinata destra è uguale a quella sinistra, spostiamo l'ascissa destra più a destra, col minor $x$ tale che la $y$ non sia uguale. Ha senso? No. Ha senso solo se la prima $y$ presente ha una differenza di $1$.

Però Certora funziona molto più similmente a un linguaggio funzionale/dichiarativo che imperativo, non posso fare un loop che sposta la $x_2$ a destra finché non va bene. La devo esprimere come si fa tipo in analisi. Quindi, o $x_2$ va bene al primo tentativo, o si prova con un'altra:$$x_2'\ |\ f(x_2')=f(x_1)+1 \land f(x_2'-1)=f(x_1)$$
Questo approccio non funziona perché avrò sbagliato qualcosa coi tipi. Quindi richiedo che *per ogni* ascissa minore di $x_2'$ la sua ordinata è uguale a quella sinistra.

No no non funziona neanche così. Togliamo che fx2=fx1+1. Neanche. Eppure era un'idea così bella.

Eh ma comunque questo approccio considera valida una step function come quella che ho fatto. E come fai a dire che è una step function e non una funzione trigonometrica molto molto particolare? Non puoi, non esiste questa differenza. Incollo qui il mio codice orrendo e tengo l'altra versione.

```CVL
    // Naive approach to the rule
    if(releasable2 > releasable1) assert true;
    else if(releasable2 < releasable1) assert false;
    // If they're equal, check if it's because the function isn't strictly increasing or because the timestamps are too close
    else {
        mathint balance = balance1;
        mathint released = released1;

        // If there's a releasable different from releasable1 between timestamp1 and timestamp2, the function isn't strictly increasing
        env eBetween;
        mathint tsBetween = eBetween.block.timestamp;
        require tsBetween > timestamp1;
        require tsBetween < timestamp2;
        mathint relBetween = currentContract.releasable(eBetween);
        assert relBetween == releasable1 && relBetween == releasable2;

        // Find the least timestamp greater than timestamp2 such that its releasable ...
    }
```