program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare b as boolean
        define b as false
        declare x as number
        define x as (cast b to number)
        if x = 1 then begin
            _RUNTIME_signalFailure()
        end
    end

end
