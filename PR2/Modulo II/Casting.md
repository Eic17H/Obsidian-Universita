Partiamo dalle classi viste per l'[[ereditarietà]].
```
class Docente extends Persona{}
...
Persona persona = new Docente();
```
Si può fare? Sì, si chiama *upcast*. Quando si fa, però, si possono usare solo i metodi e gli attributi della classe `Persona`, nonostante stiamo istanziando un oggetto di classe `Docente`.

L'operazione inversa è detta *downcast*:
```
Docente docente = (Docente) persona;
```
Castando l'oggetto di prima alla classe `Docente` posso adesso usare tutti i metodi della classe `Docente` e anche quelli di `Persona`.

Per controllare se un oggetto appartiene a una classe, uso la keyword `instanceof`
```
if(persona instanceof Docente){
	Docente docentePersona = (Docente) persona;
}
```

Usiamo il casting, e vediamo come interagisce con l'[[Override]].

```
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
```
0.0
0.0
```
In entrambi i casi, viene chiamato il metodo della classe `Studente`. A Java non interessa il tipo che c'è a sinistra, vede quello che c'è a destra e si basa su quello.