program Test

actor Actor begin

    extern _RUNTIME_signalFailure ()

    script on startup do begin
        declare x as int
        declare y as int
        define y as 99
        until y = 0 repeat begin
            define y as y - 1
        end

        if not x = x then begin
            _RUNTIME_signalFailure()
        end
    end

end

