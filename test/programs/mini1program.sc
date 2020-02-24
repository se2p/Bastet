program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare x as number
        define x as 42
        if (x > 64) then begin
            _RUNTIME_signalFailure("This must not happen!")
        end
    end

end

