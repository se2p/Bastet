program P5_CarAndStopSign

actor StopSign is ScratchSprite begin
    define y as 0
    define x as 0
end

actor Car is ScratchSprite begin
    define x as 100
    define y as 100

    script on startup do begin
        pointTowards(locate actor "StopSign")

        repeat forever begin
            wait 1 seconds
            moveSteps(10)
        end
    end
end