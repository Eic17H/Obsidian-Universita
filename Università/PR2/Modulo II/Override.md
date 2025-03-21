Facciamo l'override quando abbiamo un metodo generico nella [[Ereditarietà|superclasse]], e vogliamo renderlo specifico in una sottoclasse.

Magari abbiamo una superclasse conto che ha un metodo `prelievo()`, e vogliamo che nella sottoclasse `contoCorrente` la stessa funzione faccia le stesse cose, con l'aggiunta del fatto che deve tenere traccia di quanti prelievi si fanno.

In questo caso, si fa una classe con la stessa firma, si chiama il metodo `super.prelievo()`, e si aggiungono le istruzioni che servono.

Si aggiunge il decoratore `@Override`, così il compilatore ci avverte se non abbiamo dato la stessa firma al metodo della sottoclasse.

Riprendiamo l'esempio visto con l'[[ereditarietà]]:

#### Persona.java
```
public class Persona{
    private String nome;
    private String cognome;
    private int eta;

    ...

    public double calcolaCostoBiglietto(double prezzoIntero){
        if(this.eta>=50) return prezzoIntero*0.9;
        if(this.eta>=70) return prezzoIntero*0.8;
        return prezzoIntero;
    }
}
```

#### Studente.java
```
public class Studente extends Persona{
    private int matricola;
    private int annoIscrizione;

    ...

    @Override
    public double calcolaCostoBiglietto(double prezzoIntero){
        if(this.getEta()<=30) return 0;
        if(2025-annoIscrizione<3) return prezzoIntero*0.5;
        return super.calcolaCostoBiglietto(prezzoIntero);
    }
}
```

#### Docente.java

```
public class Docente extends Persona{
    private String insegnamento;

    ...

    @Override
    public double calcolaCostoBiglietto(double prezzoIntero){
        return prezzoIntero*0.1;
    }
}
```

## Override dei metodi di `Object`

Facciamo l'override del metodo `toString()` per queste classi:

#### Persona.java
```
@Override
    public String toString(){
        String s = new String("");
        s += this.getNome() + " " + this.getCognome() + " (" + this.getEta() + " anni)";
        return s;
    }
```

#### Studente.java
```
@Override
    public String toString(){
        String s = new String("");
        s += this.getNome() + " " + this.getCognome() + " (matricola " + this.getMatricola() + ", iscritto dal " + this.getAnnoIscrizione() + ", " + this.getEta() + " anni)";
        return s;
    }
```

#### Docente.java

```
@Override
    public String toString(){
        String s = new String("");
        s += this.getNome() + " " + this.getCognome() + " (" + this.getEta() + " anni, insegna " + this.getInsegnamento() + ")";
        return s;
    }
```