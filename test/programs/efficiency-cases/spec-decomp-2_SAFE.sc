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

    extern _RUNTIME_signalFailure ()

    define atomic check () begin
        declare currX as int
        define currX as cast attribute "x" of a to int
        declare currY as int
        define currY as cast attribute "y" of a to int
        declare currZ as int
        define currZ as cast attribute "z" of a to int

        if currY = 1 then begin
            if not currZ = 0 then begin
                _RUNTIME_signalFailure("Property 1 violated")
            end
        end

        if currY = 2 then begin
            if not currZ = 0 then begin
                _RUNTIME_signalFailure("Property 2 violated")
            end
        end
    end

    script on bootstrap finished do begin
        define a as locate "Subject"
        define lastX as 0
        define lastY as 0

        check()
    end

    script on statement finished do begin
        check()
    end

end

