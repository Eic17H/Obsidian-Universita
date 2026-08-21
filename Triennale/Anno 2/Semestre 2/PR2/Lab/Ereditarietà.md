---
cssclasses: pr2
---
## Basi dell'ereditarietà

Abbiamo una [[Anno 2/Semestre 2/PR2/Lab/Classi|classe]] `Studente` e una classe `Docente`.
* Studente ha gli attributi `nome`, `cognome`, `età`, `matricola` e `anno di iscrizione`.
* Docente ha gli attributi `nome`, `cognome`, `età` e `insegnamento`.

Molti sono ripetuti. Anziché scriverli due volte, e dover fare tutte le funzioni due volte, e le modifiche, usiamo il <span class="pink"><i>polimorfismo</i></span>.
Creiamo una classe `Persona`, che ha `nome`, `cognome` ed `età`, con i metodi `set()` e `get()` e facciamo *ereditare* tutto questo alle altre due classi.

`Persona` è la superclasse, `Studente` e `Docente` sono sottoclassi, che ereditano i suoi metodi e attributi ma ne hanno anche di nuovi.

Alla classe `Studente` aggiungiamo `matricola` e `anno di iscrizione`, alla classe `Docente` aggiungiamo `insegnamento`.

Per fare ciò, possiamo scrivere `public class Studente extends Persona`.
Nel costruttore della sottoclasse chiamiamo il costruttore della superlcasse usando la keyword `super()`.

Java ha ereditarietà singola, quindi estendi una sola classe.
In Python puoi estendere da più classi.
Se un attributo è private, la sottoclasse non ci può comunque accedere, usi `super.setNome()` per esempio.

#### Persona.java

```Java
public class Persona {
    private String nome;
    private String cognome;
    private int eta;

    public Persona() {
        this.nome = new String("");
        this.cognome = new String("");
        this.eta = 0;
    }

    public Persona(String nome, String cognome, int eta) {
        this.nome = new String(nome);
        this.cognome = new String(cognome);
        this.eta = eta;
    }

    public String getNome() {
        return this.nome;
    }
    public String getCognome() {
        return this.cognome;
    }
    public int getEta() {
        return this.eta;
    }

    public void setNome(String nome) {
        this.nome = new String(nome);
    }
    public void setCognome(String cognome) {
        this.cognome = new String(cognome);
    }
    public void setEta(int eta) {
        this.eta = eta;
    }
}
```

#### Studente.java

```Java
public class Studente extends Persona {
    private int matricola;
    private int annoIscrizione;

    public Studente() {
        super();
        this.matricola = 0;
        this.annoIscrizione = 0;
    }

    public Studente(String nome, String cognome, int eta, int matricola, int annoIscrizione) {
        super(nome, cognome, eta);
        this.matricola = matricola;
        this.annoIscrizione = annoIscrizione;
    }

    public String getNome() {
        return super.getNome();
    }
    public String getCognome() {
        return super.getCognome();
    }
    public int getEta() {
        return super.getEta();
    }
    public int getMatricola() {
        return this.matricola;
    }
    public int getAnnoIscrizione() {
        return this.annoIscrizione;
    }

    public void setNome(String nome) {
        super.setNome(nome);
    }
    public void setCogome(String cognome) {
        super.setCognome(cognome);
    }
    public void setEta(int eta) {
        super.setEta(eta);
    }
    public void setMatricola(int matricola) {
        this.matricola = matricola;
    }
    public void setAnnoIscrizione(int annoIscrizione) {
        this.annoIscrizione = annoIscrizione;
    }
}
```

#### Docente.java

```Java
public class Docente extends Persona {
    private String insegnamento;

    public Docente() {
        super();
        this.insegnamento = new String("");
    }

    public Docente(String nome, String cognome, int eta, String insegnamento) {
        super(nome, cognome, eta);
        this.insegnamento = new String(insegnamento);
    }

    public String getNome() {
        return super.getNome();
    }
    public String getCognome() {
        return super.getCognome();
    }
    public int getEta() {
        return super.getEta();
    }
    public String getInsegnamento() {
        return this.insegnamento;
    }

    public void setNome(String nome) {
        super.setNome(nome);
    }
    public void setCogome(String cognome) {
        super.setCognome(cognome);
    }
    public void setEta(int eta) {
        super.setEta(eta);
    }
    public void setInsegnamento(String insegnamento) {
        this.insegnamento = new String(insegnamento);
    }
}
```

## La classe `Object`

Di default, tutte le classi estendono `Object`, e ne ereditano tre metodi:
* `toString()` - converte l'oggetto in una stringa
* `equals()` - controlla se due oggetti sono "uguali", secondo una certa definizione
* `clone()` - restituisce una copia dello stesso oggetto
Può essere utile fare l'[[Override|override]] del metodo `toString()`, per avere un formato predefinito per la stampa degli oggetti.

### Il metodo `equals()`

`class Persona` ha implicito `extends Object`.
`Object` has i metodi `toString()`, `equals()` e `clone()`.
* `toString()` di default restituisce il nome della classe seguito dall'indirizzo, ma di solito si fa l'override per mostrare gli attributi.
* `equals()` è l'equivalente in C di `==`. La differenza è che permette di confrontare due oggetti della stessa classe, concetti non presenti in C. Deve rispettare certe proprietà:
    * Riflessività - `x.equals(x)`
    * Simmetrie - `x.equals(y)` → `y.equals(x)`
    * Transitività - `x.equals(y) && y.equals(z)` → `x.equals(z)`
    * `!x.equals(null)`

Anche in questo caso può essere utile l'override.
# Casting

Partiamo dalle classi viste per l'Ereditarietà.
```Java
class Docente extends Persona{}
...
Persona persona = new Docente();
```
Si può fare? Sì, si chiama *upcast*. Quando si fa, però, si possono usare solo i metodi e gli attributi della classe `Persona`, nonostante stiamo istanziando un oggetto di classe `Docente`.

L'operazione inversa è detta *downcast*:
```Java
Docente docente = (Docente) persona;
```
Castando l'oggetto di prima alla classe `Docente` posso adesso usare tutti i metodi della classe `Docente` e anche quelli di `Persona`.

Per controllare se un oggetto appartiene a una classe, uso la keyword `instanceof`
```Java
if(persona instanceof Docente){
	Docente docentePersona = (Docente) persona;
}
```

Usiamo il casting, e vediamo come interagisce con l'[[Override|override]].

```Java
public class Main{
    public static void main(String[] args){
        Persona persona = new Studente("Aldo", "Baglio", 20, 66123, 1999);
        System.out.println(persona.calcolaCostoBiglietto(100));
        Studente studente = (Studente) persona;
        System.out.println(studente.calcolaCostoBiglietto(100));
    }
}
```
Eseguendolo, l'output è:
```Java
0.0
0.0
```
In entrambi i casi, viene chiamato il metodo della classe `Studente`. A Java non interessa il tipo che c'è a sinistra, vede quello che c'è a destra e si basa su quello.



Vedi le #slide per le varie cose insomma si capisce.

## Approfondimenti

[[Classi astratte|Classi astratte]], [[Triennale/Anno 2/Semestre 2/PR2/Lab/Interfacce|interfacce]], [[Override|override]].