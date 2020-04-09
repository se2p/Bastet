program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare result as float
        declare n as float
        define n as 42.0
        define result as cast (cast n to int) to float

        if (n = 42.0) then begin
            _RUNTIME_signalFailure()
        end
    end

end
