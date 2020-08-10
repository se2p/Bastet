program P4_PitcherAndCatcher

actor Bug is ScratchSprite begin

    image beetle "beetle.svg"

    declare code as int

    script on bootstrap do begin
        define code as 0
    end

    script on startup do begin
        changeCostumeTo("beetle")
        hide()
        until not code = 1 repeat begin
        end
        show()
        _RUNTIME_signalFailure("Pin guessed")
    end

    script on message "1" () in "USER" do begin
        define code as code * 10
        define code as code + 1
    end
end

actor Symbol1 is ScratchSprite begin

    image symbol "1.svg"

    script on startup do begin
        changeCostumeTo("symbol")
        goTo(0-70, 0-100)
    end

    script on message "SPRITE_CLICK" () in "SYSTEM" do begin
        broadcast "1"
    end
end

