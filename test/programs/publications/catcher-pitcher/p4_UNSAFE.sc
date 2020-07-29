program P4_PitcherAndCatcher

actor Catcher is ScratchSprite begin

    image waiting "catcher_waiting.svg"
    image caught "catcher_caught.svg"

    script on startup do begin
        changeCostumeTo("waiting")

        repeat forever begin
            moveSteps(10)
            wait 1 seconds
            moveSteps(0-10)
        end
    end

    script on message "CLICK" () in "SYSTEM" do begin
        changeCostumeTo("caught")
    end
end
