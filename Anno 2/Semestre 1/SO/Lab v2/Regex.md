---
cssclasses:
  - so
---
Anche questo è ancora da tradurre.

󱤿Regex󱤧󱤘󱥔󱤼󱥩󱥉󱥞
󱥆󱤧󱤘󱥌󱤉󱤮󱥁
    󱥠󱤼󱤧󱤿󱥳
󱥁󱤧󱥡Pattern Matching󱤧󱤃󱥠󱥍󱥍󱤡0

󱥞󱤘󱥉󱤉󱥉󱤎󱤙󱥬󱤎󱤼
󱥞󱤘󱥉󱤉󱤃󱥠󱤙󱥬󱤎󱤼
󱥄󱤮󱤼󱤉󱤪Slide

󱥁󱤧󱥠󱥵
    .     󱤡󱥠󱥳󱥍󱤘󱤄
    ^     󱤡󱥇󱥬
    $     󱤡󱥐󱥬
    \     󱤧󱥶󱤉󱥵󱥧󱥠󱥳
    [...] 󱤡󱥠󱥳󱥍󱤘󱤌󱤏
    [^...]󱤡󱥠󱥳󱥍󱤘󱤂󱤌󱤏
    [A-Z] 󱤡󱤽󱥠󱤧󱤨󱤂󱥩󱤽A󱤧󱥣󱤂󱥩󱤽Z
    [^A-Z]󱤡󱤌󱤌󱤌󱤧󱤘󱤂󱤌󱤌󱤌

󱥁󱤧󱥠󱥵󱥸
󱥠󱤧󱤬󱥁󱤬󱥫󱥍󱤼󱥙
    ?     󱤡󱤂󱤇󱥳󱥨
    +     󱤡󱥳󱤇󱥮󱤇󱤼
    *     󱤡󱤂󱤇󱥳󱤇󱥮󱤇󱤼
    {n}   󱤡󱤼󱦐n󱦑
    {n,}  󱤡󱤼󱦐n󱦑󱤇󱥣󱥩󱥆
    {,m}  󱤡󱤼󱦐m󱦑󱤇󱤨󱥩󱥆
    {n,m} 󱤡󱤼󱦐n󱦑󱤇󱤼󱦐m󱦑󱤇󱤼󱥍󱤬󱦂󱥆

󱥞󱥷󱤙󱤃󱥠RE󱤡󱤎󱦐󱤧󱤍󱥁󱥰󱦑󱤡󱥄󱤙󱥂󱥵grep(general regular expression print)
󱥄󱤮󱤉󱤪Slide
󱥞󱤘󱥳󱤉󱥂󱥵grep󱤉󱥂󱥵󱤆󱤙󱤿Pipeline
  $ echo "soweli li lanpan ala lanpan e soko" | grep a

󱥂󱥵sort󱤡󱥁
    󱥞󱥌󱤉󱤪
    󱤪󱤧󱤓󱤉󱤩󱤼
    󱤩󱥳󱤧󱤓󱤉󱥡󱤽󱤼
    󱥂󱥵sort󱤧󱤿󱤉󱥆
󱥞󱥌󱤂󱤉󱤽󱤡󱥆󱤧󱤙󱤽󱥡󱤽󱥳
󱤆󱤡󱥆󱤧󱤙󱤽󱥍󱥷󱥞
󱥞󱥷󱥌󱤉󱥷󱥞󱤙󱥸"-k 󱤽"

󱤿󱥇
    Eko     3
    Apa     1
    Insija  2
󱤽󱤂
    Apa     1
    Eko     3
    Insija  2
󱤽󱥮
    Apa     1
    Insija  2
    Eko     3

󱥫󱥁󱤡󱤴󱤙󱤎Bash
󱤖󱤡󱤴󱤖󱥉󱤉󱥉󱤎󱤙󱥆
󱥬󱤎󱥆󱤧󱦢󱤼󱤧󱤍󱤼󱥨󱤴󱤓󱤉󱥡󱥔󱥍󱥉󱥆

󱥂󱥵tr󱤧󱤆󱤉󱥠
󱥞󱥌󱤉󱤟󱥠󱥳󱤉󱤟󱥠󱤆󱤡󱥠󱥍󱤟󱤽󱥳󱤧󱤘󱥠󱥍󱤟󱤽󱥮
  $ echo 'alasa' | tr a-z A-Z
    ALASA
  $ cat lipu.txt | tr a-z A-Z > lipuante.txt
󱤪󱤖󱤊󱤪󱥌󱤧󱤘󱤂󱥖󱥧󱥁
    󱤽󱥳󱤡󱥉󱥵󱤧󱥶󱤉󱤄󱤬󱤪󱦐lipuante.txt󱦑
    󱤽󱥮󱤡󱥉󱥵󱤧󱤮󱤉󱤪󱦐lipu.txt󱦑󱤧󱤆󱤉󱤌󱥆
    󱤽󱥮‍󱥳󱤡󱥉󱥵󱤧󱥌󱤉󱤌󱥝󱥩󱤪󱦐lipuante.txt󱦑
󱥆󱥮󱤧󱥖󱤡󱤂󱤧󱤬

󱥄󱤮󱤉󱥂󱥵cut󱤉󱥂󱥵󱤆󱤄󱤬󱤪slide