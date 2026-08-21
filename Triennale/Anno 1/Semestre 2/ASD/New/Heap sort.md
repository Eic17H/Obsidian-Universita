---
cssclasses:
  - asd
---
[[Triennale/Anno 1/Semestre 2/ASD/New/Heap]]

## C

```C
void heapSort(int lista[], int n){
    lista--;
    for(int i=n/2; i>=1; i--)
        adatta(lista, i, n);
    for(int i=n-1; i>=1; i--){
        scambiaInt(&lista[1], &lista[i+1]);
        adatta(lista, 1, i);
    }
}
```