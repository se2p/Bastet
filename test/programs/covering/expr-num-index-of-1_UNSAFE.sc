program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare s as list of string
        define s as []
        if index of "a" in s < 0 then begin
            // list indices start at 1
            _RUNTIME_signalFailure()
        end
    end

end

