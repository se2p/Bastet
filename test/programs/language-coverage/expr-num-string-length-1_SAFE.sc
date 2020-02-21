program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare s as string
        define s as "41"
        if length of s = 0 then begin
            _RUNTIME_signalFailure()
        end
    end

end

