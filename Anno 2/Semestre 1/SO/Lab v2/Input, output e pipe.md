---
cssclasses:
  - so
---
Scusate lo devo ancora tradurre.

󱥂󱥵cat󱤡󱥞󱤘󱤮󱤉󱤌󱥍󱤏󱤪󱥳
󱥂󱥵head󱤡󱥞󱤘󱤮󱤉󱤩󱥬󱤽󱥳󱥍󱥡󱤖
󱥞󱤘󱥌󱤉󱥡󱤖󱤙󱤿󱤼
    󱥳󱤡󱤎󱥠
    󱥳󱤆󱤡󱥠󱥵<
󱥠󱥵<󱤡󱥞󱥌󱤉󱥡󱥩󱥂󱥵

󱥂󱥵󱤧󱤘󱥌󱥹󱤉󱥡󱤙󱥠󱥵>
󱥠>󱤡󱤄󱤧󱥶󱤡󱤌󱤧󱥌
󱥠>>󱤡󱤄󱤧󱤈󱤬󱤡󱤌󱤧󱥌

󱥂󱥵ls󱤧󱥬
  $ ls /home/user
    Dati Documenti Scrivania
󱥆󱤧󱤙󱥌󱤉󱥬󱥩󱤪
    󱤽󱥳󱤡󱤎󱤧󱥉󱤉󱤪
    󱤽󱥮󱤡󱤎󱤧󱥠󱤬󱤪
󱥠>󱤡󱥁
  $ ls -C /home/user > output_data
  $ cat output_data
    Dati Documenti Scrivania output_data
󱥁󱤧󱥞󱤘󱥠>>󱤡󱥆󱤧󱤖󱥁
  $ ls -C /home/user >> output_data
  $ cat output_data
    Dati Documenti Scrivania output_data

󱤴󱥷󱤮󱤉󱤌󱤡󱤌󱤧󱤬󱤂󱤡󱤎󱤧󱥬󱤉󱥈
󱤴󱤘󱥌󱤉󱥬󱥈󱥩󱤪󱤙󱥠2>
  $ ls /home/user/nililonala 2> error_data
  $ cat error_data
    ls: '/home/user/nililonala'󱤡󱤴󱤘󱤂󱤮󱤉󱥆󱥧󱥁󱥆󱤧󱤬󱤂

󱤿󱥩󱥬󱥮‍󱥳󱤧󱥁
    standard input
    standard output
    standard error

󱥁󱤧󱥌󱤉󱥬󱥍󱥂󱥵󱥩󱤪
󱤘󱤡󱥞󱥷󱥌󱤉󱥬󱥍󱥂󱥵󱥩󱥂󱥵󱤆
󱥁󱤧󱤙󱤿󱥍󱤆󱥩󱥠<

󱤘󱤡󱥞󱥷󱤮󱤉󱤌󱥍󱤬󱥓󱥨󱥆󱤧󱤼
󱤌󱤧󱤼󱤡󱥂󱥵more󱤧󱥻󱤉󱥆
ls > 󱤪, 󱥌󱤉󱤪󱥩more
󱥧󱥞󱥷󱤉󱤪󱤂󱤉󱥬󱥧
󱥞󱤘󱤙󱥠|
󱥂󱥍󱥠󱥁󱤧pipe
󱤿󱥁󱤧󱤿pipeline
  $ ls | more

󱥂󱥵tee󱤧󱥉󱥍󱥠>
       󱤧󱥉󱥍󱥠|
󱥆󱤧󱤙󱤿standard input

󱤘󱤡󱥞󱥷󱤂󱤉󱤿standard input󱤧󱥷󱥌󱤉󱥸option
󱥞󱤘󱥁󱤙󱤿command substitution
  $ echo "/home/janKapi/supa/kalamamusi/" > pokipikalamamusi
  $ cd 'cat pokipikalamamusi'
󱤿pipe󱤧󱤘󱤂󱥁

󱥁󱤧󱤘󱤾󱤉󱥡󱤑󱤡󱥄󱥡󱤉󱥁
    󱥞󱥷󱤉󱥸󱥍󱥂󱥵󱤡󱥄󱤙󱤿'command substitution'
    󱥞󱥷󱥌󱤉󱥡󱤽󱤡󱥄󱤙󱤿|pipeline