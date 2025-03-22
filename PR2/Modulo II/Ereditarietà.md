## Basi dell'ereditarietà

Abbiamo una classe `Studente` e una classe `Docente`.
* Studente ha gli attributi `nome`, `cognome`, `età`, `matricola` e `anno di iscrizione`.
* Docente ha gli attributi `nome`, `cognome`, `età` e `insegnamento`.

Molti sono ripetuti. Anziché scriverli due volte, e dover fare tutte le funzioni due volte, e le modifiche, usiamo il <span class="pink">*polimorfismo*</span>.
Creiamo una classe `Persona`, che ha `nome`, `cognome` ed `età`, con i metodi `set()` e `get()` e facciamo *ereditare* tutto questo alle altre due classi.

`Persona` è la superclasse, `Studente` e `Docente` sono sottoclassi.

Alla classe `Studente` aggiungiamo `matricola` e `anno di iscrizione`, alla classe `Docente` aggiungiamo `insegnamento`.

Per fare ciò, possiamo scrivere `public class Studente extends Persona`.
Nel costruttore della sottoclasse chiamiamo il costruttore della superlcasse usando la keyword `super()`.

Java ha ereditarietà singola, quindi estendi una sola classe.
In Python puoi estendere da più classi.
Se un attributo è private, la sottoclasse non ci può comunque accedere, usi `super.setNome()` per esempio.

#### Persona.java

```
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

```
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

```
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
Può essere utile fare l'[[Override]] del metodo `toString()`, per avere un formato predefinito per la stampa degli oggetti.