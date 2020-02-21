program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare x as boolean
        define x as false
        if not x then begin
        end else
            _RUNTIME_signalFailure()
        end
    end

end

