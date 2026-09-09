---
cssclasses: rc
---
Smoothed Round Trip Time, pari al tempo totale di attraversamento di una rete. Si usa per i [[Timer]].

Per ogni connessione [[TCP]], mantiene una variabile SRTT che rappresenta la stima corrente del [[Round trip time]].$$SRTT'=α\cdot SRTT + (1-α)\cdot R$$
Dove $SRTT$ è il vecchio valore della variabile, ed $R$ è il tempo appena misurato. $α$ rappresenta quanto peso dare al nuovo dato e quanto alla vecchia media. Per migliorare la performance, si imposta a $7/8$ per implementarlo come bitshift.