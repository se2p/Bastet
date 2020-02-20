program Task8Program

actor Stage is ScratchStage begin
    // TODO: The URIs must be strings (in quotes)
    sound Plopp "83a9787d4cb6f3b7632b4ddfebf74367.wav"
    image Buhnenbild1 "78d212878a6f0a2b3067aa2c8bca28e1.png"
    image HintergrundManegeklein "d6aca145c741a1b12309267dcecdbd49.svg"
    image HintergrundAffenjagd "82571467d6b67128680f8d0dd6759285.svg"

    declare volume as number
    declare layerOrder as number
    declare tempo as number
    declare videoTransparency as number
    declare videoState as string
    define volume as 100.0
    define layerOrder as 0.0
    define tempo as 60.0
    define videoTransparency as 50.0
    define videoState as "off"
end

actor Katze is ScratchSprite begin
    sound Plopp "83a9787d4cb6f3b7632b4ddfebf74367.wav"
    image Katze "3d7f996ef89da170e7ca4f4eca54c2f1.svg"

    declare volume as number
    declare layerOrder as number
    declare visible as boolean
    declare x as number
    declare y as number
    declare size as number
    declare direction as number
    declare draggable as boolean
    declare rotationStyle as string

    define volume as 100.0
    define layerOrder as 2.0
    define visible as true
    define x as 0-163.0
    define y as 8.0
    define size as 40.0
    define direction as 90.0
    define draggable as false
    define rotationStyle as "left-right"

    script on startup do begin
        repeat forever begin
            if touchingObject("Ball") then begin
                // TOOD: Parsing might not work here
                sayTextFor("Hab ich dich!", 2.0)
            end
        end
    end
end

actor Ball is ScratchSprite begin
    sound Plopp "83a9787d4cb6f3b7632b4ddfebf74367.wav"
    image Ball "3d3db5d45e234325c584375f0325123f.svg"

    declare volume as number
    declare layerOrder as number
    declare visible as boolean
    declare x as number
    declare y as number
    declare size as number
    declare direction as number
    declare draggable as boolean
    declare rotationStyle as string

    define volume as 100.0
    define layerOrder as 1.0
    define visible as true
    define x as 22.0
    define y as 19.0
    define size as 55.0
    define direction as 90.0
    define draggable as false
    define rotationStyle as "all around"
end
