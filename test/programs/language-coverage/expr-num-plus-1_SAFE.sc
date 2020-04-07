program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare a as int
        declare b as int
        define a as 1
        define b as 2
        if a + b = 3 then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

