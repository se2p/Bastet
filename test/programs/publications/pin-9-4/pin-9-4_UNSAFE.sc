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

    script on message "0" () in "USER" do begin
        define code as code * 10
    end

    script on message "1" () in "USER" do begin
        define code as code * 10
        define code as code + 1
    end

    script on message "2" () in "USER" do begin
        define code as code * 10
        define code as code + 2
    end

    script on message "3" () in "USER" do begin
        define code as code * 10
        define code as code + 3
    end

    script on message "4" () in "USER" do begin
        define code as code * 10
        define code as code + 4
    end

    script on message "5" () in "USER" do begin
        define code as code * 10
        define code as code + 5
    end

    script on message "6" () in "USER" do begin
        define code as code * 10
        define code as code + 6
    end

    script on message "7" () in "USER" do begin
        define code as code * 10
        define code as code + 7
    end

    script on message "8" () in "USER" do begin
        define code as code * 10
        define code as code + 8
    end

    script on message "9" () in "USER" do begin
        define code as code * 10
        define code as code + 9
    end
end

actor Symbol0 is ScratchSprite begin

    image symbol "0.svg"

    script on startup do begin
        changeCostumeTo("symbol")
    end

    script on message "SPRITE_CLICK" () in "SYSTEM" do begin
        _RUNTIME_signalFailure("Click received")
        broadcast "0"
    end
end

actor Symbol1 is ScratchSprite begin

    image symbol "1.svg"

    script on startup do begin
        changeCostumeTo("symbol")
    end

    script on message "SPRITE_CLICK" () in "SYSTEM" do begin
        broadcast "1"
    end
end

actor Symbol2 is ScratchSprite begin

    image symbol "2.svg"

    script on startup do begin
        changeCostumeTo("symbol")
    end

    script on message "SPRITE_CLICK" () in "SYSTEM" do begin
        broadcast "2"
    end
end

actor Symbol3 is ScratchSprite begin

    image symbol "3.svg"

    script on startup do begin
        changeCostumeTo("symbol")
    end

    script on message "SPRITE_CLICK" () in "SYSTEM" do begin
        broadcast "3"
    end
end

actor Symbol4 is ScratchSprite begin

    image symbol "4.svg"

    script on startup do begin
        changeCostumeTo("symbol")
    end

    script on message "SPRITE_CLICK" () in "SYSTEM" do begin
        broadcast "4"
    end
end


