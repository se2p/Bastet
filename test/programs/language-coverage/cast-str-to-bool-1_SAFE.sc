program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare b as boolean
        declare s as string

        define s as "true"
        define b as cast s to boolean

        if not b then begin
            _RUNTIME_signalFailure()
        end
    end

end
