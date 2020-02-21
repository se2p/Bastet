program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare x as number
        define x as 42
        define y as x
        until x > 0 repeat begin
            define x as x - 1
        end
        if (x = x - y) begin
            _RUNTIME_signalFailure()
        end
    end

end

