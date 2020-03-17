program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare x as number
        define x as 42
        repeat forever begin
            define x as x - 1
            if not (x = x) then begin
                _RUNTIME_signalFailure()
            end
        end
    end

end

