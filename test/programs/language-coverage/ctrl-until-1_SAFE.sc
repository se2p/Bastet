program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare x as int
        define x as 42
        until x = 0 repeat begin
            define x as x - 1
        end
        if (x < 0) then begin
            _RUNTIME_signalFailure()
        end
    end

end

