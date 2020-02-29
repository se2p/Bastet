program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare a as number
        declare b as number
        define b as 2
        if a mod b < (b - 1) then begin
            _RUNTIME_signalFailure()
        end
    end

end

