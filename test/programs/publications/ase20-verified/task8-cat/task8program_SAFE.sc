program Task8Program

actor Stage is ScratchStage begin
    image Buhnenbild1 "3.png"
    image HintergrundManegeklein "4.svg"
    image HintergrundAffenjagd "5.svg"
end

actor Katze is ScratchSprite begin
    image Katze "2.svg"

    declare ball as actor
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
end
