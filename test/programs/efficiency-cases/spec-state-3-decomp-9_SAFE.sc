program Mini

actor Subject begin

    declare x as int
    declare y as int
    declare z as int

    script on bootstrap do begin
        define x as 0
        define y as 0
        define z as 0
    end

    script on startup do begin
        until x = 10  repeat begin
            define y as 0
            until y = 5 repeat begin
                define y as y + 1
            end
            define x as x + 1
        end
    end

end

actor Checker begin

    declare a as actor
    declare lastX as int
    declare lastY as int

    declare state1 as int
    declare state2 as int
    declare state3 as int
    declare state4 as int
    declare state5 as int
    declare state6 as int
    declare state7 as int
    declare state8 as int
    declare state9 as int

    extern _RUNTIME_signalFailure ()

    define atomic check () begin
        declare currX as int
        define currX as cast attribute "x" of a to int
        declare currY as int
        define currY as cast attribute "y" of a to int
        declare currZ as int
        define currZ as cast attribute "z" of a to int

        if state1 = 0 then begin
            if currY = 1 then begin
                define state1 as 1
            end
        end else if state1 = 1 then begin
            if currY = 2 then begin
                define state1 as 2
            end
        end else if state1 = 2 then begin
            if not currZ = 0 then begin
                _RUNTIME_signalFailure("Property 1 violated")
            end
        end

        if state2 = 0 then begin
            if currY = 1 then begin
                define state2 as 1
            end
        end else if state2 = 1 then begin
            if currY = 2 then begin
                define state2 as 2
            end
        end else if state2 = 2 then begin
            if not currZ = 0 then begin
                _RUNTIME_signalFailure("Property 2 violated")
            end
        end

        if state3 = 0 then begin
            if currY = 1 then begin
                define state3 as 1
            end
        end else if state3 = 1 then begin
            if currY = 2 then begin
                define state3 as 2
            end
        end else if state3 = 2 then begin
            if not currZ = 0 then begin
                _RUNTIME_signalFailure("Property 3 violated")
            end
        end

        if state4 = 0 then begin
            if currY = 1 then begin
                define state4 as 1
            end
        end else if state4 = 1 then begin
            if currY = 2 then begin
                define state4 as 2
            end
        end else if state4 = 2 then begin
            if not currZ = 0 then begin
                _RUNTIME_signalFailure("Property 4 violated")
            end
        end

        if state5 = 0 then begin
            if currY = 1 then begin
                define state5 as 1
            end
        end else if state5 = 1 then begin
            if currY = 2 then begin
                define state5 as 2
            end
        end else if state5 = 2 then begin
            if not currZ = 0 then begin
                _RUNTIME_signalFailure("Property 5 violated")
            end
        end

        if state6 = 0 then begin
            if currY = 1 then begin
                define state6 as 1
            end
        end else if state6 = 1 then begin
            if currY = 2 then begin
                define state6 as 2
            end
        end else if state6 = 2 then begin
            if not currZ = 0 then begin
                _RUNTIME_signalFailure("Property 6 violated")
            end
        end

        if state7 = 0 then begin
            if currY = 1 then begin
                define state7 as 1
            end
        end else if state7 = 1 then begin
            if currY = 2 then begin
                define state7 as 2
            end
        end else if state7 = 2 then begin
            if not currZ = 0 then begin
                _RUNTIME_signalFailure("Property 7 violated")
            end
        end

        if state8 = 0 then begin
            if currY = 1 then begin
                define state8 as 1
            end
        end else if state8 = 1 then begin
            if currY = 2 then begin
                define state8 as 2
            end
        end else if state8 = 2 then begin
            if not currZ = 0 then begin
                _RUNTIME_signalFailure("Property 8 violated")
            end
        end

        if state9 = 0 then begin
            if currY = 1 then begin
                define state9 as 1
            end
        end else if state9 = 1 then begin
            if currY = 2 then begin
                define state9 as 2
            end
        end else if state9 = 2 then begin
            if not currZ = 0 then begin
                _RUNTIME_signalFailure("Property 9 violated")
            end
        end

    end

    script on bootstrap finished do begin
        define a as locate "Subject"
        define lastX as 0
        define lastY as 0
        define state1 as 0
        define state2 as 0
        define state3 as 0
        define state4 as 0
        define state5 as 0
        define state6 as 0
        define state7 as 0
        define state8 as 0
        define state9 as 0

        check()
    end

    script on statement finished do begin
        check()
    end

end

