---
cssclasses: asd
---
Complessità $O(n^2)$ di base, ma se un array è già ordinato non spreca risorse e termina in $O(n)$.
## C

```C
void insertionSort(int array[], int dimensione){
    int prossimo = -1;
    int i=-1, j=-1;
    for(i=1; i<dimensione; i++){
        prossimo = array[i];
        for(j=i-1; j>=0; j--){
            if(prossimo<array[j])
                array[j+1] = array[j];
            else
                break;
        }
        array[j+1] = prossimo;
    }
}
```