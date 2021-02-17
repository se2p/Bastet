program Mini1Program

actor Worker is ScratchSprite begin
    script on startup do begin
        declare x as integer
        define x as randomBetween(1, 100)
        if (x = 22) then begin
           _RUNTIME_signalFailure("The costume must change within 1.2s")
        end
    end
end


