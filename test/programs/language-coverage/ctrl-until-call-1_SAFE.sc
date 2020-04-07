program Mini1Program

// This is an IMPORTANT test program
actor MiniActor is RuntimeEntity begin

    declare x as int

    define atomic foo () begin
        define x as 42
        if not (x = 42) then begin
            _RUNTIME_signalFailure()
        end
    end

    script on startup do begin
        declare rad as int
        define rad as 360

        define rad as rad - 36
        until rad < 0 repeat begin
            define rad as rad - 36
            foo()
        end
    end

end

