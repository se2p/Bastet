program P4_PitcherAndCatcher

actor Catcher is ScratchSprite begin

    script on startup do begin
        epsilon
        repeat forever begin
            moveSteps(10)
        end
    end
end
