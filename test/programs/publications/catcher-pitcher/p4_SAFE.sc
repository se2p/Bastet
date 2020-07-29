program P4_PitcherAndCatcher

actor Catcher is ScratchSprite begin

    image waiting "catcher_waiting.svg"
    image caught "catcher_caught.svg"
    declare moving as boolean


    script on startup do begin
        define moving as true
        changeCostumeTo("waiting")

        until not moving repeat begin
            moveSteps(10)
            wait 1 seconds
            moveSteps(0-10)
        end
    end

    script on message "SPRITE_CLICK" () do begin
        define moving as false
        changeCostumeTo("caught")
    end
end
