L'eredità vedo che si fa con `contract A ... contract B is A`. Cosa si eredita? Dipende dalla visibilità.

## Visibilità

Puoi dichiarare una [[Valori|variabile]] con quattro visibilità diverse:
* Nessuna;
* `private`: accessibile solo all'interno dello smart contract;
* `internal`: come quelle private, ma si possono ereditare;
* `public`: accessibile da tutti.

Per le [[Triennale/Anno 3/Semestre 2/R54/Solidity/Imparando/Funzioni|funzioni]] invece:
* `public`: si può chiamare da fuori dal contratto, ma anche da un'altra funzione all'interno del contratto;
* `private`: non si può chiamare da fuori dal contratto, ma sì da un'altra funzione all'interno dello stesso contratto;
* `external`: solo fuori dal contratto;
* `internal`: solo dal contratto stesso, o dai contratti figli (si può ereditare).
## Interfacce