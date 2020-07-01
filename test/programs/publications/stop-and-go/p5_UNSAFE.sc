program P5_CarAndStopSign

actor StopSign is ScratchSprite begin
    image StopSign "0.svg"

    script on bootstrap do begin
        goTo(200, 100)
        changeActiveGraphicTo("StopSign")
    end
end

actor Car is ScratchSprite begin
    image Car "1.svg"

    script on bootstrap do begin
        goTo(50, 50)
        changeActiveGraphicTo("Car")
    end

    script on startup do begin
        declare stopSign as actor
        define stopSign as locate actor "StopSign"

        pointTowards(stopSign)
        moveSteps(20)
        pointTowards(stopSign)
        moveSteps(20)
        pointTowards(stopSign)
        moveSteps(20)
        pointTowards(stopSign)
        moveSteps(20)
    end
end