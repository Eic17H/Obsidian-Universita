* === CODA ===
     * FIFO, first in first out. Il primo che entra è il primo che esce.
     * push (inserire), pop (uscire), create, isEmpty, isFull, etc.
     * push e pop sono obbligatorie, le altre le metti o no, non importa.
     * Due puntatori: front e back, primo e ultimo. Inizializzati a NULL.
     * push: nuovo elemento, esso punta a back, back punta a lui.
     * pop: restituisce i dati dell'elemento puntato da front, front ora punta a quello dopo.
     *