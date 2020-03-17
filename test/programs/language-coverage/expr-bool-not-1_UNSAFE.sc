program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare x as boolean
        define x as true
        if not x then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

