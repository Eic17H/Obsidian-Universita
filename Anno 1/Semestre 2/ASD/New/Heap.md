---
cssclasses:
  - asd
---
Usiamo la rappresentazione [[Anno 1/Semestre 2/ASD/New/Alberi#Array|come array]].

```C
void adatta(int lista[], int radice, int n){
    int temp = lista[radice];
    int figlio = 2*radice;
    while(figlio <= n){
        if(figlio<n && lista[figlio]<lista[figlio+1])
            figlio++;

        if(temp>lista[figlio])
            break;
        else{
            lista[figlio/2] = lista[figlio];
            figlio *= 2;
        }
    }
    lista[figlio/2] = temp;
}
```