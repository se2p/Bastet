program Mini1Program

actor MiniActor is RuntimeEntity begin

    declare x as int
    define x as 1

    script on startup do begin
        wait until x = 1
        define x as 2
        wait until x = 3
        _RUNTIME_signalFailure()
    end

    script on startup do begin
        wait until x = 2
        define x as 4
    end

end

