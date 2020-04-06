program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare s as string
        declare n as int

        define s as "42"
        define n as cast s to int

        if n = 42 then begin
            _RUNTIME_signalFailure()
        end
    end

end
