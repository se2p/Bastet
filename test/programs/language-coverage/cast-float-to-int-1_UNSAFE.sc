program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare f as float
        declare i as int

        define f as 1.1
        define i as cast f to int

        if i = 1 then begin
            _RUNTIME_signalFailure("Cast 1")
        end
    end

end
