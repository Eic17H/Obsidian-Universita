---
cssclasses: pr2
---
# Eccezioni

In generale, quando succede un errore che non abbiamo previsto, in C c'è `segmentation fault`, quindi il programma crasha e dobbiamo ricominciare. In Java invece, esistono le eccezioni, lanciate dai metodi, che possono essere catturate e gestite.

Dico a Java: questo metodo è rischioso, posso dover lanciare un'eccezione, quindi può essere opportuno gestirlo oppure no. Lo si gestisce con try/catch: prova a fare qualcosa, e se lancia un'eccezione, catturala e gestiscila.

Gli errori non sono i bug. I bug esistono, generalmente per negligenza del programmatore, ma gli errori sono qualcosa con cui dobbiamo convivere. Se l'utente immette qualcosa che non dovrebbe, non possiamo farci niente. Tutto ciò che possiamo fare è gestire questi casi.

Ci sono due tipi di errori: checked e unchecked. Gli errori checked sono controllati a tempo di compilazione, non si può sbagliare. Se si compila e c'è un errore, non compila proprio. Per esempio, `ClassNotFound`. Quelle su cui invece bisogna lavorare sono quelle unchecked, quelle a runtime. Per esempio, per caso, un divisore è $0$. Non ci possiamo fare niente, può succedere per il caso, o per un input.

C'è anche `throw`.
```Java
public void verificaEta(int eta) throws IllegalArgumentException{
    if(eta < 18){
        throw new IllegalArgumentException("Accesso negato.");
    }
    System.out.println("Accesso consentito.");
}
```
Quando viene lanciata l'eccezione, viene terminata l'esecuzione del metodo. Questo metodo lancia l'eccezione, e il metodo chiamante decide se catturarla o lanciarla a sua volta. Vedi #slide 20.

I catch vanno a cascata. È come un `if`/`else`. Mettili in ordine dal più particolare al più generale.

C'è un'altra keyword, `finally`. Questo blocco verrà **sempre** eseguito. Ci metti, per esempio, `out.close()` per chiudere cose che sono state aperte, così la tua gestione degli errori non crea altri problemi.

Posso anche creare nuove classi che corrispondono a nuove eccezioni.

# Eccezioni

Eventi tecnicamente non previsti, ma si spera gestiti.
Certe volte, se non gestite, fanno crashare il programma.
Per lanciare un'eccezione, si usa la keyword `throw`.
In Java tutto è un oggetto, incluse le eccezioni: `throw new Eccezione()`.
Se un metodo può lanciare un'eccezione, si usa la keyword `throws` nella firma del metodo.
Quando si chiama un metodo che lancia un'eccezione, la si mette dentro un blocco `try`/`catch`.
Se non usi un blocco `try`/`catch`, usi `throws`.

Sia errori che eccezioni sono sottoclassi di `throwable`.
Ci sono throwable checked e unchecked. Quelle checked le devi gestire o rilanciare, quelle unchecked le devi evitare. Vedi le #slide.

Exception viene considerata checked, e quindi se la estendi la tua nuova classe è checked.