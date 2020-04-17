program Mini1Program

// This is an IMPORTANT test program
actor MiniActor is RuntimeEntity begin

    declare x as int

    define atomic foo (p: int) begin
        define x as 42
        if not (x = 42) then begin
            _RUNTIME_signalFailure()
        end
    end

    script on startup do begin
        repeat forever begin
            declare i as int
            define i as 0
            until i = 10 repeat begin
                foo(i)
                define i as i + 1
            end
        end
    end

end

