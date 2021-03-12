program Mini1Program

actor Worker begin

    declare x as int

    script on bootstrap do begin
        define x as 0
    end

    script on startup do begin
        repeat forever begin
            if x = 0 then begin
                define x as 1
            end else begin
                define x as 0
            end
        end
    end

end

actor Boss begin

    declare o as actor
    declare last_x as int
    declare last_change as int

    extern _RUNTIME_signalFailure ()

    extern _RUNTIME_micros () returns integer

    define atomic checkBehaviorSatisfied () begin
        declare current_x as int
        define current_x as cast attribute "x" of o to int

        if not (current_x = last_x) then begin
           define last_change as _RUNTIME_micros()
        end

        if _RUNTIME_micros() - last_change > 1200000 then begin
           _RUNTIME_signalFailure("The costume must change within 1.2s")
        end

        define last_x as current_x
    end

    script on bootstrap finished do begin
        define last_change as _RUNTIME_micros()
        define o as locate actor "Worker"
        define last_x as cast attribute "x" of o to int

        checkBehaviorSatisfied()
    end

    script on statement finished do begin
        checkBehaviorSatisfied()
    end

end


