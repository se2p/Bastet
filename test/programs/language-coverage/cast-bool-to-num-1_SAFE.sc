program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare b as boolean
        declare n as number

        define b as true
        define n as cast b to number

        if not (n = 1) then begin
            _RUNTIME_signalFailure()
        end
    end

end

