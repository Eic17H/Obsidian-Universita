## Cos'è e come si crea

Il concetto di Activity è fondamentale per lo sviluppo in Android. Concettualmente, un'Activity è la finestra in cui viene visualizzata l'interfaccia grafica.

Per creare un'activity, basta definire una classe che eredita da `Activity`.

Per passare da un'activity a un'altra si usano gli *intent*, oggetti che descrivono un'operazione da effettuare.

Per far partire un'activity, chiamiamo `.startActivity()` sull'intent associata.

## Ciclo di vita

All'inizio viene chiamata `.onCreate()`, e subito dopo `.onStart()` seguita da `.onResume()`.

A quel punto l'attività è in esecuzione.

Quando un'altra attività viene messa in foreground, nella nostra viene chiamata `.onPause()`. Tornati alla nostra attività, si torna indietro e si riprende da `.onResume()`.

Al posto di riprendere, dopo `.onPause()`, l'attività messa in background potrebbe essere rimossa dallo schermo. In quel caso viene chiamata `.onStop()`. Da lì ci sono tre possibilità.

* L'utente potrebbe tornare all'attività, e in quel caso si chiama `.onRestart()` e si riparte da `.onStart`.
* Potrebbe esserci bisogno di liberare memoria, quindi l'app viene ~~sacrificata~~ fermata, e quando l'utente ci torna, si riparte da `.onCreate()`.
* Oppure se l'utente ha finito di usare l'attività, si chiama `.onDestroy()` e l'attività viene terminata.

### `.onCreate()`

Questa è particolare.

La classe `MainActivity` è sottoclasse di `AppCompatActivity`, che ha come metodo `.onCreate()`, che viene invocato ogni volta che si crea un'activity.

`.onCreate()` prende come parametro un oggetto di classe `Bundle`, che "contiene lo stato dell'istanza". Visto che questi oggetti possono contenere qualsiasi tipo di dato, vengono usati per scambiare dati tra activity.

Questo metodo contiene due istruzioni. La prima passa il bundle alla `onCreate` della superclasse, e la seconda imposta il layout dell'activity usando un metodo.

```Kotlin
public class MainActivity extends AppCompatActivity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
	}
}
```