program Task8Program

actor Stage is ScratchStage begin
    sound Plopp 83a9787d4cb6f3b7632b4ddfebf74367.wav
    image Bühnenbild1 78d212878a6f0a2b3067aa2c8bca28e1.png
    image Hintergrund-Manege-klein d6aca145c741a1b12309267dcecdbd49.svg
    image Hintergrund-Affenjagd 82571467d6b67128680f8d0dd6759285.svg

    declare attribute “volume” as number
    declare attribute “layerOrder” as number
    declare attribute “tempo” as number
    declare attribute “videoTransparency” as number
    declare attribute “videoState” as string
    define attribute “volume” as 100.0
    define attribute “layerOrder” as 0.0
    define attribute “tempo” as 60.0
    define attribute “videoTransparency” as 50.0
    define attribute “videoState” as “off”
end

actor Katze is ScratchSprite begin
    sound Plopp 83a9787d4cb6f3b7632b4ddfebf74367.wav
    image Katze 3d7f996ef89da170e7ca4f4eca54c2f1.svg

    declare attribute “volume” as number
    declare attribute “layerOrder” as number
    declare attribute “visible” as boolean
    declare attribute “x” as number
    declare attribute “y” as number
    declare attribute “size” as number
    declare attribute “direction” as number
    declare attribute “draggable” as boolean
    declare attribute “rotationStyle” as string

    define attribute “volume” as 100.0
    define attribute “layerOrder” as 2.0
    define attribute “visible” as true
    define attribute “x” as -163.0
    define attribute “y” as 8.0
    define attribute “size” as 40.0
    define attribute “direction” as 90.0
    define attribute “draggable” as false
    define attribute “rotationStyle” as “left-right”

    script on green flag do begin
        repeat forever begin
            if touchingObject(“Ball”) then begin
                sayTextFor(“Hab ich dich!”, 2.0 secs)
            end
        end
    end
end

actor Ball is ScratchSprite begin
    sound Plopp 83a9787d4cb6f3b7632b4ddfebf74367.wav
    image Ball 3d3db5d45e234325c584375f0325123f.svg

    declare attribute “volume” as number
    declare attribute “layerOrder” as number
    declare attribute “visible” as boolean
    declare attribute “x” as number
    declare attribute “y” as number
    declare attribute “size” as number
    declare attribute “direction” as number
    declare attribute “draggable” as boolean
    declare attribute “rotationStyle” as string

    define attribute “volume” as 100.0
    define attribute “layerOrder” as 1.0
    define attribute “visible” as true
    define attribute “x” as 22.0
    define attribute “y” as 19.0
    define attribute “size” as 55.0
    define attribute “direction” as 90.0
    define attribute “draggable” as false
    define attribute “rotationStyle” as “all around”
end
