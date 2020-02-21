program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare s as list of string
        define s as ["ab", "cd"]
        if index of "cd" in s < 2 then begin
            _RUNTIME_signalFailure()
        end
    end

end

