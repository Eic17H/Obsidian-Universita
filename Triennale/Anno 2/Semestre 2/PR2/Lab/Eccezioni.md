---
cssclasses: pr2
---
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

Posso anche creare nuove classi che corrispondono a nuove eccezioni. Una categoria di eccezione è semplicemente una classe che eredita da `Exception`.

### Poi metterò in ordine il documento

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

## Esempio

```Java title="TestBanca.java"
package it.unica.pr2.banca;

import it.unica.pr2.banca.conti.*;

public class TestBanca{

    public static void main(String[] args){

        //nome, cognome, primo versamento
        ContoBancario conto1 = new ContoBancario("Paolo", "Rossi", 10000);

        //nome, cognome, primo versamento, percentuale rendimento annuo
        ContoCorrente conto2 = new ContoCorrente("Luisa", "Verdi", 1000, 5);

        ContoCorrente conto3 = new ContoCorrente();
        
        
        assert conto2 instanceof ContoBancario;

        
        assert conto3.getNumeroConto() == 1003;
        
        assert conto3.getSaldo() == 0;
        

        ContoBancario conto4 = new ContoBancario("Paolo", "Rossi", 10000);
        assert !conto4.equals(conto1);
        
        ContoCorrente conto5 = new ContoCorrente(conto2);
	    assert conto5.equals(conto2);

        
        double dollari = 50;
        double tassoConversione = 0.92;
        double euro = ContoBancario.convertiInEuro(dollari, tassoConversione);
        double risultatoAtteso = 46.0;
        assert euro == risultatoAtteso;

        conto2.preleva(633.48);
        assert conto2.getSaldo() == 366.52;
        
        try{
           conto2.preleva(2000); 
        }catch (InsufficientFundsException e){
            assert e instanceof RuntimeException;
            assert e.getMessage().equals("Non hai fondi sufficienti!");
        }
        
        try{
           conto2.preleva(-1000); 
        }catch (IllegalArgumentException e){
            assert e.getMessage().equals("Argomento non valido");
        }
        
    }
}
```

```Java title="ContoBancario.java"
package it.unica.pr2.banca.conti;
public class ContoBancario{
    private String nome;
    private String cognome;
    private int numeroConto;
    private double saldo;
    private static int numeroConti = 1000;

    public ContoBancario(){
        numeroConti++;
        this.nome = new String("");
        this.cognome = new String("");
        this.numeroConto = numeroConti;
    }

    public ContoBancario(ContoBancario that){
        numeroConti++;
        this.nome = new String(that.getNome());
        this.cognome = new String(that.getCognome());
        this.numeroConto = that.getNumeroConto();
        this.saldo = that.getSaldo();
    }
    
    public ContoBancario(String nome, String cognome, double saldo){
        numeroConti++;
        this.nome = new String(nome);
        this.cognome = new String(cognome);
        this.numeroConto = numeroConti;
        this.saldo = saldo;
    }

    public String getNome(){
        return this.nome;
    }
    public String getCognome(){
        return this.cognome;
    }
    public String getNomeCompleto(){
        return this.getNome() + " " + this.getCognome();
    }
    public int getNumeroConto(){
        return this.numeroConto;
    }
    public double getSaldo(){
        return this.saldo;
    }

    public static double convertiInEuro(double valore, double tassoConversione){
        return valore*tassoConversione;
    }

    public void preleva(double quantita){
        if(quantita > this.saldo) throw new InsufficientFundsException();
        if(quantita < 0) throw new IllegalArgumentException("Argomento non valido");
        this.saldo -= quantita;
    }

    @Override
    public boolean equals(Object obj){
        if(this == obj) return true;
        else if(obj == null) return false;
        else if (obj.getClass() != this.getClass()) return false;

        ContoBancario that = (ContoBancario) obj;
        
        return (this.nome.equals(that.nome))
            && (this.cognome.equals(that.cognome))
            && (this.numeroConto == that.numeroConto)
            && (this.saldo == that.saldo);
    }
}
```

```Java title="ContoCorrente.java"
package it.unica.pr2.banca.conti;
public class ContoCorrente extends ContoBancario{
    private double rendimentoAnnuo;

    public ContoCorrente(){
        super();
        this.rendimentoAnnuo = 0;
    }

    public ContoCorrente(ContoCorrente that){
        super((ContoBancario) that);
        this.rendimentoAnnuo = that.getRendimentoAnnuo();
    }

    public ContoCorrente(String nome, String cognome, double saldo, double rendimentoAnnuo){
        super(nome, cognome, saldo);
        this.rendimentoAnnuo = rendimentoAnnuo;
    }

    public double getRendimentoAnnuo(){
        return this.rendimentoAnnuo;
    }

    public boolean equals(Object obj){
        if(this == obj) return true;
        else if(obj == null) return false;
        else if (obj.getClass() != this.getClass()) return false;

        ContoBancario that = (ContoBancario) obj;
        
        return (this.getNome().equals(that.getNome())) && (this.getCognome().equals(that.getCognome())) && (this.getSaldo() == that.getSaldo());
    }
}
```

```Java title="InsufficientFundException.java"
package it.unica.pr2.banca.conti;
public class InsufficientFundsException extends RuntimeException {
    public InsufficientFundsException(){
        super("Non hai fondi sufficienti!");
    }
}
```