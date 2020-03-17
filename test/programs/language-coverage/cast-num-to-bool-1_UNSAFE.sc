program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare b as boolean
        declare n as number

        define n as 0
        define b as cast n to boolean

        if not b then begin
            _RUNTIME_signalFailure()
        end
    end

end
