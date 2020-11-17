program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        wait 1 seconds
        wait 1 seconds
        wait 1 seconds
        if timer > 2 then begin
            _RUNTIME_signalFailure()
        end
    end

end

actor FooActor is RuntimeEntity begin

    script on startup do begin
        declare x as int
        define x as 42
        until x = 0 repeat begin
            define x as x - 1
        end
    end

end
