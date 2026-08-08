$$\newcommand{\apply}{\textbf{apply}}
\newcommand{\fun}{\textbf{fun}}
\begin{matrix*}[l]
([],\bot,\apply(\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1))),\fun(h,z,sub(8,z)))::[])::[] & \mapsto & \text{Implementazione apply} \\
([],\bot,\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))::\fun(h,z,sub(8,z))::App::[])::[] & \mapsto & \text{Valutazione funzione} \\
(\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))::[],\bot,\fun(h,z,sub(8,z))::App::[])::[] & \mapsto & \text{Valutazione funzione} \\
(\fun(h,z,sub(8,z))::\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))::[],\bot,App::[])::[] & \mapsto & \text{Valutazione applicazione funzione} \\
([],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],\apply(x,\apply(\fun(g,y,mul(y,2)),1))::[])::([],\bot,[])::[] & \mapsto & \text{Implementazione apply} \\
([],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],x::\apply(\fun(g,y,mul(y,2)),1)::App::[])::([],\bot,[])::[] & \mapsto & \text{Valutazione variabile} \\
(\fun(h,z,sub(8,z))::[],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],\apply(\fun(g,y,mul(y,2)),1)::App::[])::([],\bot,[])::[] & \mapsto & \text{Implementazione apply} \\
(\fun(h,z,sub(8,z))::[],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],\fun(g,y,mul(y,2))::1::App::App::[])::([],\bot,[])::[] & \mapsto & \text{Valutazione funzione} \\
(\fun(g,y,mul(y,2))::\fun(h,z,sub(8,z))::[],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],1::App::App::[])::([],\bot,[])::[] & \mapsto & \text{Valutazione costante intera} \\
(1::\fun(g,y,mul(y,2))::\fun(h,z,sub(8,z))::[],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],App::App::[])::([],\bot,[])::[] & \mapsto & \text{Valutazione applicazione funzione} \\
([],\bot[f/\fun(g,y,mul(y,2))][y/1],mul(y,2)::[])::(\fun(h,z,sub(8,z))::[],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],App::[])::([],\bot,[])::[] & \mapsto & \text{Implementazione operatore} \\
([],\bot[f/\fun(g,y,mul(y,2))][y/1],y::2::Prim(mul)::[])::(\fun(h,z,sub(8,z))::[],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],App::[])::([],\bot,[])::[] & \mapsto & \text{Valutazione variabile} \\
(1::[],\bot[f/\fun(g,y,mul(y,2))][y/1],2::Prim(mul)::[])::(\fun(h,z,sub(8,z))::[],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],App::[])::([],\bot,[])::[] & \mapsto & \text{Valutazione costante} \\
(2::1::[],\bot[f/\fun(g,y,mul(y,2))][y/1],Prim(mul)::[])::(\fun(h,z,sub(8,z))::[],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],App::[])::([],\bot,[])::[] & \mapsto & \text{Valutazione operatore} \\
(2::[],\bot[f/\fun(g,y,mul(y,2))][y/1],[])::(\fun(h,z,sub(8,z))::[],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],App::[])::([],\bot,[])::[] & \mapsto & \text{Valutazione terminale} \\
(2::\fun(h,z,sub(8,z))::[],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],App::[])::([],\bot,[])::[] & \mapsto & \text{Valutazione applicazione funzione} \\
([],\bot[f/\fun(h,z,sub(8,z))][z/2],sub(8,z)::[])::([],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],[])::([],\bot,[])::[] & \mapsto & \text{Implementazione operatore} \\
([],\bot[f/\fun(h,z,sub(8,z))][z/2],8::z::Prim(sub)::[])::([],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],[])::([],\bot,[])::[] & \mapsto & \text{Valutazione costante intera} \\
(8::[],\bot[f/\fun(h,z,sub(8,z))][z/2],z::Prim(sub)::[])::([],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],[])::([],\bot,[])::[] & \mapsto & \text{Valutazione variabile} \\
(2::8::[],\bot[f/\fun(h,z,sub(8,z))][z/2],Prim(sub)::[])::([],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],[])::([],\bot,[])::[] & \mapsto & \text{Valutazione operatore} \\
(6::[],\bot[f/\fun(h,z,sub(8,z))][z/2],[])::([],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],[])::([],\bot,[])::[] & \mapsto & \text{Valutazione terminale} \\
(6::[],\bot[f/\fun(f,x,\apply(x,\apply(\fun(g,y,mul(y,2)),1)))][x/\fun(h,z,sub(8,z))],[])::([],\bot,[])::[] & \mapsto & \text{Valutazione terminale} \\
(6::[],\bot,[])::[] & \mapsto & \text{} \\
\end{matrix*}$$