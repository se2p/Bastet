program Task8Program

actor Stage is ScratchStage begin
    image Buhnenbild1 "3.png"
    image HintergrundManegeklein "4.svg"
    image HintergrundAffenjagd "5.svg"

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
    image Katze "2.svg"

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
            end
        end
    end
end

actor Ball is ScratchSprite begin
    image Ball "1.svg"


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
