program P5_CarAndStopSign

actor StopSign is ScratchSprite begin
    script on bootstrap do begin
        goTo(200, 100)
    end
end

actor Car is ScratchSprite begin
    script on bootstrap do begin
        goTo(50, 50)
    end

    script on startup do begin
        declare stopSign as actor
        define stopSign as locate actor "StopSign"
        pointTowards(stopSign)
    end
end