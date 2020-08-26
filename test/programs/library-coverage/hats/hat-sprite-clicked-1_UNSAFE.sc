program Mini1Program

actor Cat is ScratchSprite begin

    image Costume1 "1.svg"

    script on bootstrap do begin
        changeCostumeTo("Costume1")
    end

    script on message "SPRITE_CLICK" () do begin
        repeat forever begin
            sayTextFor("Hello", 1)
            sayTextFor("world!", 1)
            _RUNTIME_signalFailure()
        end
    end

end

