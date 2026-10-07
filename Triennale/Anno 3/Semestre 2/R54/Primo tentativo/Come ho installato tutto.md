La soluzione che ha funzionato è stata:

## Parte facile

Eldarica mi pare di aver dovuto prendere il binario da GitHub.

Il problema di Z3, sembra, è che ti devi compilare SolC perché si integri con Z3, o almeno è quello che ha funzionato.
* `sudo apt update`
* `sudo apt install libboost-all-dev`
* `sudo apt install cmake`
* `sudo apt install libboost-all-dev`
* `sudo apt install z3 libz3-dev`
* `git clone --branch v0.8.28 --depth 1 https://github.com/ethereum/solidity.git`
* `cd solidity`
* `./scripts/build.sh`

E in realtà non ho capito, sto guardando la `history` ma non si capisce niente.

## Installare Certora

Questa è la parte difficile

Requisiti:
* `sudo apt install build-essential pkg-config libssl-dev`
* `rustup update stable`
* `rustup default stable`

* Crea una cartella in cui farai queste cose
* Se necessario, `git config --global url."https://github.com/".insteadOf "git@github.com:"`
* `git clone --recurse-submodules https://github.com/Certora/CertoraProver.git`
* `cd CertoraProver`
* `./gradlew assemble`
* `cd fried-egg`
* `cargo build --release`

Poi non so bene, ma alla fine ho:

```Bash
$ ls ~/.certora/prover
emv.jar  tac_optimizer
$ which certoraRun.py
~/.local/bin/certoraRun.py
17:58 ~ $ ls -la ~/.local/bin/certoraRun.py
lrwxrwxrwx 1 eic eic 31 ott  7 17:29 ~/.local/bin/certoraRun.py -> ~/.local/bin/certoraRun
```

Dove `emv.jar`, `tac_optimizer` e `certoraRun` sono stati generati dal processo di compilazione.

Ho anche dovuto installare `pipx install certora-cli`.