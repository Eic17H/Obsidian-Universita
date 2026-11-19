---
cssclasses:
  - ip
---
Esercizio: data un'immagine, fai un'immagine per ogni componente connessa usando la morfologia matematica.

```MatLab
f = imread("Desktop/ten-objects.tif");
figure
imshow(f);
l = bwlabel(f);
figure;
for i = 1:max(l(:))
    subplot(4,3,i + (i>3) + (i>4));
    imshow(l == i);
end
```

![[Pasted image 20261119122433.png]]

Immagine originale:

![[Pasted image 20261119122512.png]]

