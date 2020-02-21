program Mini1Program

actor MiniActor1 is RuntimeEntity begin

    script on startup do begin
        wait 2 seconds
        reset timer
    end

end

actor MiniActor2 is RuntimeEntity begin

    script on startup do begin
        wait 4 seconds
        if (timer > 3) then begin
            _RUNTIME_signalFailure()
        end
    end

end

