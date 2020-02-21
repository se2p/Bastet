program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare a as number
        declare b as number
        define a as 0
        define b as 1
        if a * b = 0 then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

