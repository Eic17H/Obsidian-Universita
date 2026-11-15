---
cssclasses:
  - r54
---
Allora, ho provato combinazioni diverse generate da DeepSeek per generare un'hash e un indirizzo che vadano bene insieme ma non funziona niente. Quindi vedo adesso come implementare Keccac256 in Certora.

Capiamo l'algoritmo.

* La memoria è di $1600 b$ divisa in una matrice $A \in \mathbb B_{64} ^{5 \times 5}$. Nel nostro caso, da appiattire e da mettere little-endian (forse).
* Prende l'input e lo padda a $136B$ aggiungendo un byte `0x01` subito dopo, e il resto è tutto bit `0`, tranne l'ultimo bit che è `1`.

No non sto capendo. Aiuto.

Pensiamoci un attimo.

1. Inizializza $1600b$ a `0`;
2. Prendi l'input, e mettilo in blocchi di $136B$ (nel nostro caso un solo blocco), dopo ogni blocco applica la permutazione;
3. Dopo l'input, metti `0x01`, poi tutti i bit a `0`, e l'ultimo bit a `1`;
4. Applica la permutazione;
5. Restituisci i primi $32B$.

Una permutazione è:
1. $\theta$: Vettore $c \in \mathbb B _{64} ^{5}$ in cui ogni elemento `c[x]` è lo XOR di `A[x, 1...5]`, poi `D[x] = C[(x+4)%5] XOR ROT(C[(x+1)%5], 1)`, e poi dappertutto `A[x,y] = A[x,y] XOR D[x]`;
2. $\rho$: Esiste `r[x,y]` di cui non vedo una definizione, `A[x,y] = ROT(A[x,y], r[x,y])`;
3. $\pi$: `A[y, (2x+3y)] = A[x,y]`;
4. $\chi$: no basta non capisco.

Basta.

Questa è l'implementazione di DeepSeek, che non è codice CVL valido:

```CVL
function rotl(uint64 x, uint8 n) returns uint64 {
    // CVL: shifts may promote to 256 bits, so mask after each shift
    uint64 mask = 0xFFFFFFFFFFFFFFFF;
    uint64 left  = (x << n) & mask;
    uint64 right = (x >> (64 - n)) & mask;
    return (left | right) & mask;
}

function theta(uint64[25] a) returns uint64[25] {
    uint64[5] C;
    uint64[5] D;
    for (uint x = 0; x < 5; x++) {
        C[x] = a[5*0 + x] ^ a[5*1 + x] ^ a[5*2 + x] ^ a[5*3 + x] ^ a[5*4 + x];
    }
    for (uint x = 0; x < 5; x++) {
        D[x] = C[(x + 4) % 5] ^ rotl(C[(x + 1) % 5], 1);
    }
    for (uint x = 0; x < 5; x++) {
        for (uint y = 0; y < 5; y++) {
            a[5*y + x] = a[5*y + x] ^ D[x];
        }
    }
    return a;
}

function rhoPi(uint64[25] a) returns uint64[25] {
    uint64[25] b;
    // Rotation offsets r[x,y] from the Keccak specification
    uint8[25] r = [
         0,  1, 62, 28, 27,
        36, 44,  6, 55, 20,
         3, 10, 43, 25, 39,
        41, 45, 15, 21,  8,
        18,  2, 61, 56, 14
    ];
    for (uint x = 0; x < 5; x++) {
        for (uint y = 0; y < 5; y++) {
            uint64 rotated = rotl(a[5*y + x], r[5*y + x]);
            uint newX = y;
            uint newY = (2*x + 3*y) % 5;
            b[5*newY + newX] = rotated;
        }
    }
    return b;
}

function chi(uint64[25] b) returns uint64[25] {
    uint64[25] a;
    for (uint y = 0; y < 5; y++) {
        for (uint x = 0; x < 5; x++) {
            uint64 notB = ~b[5*y + (x+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
            a[5*y + x] = b[5*y + x] ^ (notB & b[5*y + (x+2)%5]);
        }
    }
    return a;
}

function iota(uint64[25] a, uint256 round) returns uint64[25] {
    // 24 round consta// if a number of guardians greater than or equal to the threshold
// have participated in the same recovery round, and selected the same new owner,
// then `executeRecovery()` will succeed and `owner == newOwner`.

function rotl(uint64 x, uint8 n) returns uint64 {
    // CVL: shifts may promote to 256 bits, so mask after each shift
    uint64 mask = 0xFFFFFFFFFFFFFFFF;
    uint64 left  = (x << n) & mask;
    uint64 right = (x >> assert_uint8((64 - n))) & mask;
    return (left | right) & mask;
}

function theta(uint64[25] a) returns uint64[25] {
    uint64[5] C;
    uint64[5] D;
    require C[0] == a[5*0 + 0] ^ a[5*1 + 0] ^ a[5*2 + 0] ^ a[5*3 + 0] ^ a[5*4 + 0];
    require C[1] == a[5*0 + 1] ^ a[5*1 + 1] ^ a[5*2 + 1] ^ a[5*3 + 1] ^ a[5*4 + 1];
    require C[2] == a[5*0 + 2] ^ a[5*1 + 2] ^ a[5*2 + 2] ^ a[5*3 + 2] ^ a[5*4 + 2];
    require C[3] == a[5*0 + 3] ^ a[5*1 + 3] ^ a[5*2 + 3] ^ a[5*3 + 3] ^ a[5*4 + 3];
    require C[4] == a[5*0 + 4] ^ a[5*1 + 4] ^ a[5*2 + 4] ^ a[5*3 + 4] ^ a[5*4 + 4];
    require D[0] == C[(0 + 4) % 5] ^ rotl(C[(0 + 1) % 5], 1);
    require D[1] == C[(1 + 4) % 5] ^ rotl(C[(1 + 1) % 5], 1);
    require D[2] == C[(2 + 4) % 5] ^ rotl(C[(2 + 1) % 5], 1);
    require D[3] == C[(3 + 4) % 5] ^ rotl(C[(3 + 1) % 5], 1);
    require D[4] == C[(4 + 4) % 5] ^ rotl(C[(4 + 1) % 5], 1);
    uint64[25] b;
    b[5*0 + 0] = a[5*0 + 0] ^ D[0]; b[5*1 + 0] = a[5*1 + 0] ^ D[0]; b[5*2 + 0] = a[5*2 + 0] ^ D[0]; b[5*3 + 0] = a[5*3 + 0] ^ D[0]; b[5*4 + 0] = a[5*4 + 0] ^ D[0];
    b[5*0 + 1] = a[5*0 + 1] ^ D[1]; b[5*1 + 1] = a[5*1 + 1] ^ D[1]; b[5*2 + 1] = a[5*2 + 1] ^ D[1]; b[5*3 + 1] = a[5*3 + 1] ^ D[1]; b[5*4 + 1] = a[5*4 + 1] ^ D[1];
    b[5*0 + 2] = a[5*0 + 2] ^ D[2]; b[5*1 + 2] = a[5*1 + 2] ^ D[2]; b[5*2 + 2] = a[5*2 + 2] ^ D[2]; b[5*3 + 2] = a[5*3 + 2] ^ D[2]; b[5*4 + 2] = a[5*4 + 2] ^ D[2];
    b[5*0 + 3] = a[5*0 + 3] ^ D[3]; b[5*1 + 3] = a[5*1 + 3] ^ D[3]; b[5*2 + 3] = a[5*2 + 3] ^ D[3]; b[5*3 + 3] = a[5*3 + 3] ^ D[3]; b[5*4 + 3] = a[5*4 + 3] ^ D[3];
    b[5*0 + 4] = a[5*0 + 4] ^ D[4]; b[5*1 + 4] = a[5*1 + 4] ^ D[4]; b[5*2 + 4] = a[5*2 + 4] ^ D[4]; b[5*3 + 4] = a[5*3 + 4] ^ D[4]; b[5*4 + 4] = a[5*4 + 4] ^ D[4];
    return b;
}

function rhoPi(uint64[25] a) returns uint64[25] {
    uint64[25] b;
    // Rotation offsets r[x,y] from the Keccak specification
    uint8[25] r = [
         0,  1, 62, 28, 27,
        36, 44,  6, 55, 20,
         3, 10, 43, 25, 39,
        41, 45, 15, 21,  8,
        18,  2, 61, 56, 14
    ];
    uint64 rotated;

    uint rotated00 = rotl(a[5*0 + 0], r[5*0 + 0]); uint newX00 = 0; uint newY00 = (2*0 + 3*0) % 5; b[5*newY00 + newX00] = rotated00;
    uint rotated01 = rotl(a[5*1 + 0], r[5*1 + 0]); uint newX01 = 1; uint newY01 = (2*0 + 3*1) % 5; b[5*newY01 + newX01] = rotated01;
    uint rotated02 = rotl(a[5*2 + 0], r[5*2 + 0]); uint newX02 = 2; uint newY02 = (2*0 + 3*2) % 5; b[5*newY02 + newX02] = rotated02;
    uint rotated03 = rotl(a[5*3 + 0], r[5*3 + 0]); uint newX03 = 3; uint newY03 = (2*0 + 3*3) % 5; b[5*newY03 + newX03] = rotated03;
    uint rotated04 = rotl(a[5*4 + 0], r[5*4 + 0]); uint newX04 = 4; uint newY04 = (2*0 + 3*4) % 5; b[5*newY04 + newX04] = rotated04;
    
    uint rotated10 = rotl(a[5*0 + 1], r[5*0 + 1]); uint newX10 = 0; uint newY10 = (2*1 + 3*0) % 5; b[5*newY10 + newX10] = rotated10;
    uint rotated11 = rotl(a[5*1 + 1], r[5*1 + 1]); uint newX11 = 1; uint newY11 = (2*1 + 3*1) % 5; b[5*newY11 + newX11] = rotated11;
    uint rotated12 = rotl(a[5*2 + 1], r[5*2 + 1]); uint newX12 = 2; uint newY12 = (2*1 + 3*2) % 5; b[5*newY12 + newX12] = rotated12;
    uint rotated13 = rotl(a[5*3 + 1], r[5*3 + 1]); uint newX13 = 3; uint newY13 = (2*1 + 3*3) % 5; b[5*newY13 + newX13] = rotated13;
    uint rotated14 = rotl(a[5*4 + 1], r[5*4 + 1]); uint newX14 = 4; uint newY14 = (2*1 + 3*4) % 5; b[5*newY14 + newX14] = rotated14;
    
    uint rotated20 = rotl(a[5*0 + 2], r[5*0 + 2]); uint newX20 = 0; uint newY20 = (2*2 + 3*0) % 5; b[5*newY20 + newX20] = rotated20;
    uint rotated21 = rotl(a[5*1 + 2], r[5*1 + 2]); uint newX21 = 1; uint newY21 = (2*2 + 3*1) % 5; b[5*newY21 + newX21] = rotated21;
    uint rotated22 = rotl(a[5*2 + 2], r[5*2 + 2]); uint newX22 = 2; uint newY22 = (2*2 + 3*2) % 5; b[5*newY22 + newX22] = rotated22;
    uint rotated23 = rotl(a[5*3 + 2], r[5*3 + 2]); uint newX23 = 3; uint newY23 = (2*2 + 3*3) % 5; b[5*newY23 + newX23] = rotated23;
    uint rotated24 = rotl(a[5*4 + 2], r[5*4 + 2]); uint newX24 = 4; uint newY24 = (2*2 + 3*4) % 5; b[5*newY24 + newX24] = rotated24;
    
    uint rotated30 = rotl(a[5*0 + 3], r[5*0 + 3]); uint newX30 = 0; uint newY30 = (2*3 + 3*0) % 5; b[5*newY30 + newX30] = rotated30;
    uint rotated31 = rotl(a[5*1 + 3], r[5*1 + 3]); uint newX31 = 1; uint newY31 = (2*3 + 3*1) % 5; b[5*newY31 + newX31] = rotated31;
    uint rotated32 = rotl(a[5*2 + 3], r[5*2 + 3]); uint newX32 = 2; uint newY32 = (2*3 + 3*2) % 5; b[5*newY32 + newX32] = rotated32;
    uint rotated33 = rotl(a[5*3 + 3], r[5*3 + 3]); uint newX33 = 3; uint newY33 = (2*3 + 3*3) % 5; b[5*newY33 + newX33] = rotated33;
    uint rotated34 = rotl(a[5*4 + 3], r[5*4 + 3]); uint newX34 = 4; uint newY34 = (2*3 + 3*4) % 5; b[5*newY34 + newX34] = rotated34;
    
    uint rotated40 = rotl(a[5*0 + 4], r[5*0 + 4]); uint newX40 = 0; uint newY40 = (2*4 + 3*0) % 5; b[5*newY40 + newX40] = rotated40;
    uint rotated41 = rotl(a[5*1 + 4], r[5*1 + 4]); uint newX41 = 1; uint newY41 = (2*4 + 3*1) % 5; b[5*newY41 + newX41] = rotated41;
    uint rotated42 = rotl(a[5*2 + 4], r[5*2 + 4]); uint newX42 = 2; uint newY42 = (2*4 + 3*2) % 5; b[5*newY42 + newX42] = rotated42;
    uint rotated43 = rotl(a[5*3 + 4], r[5*3 + 4]); uint newX43 = 3; uint newY43 = (2*4 + 3*3) % 5; b[5*newY43 + newX43] = rotated43;
    uint rotated44 = rotl(a[5*4 + 4], r[5*4 + 4]); uint newX44 = 4; uint newY44 = (2*4 + 3*4) % 5; b[5*newY44 + newX44] = rotated44;
    
    return b;
}

function chi(uint64[25] b) returns uint64[25] {
    uint64[25] a;
    uint64 notB00 = ~b[5*0 + (0+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*0 + 0] = b[5*0 + 0] ^ (notB00 & b[5*0 + (0+2)%5]);
    uint64 notB01 = ~b[5*0 + (1+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*0 + 1] = b[5*0 + 1] ^ (notB01 & b[5*0 + (1+2)%5]);
    uint64 notB02 = ~b[5*0 + (2+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*0 + 2] = b[5*0 + 2] ^ (notB02 & b[5*0 + (2+2)%5]);
    uint64 notB03 = ~b[5*0 + (3+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*0 + 3] = b[5*0 + 3] ^ (notB03 & b[5*0 + (3+2)%5]);
    uint64 notB04 = ~b[5*0 + (4+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*0 + 4] = b[5*0 + 4] ^ (notB04 & b[5*0 + (4+2)%5]);
    uint64 notB10 = ~b[5*1 + (0+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*1 + 0] = b[5*1 + 0] ^ (notB10 & b[5*1 + (0+2)%5]);
    uint64 notB11 = ~b[5*1 + (1+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*1 + 1] = b[5*1 + 1] ^ (notB11 & b[5*1 + (1+2)%5]);
    uint64 notB12 = ~b[5*1 + (2+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*1 + 2] = b[5*1 + 2] ^ (notB12 & b[5*1 + (2+2)%5]);
    uint64 notB13 = ~b[5*1 + (3+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*1 + 3] = b[5*1 + 3] ^ (notB13 & b[5*1 + (3+2)%5]);
    uint64 notB14 = ~b[5*1 + (4+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*1 + 4] = b[5*1 + 4] ^ (notB14 & b[5*1 + (4+2)%5]);
    uint64 notB20 = ~b[5*2 + (0+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*2 + 0] = b[5*2 + 0] ^ (notB20 & b[5*2 + (0+2)%5]);
    uint64 notB21 = ~b[5*2 + (1+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*2 + 1] = b[5*2 + 1] ^ (notB21 & b[5*2 + (1+2)%5]);
    uint64 notB22 = ~b[5*2 + (2+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*2 + 2] = b[5*2 + 2] ^ (notB22 & b[5*2 + (2+2)%5]);
    uint64 notB23 = ~b[5*2 + (3+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*2 + 3] = b[5*2 + 3] ^ (notB23 & b[5*2 + (3+2)%5]);
    uint64 notB24 = ~b[5*2 + (4+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*2 + 4] = b[5*2 + 4] ^ (notB24 & b[5*2 + (4+2)%5]);
    uint64 notB30 = ~b[5*3 + (0+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*3 + 0] = b[5*3 + 0] ^ (notB30 & b[5*3 + (0+2)%5]);
    uint64 notB31 = ~b[5*3 + (1+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*3 + 1] = b[5*3 + 1] ^ (notB31 & b[5*3 + (1+2)%5]);
    uint64 notB32 = ~b[5*3 + (2+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*3 + 2] = b[5*3 + 2] ^ (notB32 & b[5*3 + (2+2)%5]);
    uint64 notB33 = ~b[5*3 + (3+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*3 + 3] = b[5*3 + 3] ^ (notB33 & b[5*3 + (3+2)%5]);
    uint64 notB34 = ~b[5*3 + (4+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*3 + 4] = b[5*3 + 4] ^ (notB34 & b[5*3 + (4+2)%5]);
    uint64 notB40 = ~b[5*4 + (0+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*4 + 0] = b[5*4 + 0] ^ (notB40 & b[5*4 + (0+2)%5]);
    uint64 notB41 = ~b[5*4 + (1+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*4 + 1] = b[5*4 + 1] ^ (notB41 & b[5*4 + (1+2)%5]);
    uint64 notB42 = ~b[5*4 + (2+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*4 + 2] = b[5*4 + 2] ^ (notB42 & b[5*4 + (2+2)%5]);
    uint64 notB43 = ~b[5*4 + (3+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*4 + 3] = b[5*4 + 3] ^ (notB43 & b[5*4 + (3+2)%5]);
    uint64 notB44 = ~b[5*4 + (4+1)%5]; // CVL: ~ on uint64 may produce 256-bit result
    a[5*4 + 4] = b[5*4 + 4] ^ (notB44 & b[5*4 + (4+2)%5]);
    return a;
}

function iota(uint64[25] a, uint256 round) returns uint64[25] {
    // 24 round constants for Keccak-f[1600]
    uint64[24] RC = [
        0x0000000000000001, 0x0000000000008082, 0x800000000000808A, 0x8000000080008000,
        0x000000000000808B, 0x0000000080000001, 0x8000000080008081, 0x8000000000008009,
        0x000000000000008A, 0x0000000000000088, 0x0000000080008009, 0x000000008000000A,
        0x000000008000808B, 0x800000000000008B, 0x8000000000008089, 0x8000000000008003,
        0x8000000000008002, 0x8000000000000080, 0x000000000000800A, 0x800000008000000A,
        0x8000000080008081, 0x8000000000008080, 0x0000000080000001, 0x8000000080008008
    ];
    a[0] = a[0] ^ RC[round];
    return a;
}

function mask64(uint256 x) returns uint64 {
    return to_uint64(x & 0xFFFFFFFFFFFFFFFF);
}

function keccakF1600(uint64[25] a) returns uint64[25] {
    uint a00 = iota(chi(rhoPi(theta(a))), 5*0+0);
    uint a01 = iota(chi(rhoPi(theta(a00))), 5*0+1);
    uint a02 = iota(chi(rhoPi(theta(a01))), 5*0+2);
    uint a03 = iota(chi(rhoPi(theta(a02))), 5*0+3);
    uint a04 = iota(chi(rhoPi(theta(a03))), 5*0+4);
    uint a10 = iota(chi(rhoPi(theta(a04))), 5*1+0);
    uint a11 = iota(chi(rhoPi(theta(a10))), 5*1+1);
    uint a12 = iota(chi(rhoPi(theta(a11))), 5*1+2);
    uint a13 = iota(chi(rhoPi(theta(a12))), 5*1+3);
    uint a14 = iota(chi(rhoPi(theta(a13))), 5*1+4);
    uint a20 = iota(chi(rhoPi(theta(a14))), 5*2+0);
    uint a21 = iota(chi(rhoPi(theta(a20))), 5*2+1);
    uint a22 = iota(chi(rhoPi(theta(a21))), 5*2+2);
    uint a23 = iota(chi(rhoPi(theta(a22))), 5*2+3);
    uint a24 = iota(chi(rhoPi(theta(a23))), 5*2+4);
    uint a30 = iota(chi(rhoPi(theta(a24))), 5*3+0);
    uint a31 = iota(chi(rhoPi(theta(a30))), 5*3+1);
    uint a32 = iota(chi(rhoPi(theta(a31))), 5*3+2);
    uint a33 = iota(chi(rhoPi(theta(a32))), 5*3+3);
    uint a34 = iota(chi(rhoPi(theta(a33))), 5*3+4);
    uint a40 = iota(chi(rhoPi(theta(a34))), 5*4+0);
    uint a41 = iota(chi(rhoPi(theta(a40))), 5*4+1);
    uint a42 = iota(chi(rhoPi(theta(a41))), 5*4+2);
    uint a43 = iota(chi(rhoPi(theta(a42))), 5*4+3);
    uint a44 = iota(chi(rhoPi(theta(a43))), 5*4+4);
    return a44;
}

function keccak256_20(bytes20 input) returns bytes32 {
    // 1. Build the padded 136-byte block
    bytes padded; // bytes type in CVL; you must construct the block byte-by-byte
    // Initialize all 136 bytes to 0x00
    // Copy the 20 input bytes into the first 20 positions
    // Set byte 20 to 0x01
    // Set byte 135 to 0x80 (the final bit of pad10*1)

    // 2. Initialize the 1600-bit state to all zeros
    uint64[25] state;

    // 3. Absorb the single 136-byte block
    // The rate is 1088 bits = 17 lanes of 64 bits.
    // XOR each of the 17 lanes from the padded block into the state.
    uint64 lane0 = extractLane(padded, 0 * 8); // implement byte-to-lane extraction
    require state[0] == 0 ^ lane0;
    uint64 lane1 = extractLane(padded, 1 * 8); // implement byte-to-lane extraction
    require state[1] == 0 ^ lane1;
    uint64 lane2 = extractLane(padded, 2 * 8); // implement byte-to-lane extraction
    require state[2] == 0 ^ lane2;
    uint64 lane3 = extractLane(padded, 3 * 8); // implement byte-to-lane extraction
    require state[3] == 0 ^ lane3;
    uint64 lane4 = extractLane(padded, 4 * 8); // implement byte-to-lane extraction
    require state[4] == 0 ^ lane4;
    uint64 lane5 = extractLane(padded, 5 * 8); // implement byte-to-lane extraction
    require state[5] == 0 ^ lane5;
    uint64 lane6 = extractLane(padded, 6 * 8); // implement byte-to-lane extraction
    require state[6] == 0 ^ lane6;
    uint64 lane7 = extractLane(padded, 7 * 8); // implement byte-to-lane extraction
    require state[7] == 0 ^ lane7;
    uint64 lane8 = extractLane(padded, 8 * 8); // implement byte-to-lane extraction
    require state[8] == 0 ^ lane8;
    uint64 lane9 = extractLane(padded, 9 * 8); // implement byte-to-lane extraction
    require state[9] == 0 ^ lane9;
    uint64 lane10 = extractLane(padded, 10 * 8); // implement byte-to-lane extraction
    require state[10] == 0 ^ lane10;
    uint64 lane11 = extractLane(padded, 11 * 8); // implement byte-to-lane extraction
    require state[11] == 0 ^ lane11;
    uint64 lane12 = extractLane(padded, 12 * 8); // implement byte-to-lane extraction
    require state[12] == 0 ^ lane12;
    uint64 lane13 = extractLane(padded, 13 * 8); // implement byte-to-lane extraction
    require state[13] == 0 ^ lane13;
    uint64 lane14 = extractLane(padded, 14 * 8); // implement byte-to-lane extraction
    require state[14] == 0 ^ lane14;
    uint64 lane15 = extractLane(padded, 15 * 8); // implement byte-to-lane extraction
    require state[15] == 0 ^ lane15;
    uint64 lane16 = extractLane(padded, 16 * 8); // implement byte-to-lane extraction
    require state[16] == 0 ^ lane16;

    // 4. Apply the permutation
    uint64[25] state2 = keccakF1600(state);

    // 5. Squeeze the first 256 bits (lanes 0..3) as the hash
    bytes32 result;
    // Pack state[0]..state[3] into a bytes32 in little-endian lane order
    return packLanes(state2[0], state2[1], state2[2], state2[3]);
}nts for Keccak-f[1600]
    uint64[24] RC = [
        0x0000000000000001, 0x0000000000008082, 0x800000000000808A, 0x8000000080008000,
        0x000000000000808B, 0x0000000080000001, 0x8000000080008081, 0x8000000000008009,
        0x000000000000008A, 0x0000000000000088, 0x0000000080008009, 0x000000008000000A,
        0x000000008000808B, 0x800000000000008B, 0x8000000000008089, 0x8000000000008003,
        0x8000000000008002, 0x8000000000000080, 0x000000000000800A, 0x800000008000000A,
        0x8000000080008081, 0x8000000000008080, 0x0000000080000001, 0x8000000080008008
    ];
    a[0] = a[0] ^ RC[round];
    return a;
}

function mask64(uint256 x) returns uint64 {
    return to_uint64(x & 0xFFFFFFFFFFFFFFFF);
}

function keccakF1600(uint64[25] a) returns uint64[25] {
    for (uint round = 0; round < 24; round++) {
        a = theta(a);
        a = rhoPi(a);
        a = chi(a);
        a = iota(a, round);
    }
    return a;
}

function keccak256_20(bytes20 input) returns bytes32 {
    // 1. Build the padded 136-byte block
    bytes padded; // bytes type in CVL; you must construct the block byte-by-byte
    // Initialize all 136 bytes to 0x00
    // Copy the 20 input bytes into the first 20 positions
    // Set byte 20 to 0x01
    // Set byte 135 to 0x80 (the final bit of pad10*1)

    // 2. Initialize the 1600-bit state to all zeros
    uint64[25] state;

    // 3. Absorb the single 136-byte block
    // The rate is 1088 bits = 17 lanes of 64 bits.
    // XOR each of the 17 lanes from the padded block into the state.
    for (uint i = 0; i < 17; i++) {
        uint64 lane = extractLane(padded, i * 8); // implement byte-to-lane extraction
        state[i] = state[i] ^ lane;
    }

    // 4. Apply the permutation
    state = keccakF1600(state);

    // 5. Squeeze the first 256 bits (lanes 0..3) as the hash
    bytes32 result;
    // Pack state[0]..state[3] into a bytes32 in little-endian lane order
    return packLanes(state[0], state[1], state[2], state[3]);
}
```

Il problema più evidente è il `for` che non esiste così. Ma sono solo 25 iterazioni, quindi li srotolo a mano, per esempio:

```CVL
function theta(uint64[25] a) returns uint64[25] {
    uint64[5] C;
    uint64[5] D;
    C[0] = a[5*0 + 0] ^ a[5*1 + 0] ^ a[5*2 + 0] ^ a[5*3 + 0] ^ a[5*4 + 0];
    C[1] = a[5*0 + 1] ^ a[5*1 + 1] ^ a[5*2 + 1] ^ a[5*3 + 1] ^ a[5*4 + 1];
    C[2] = a[5*0 + 2] ^ a[5*1 + 2] ^ a[5*2 + 2] ^ a[5*3 + 2] ^ a[5*4 + 2];
    C[3] = a[5*0 + 3] ^ a[5*1 + 3] ^ a[5*2 + 3] ^ a[5*3 + 3] ^ a[5*4 + 3];
    C[4] = a[5*0 + 4] ^ a[5*1 + 4] ^ a[5*2 + 4] ^ a[5*3 + 4] ^ a[5*4 + 4];
    D[0] = C[(0 + 4) % 5] ^ rotl(C[(0 + 1) % 5], 1);
    D[1] = C[(1 + 4) % 5] ^ rotl(C[(1 + 1) % 5], 1);
    D[2] = C[(2 + 4) % 5] ^ rotl(C[(2 + 1) % 5], 1);
    D[3] = C[(3 + 4) % 5] ^ rotl(C[(3 + 1) % 5], 1);
    D[4] = C[(4 + 4) % 5] ^ rotl(C[(4 + 1) % 5], 1);
    a[5*0 + 0] = a[5*0 + 0] ^ D[0]; a[5*1 + 0] = a[5*1 + 0] ^ D[0]; a[5*2 + x] = a[5*2 + 0] ^ D[0]; a[5*3 + 0] = a[5*3 + 0] ^ D[0]; a[5*4 + 0] = a[5*4 + 0] ^ D[0];
    a[5*0 + 1] = a[5*0 + 1] ^ D[1]; a[5*1 + 1] = a[5*1 + 1] ^ D[1]; a[5*2 + x] = a[5*2 + 1] ^ D[1]; a[5*3 + 1] = a[5*3 + 1] ^ D[1]; a[5*4 + 1] = a[5*4 + 1] ^ D[1];
    a[5*0 + 2] = a[5*0 + 2] ^ D[2]; a[5*1 + 2] = a[5*1 + 2] ^ D[2]; a[5*2 + x] = a[5*2 + 2] ^ D[2]; a[5*3 + 2] = a[5*3 + 2] ^ D[2]; a[5*4 + 2] = a[5*4 + 2] ^ D[2];
    a[5*0 + 3] = a[5*0 + 3] ^ D[3]; a[5*1 + 3] = a[5*1 + 3] ^ D[3]; a[5*2 + x] = a[5*2 + 3] ^ D[3]; a[5*3 + 3] = a[5*3 + 3] ^ D[3]; a[5*4 + 3] = a[5*4 + 3] ^ D[3];
    a[5*0 + 4] = a[5*0 + 4] ^ D[4]; a[5*1 + 4] = a[5*1 + 4] ^ D[4]; a[5*2 + x] = a[5*2 + 4] ^ D[4]; a[5*3 + 4] = a[5*3 + 4] ^ D[4]; a[5*4 + 4] = a[5*4 + 4] ^ D[4];
    return a;
}
```

Mi arrendo. Fa tutto schifo. Per i curiosi lettori, il tentativo abbandonato si trova [su GitHub](https://github.com/Eic17H/contracts-verification-benchmark/blob/14ae37a515b2e61fd36c4202dda537c54b6abc1d/contracts/social_recovery_wallet/certora/recov-succeeds.spec).

Cos'ho imparato? Niente onestamente. Ok un po' il comportamento della funzione hash ma non mi serve a niente.