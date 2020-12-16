program Test

actor Actor begin

    extern _RUNTIME_signalFailure ()

    script on startup do begin
        declare x as int
        if x = x then begin
            _RUNTIME_signalFailure()
        end
    end

end

