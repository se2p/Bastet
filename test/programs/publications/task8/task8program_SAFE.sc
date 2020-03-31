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
    define ball as locate actor "Ball"

    script on startup do begin
        repeat forever begin
            if touchingObject(ball) then begin
                sayTextFor("Hab ich dich!", 2.0)
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
end
