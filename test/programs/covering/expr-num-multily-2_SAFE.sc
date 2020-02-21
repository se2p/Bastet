program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare a as number
        declare b as number
        define a as 1
        define b as 1
        if a * b = 1 then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

