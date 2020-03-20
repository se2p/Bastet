program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare x as number
        declare y as number

        define x as 42
        define y as x

        until not (x > 0) repeat begin
            define x as x - 1
            define y as y - 1
        end

        if (x = y) then begin
            _RUNTIME_signalFailure()
        end
    end

end

