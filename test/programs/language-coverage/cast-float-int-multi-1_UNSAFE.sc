program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare i as int
        declare f as float

        define f as cast (cast i to int) to float

        if f = 42.0 then begin
            _RUNTIME_signalFailure()
        end
    end

end
