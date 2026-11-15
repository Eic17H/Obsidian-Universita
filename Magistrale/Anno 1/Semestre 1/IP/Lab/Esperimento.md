---
cssclasses:
  - ip
---
Voglio prendere quest'immagine:

![[Pasted image 20261112110129.png]]

E capire cosa c'è scritto qui:

![[Pasted image 20261112110147.png]]

Ho capito che per fare il filtro nelle frequenze, se l'immagine è orizzontale, devo invertire le dimensioni nella creazione del filtro. E invece ora no, invece ora no, non so perché. Ho preso del codice da internet.

```MatLab
f=(im2gray(imread('Desktop/peso.jpeg')));
subplot(2,2,1); imshow(f);
xlabel('A gray scale image');
F=fft2(f,2*size(f,1)-1,2*size(f,2)-1);

[M, N] = size(f);
N = N*2-1;
M = M*2-1;

% Assign Cut-off Frequency  
D0 = 20; % one can change this value accordingly

% Designing filter
u = 0:(M-1);
idx = find(u>M/2);
u(idx) = u(idx)-M;
v = 0:(N-1);
idy = find(v>N/2);
v(idy) = v(idy)-N;

% MATLAB library function meshgrid(v, u) returns 2D grid
%  which contains the coordinates of vectors v and u. 
% Matrix V with each row is a copy of v, and matrix U 
% with each column is a copy of u
[V, U] = meshgrid(v, u);

% Calculating Euclidean Distance
D = sqrt(U.^2+V.^2);

% Comparing with the cut-off frequency and 
% determining the filtering mask
H = double(D > D0);


G=H.*F;
g=real(ifft2(G));
g=g(1:size(f,1), 1:size(f,2));
subplot(2,2,2); imshow(g, []);
xlabel('Result of filtering');
subplot(2,2,3); imshow(abs(g), []);
xlabel('The absolute value of g');
subplot(2,2,4);
imshow(abs(g) > 0.2*abs(max(g(:))));
xlabel('A thresholded binary image');
```