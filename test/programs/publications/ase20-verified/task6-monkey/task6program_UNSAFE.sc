program Task6Program

actor Stage is ScratchStage begin

end

actor strid "Affe" is ScratchSprite begin

end

actor strid "Zirkusdirektor-rennend" is ScratchSprite begin

    script on startup do begin
        repeat forever begin
            pointTowards(locate actor "Affe")
        end
    end

end

