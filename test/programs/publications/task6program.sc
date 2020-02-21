program Task6Program

actor Stage is ScratchStage begin

end

actor Monkey is ScratchSprite begin

end

actor CircusDirector is ScratchSprite begin

    script on startup do begin
        repeat forever begin
            pointTowards("Monkey")
            moveSteps(1)
        end
    end

end

