program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare num as float
        define num as 395.0

        declare result as float
        define result as wrapClamp(num,0.0,359.0)

        if result = 35.0 then begin
            _RUNTIME_signalFailure()
        end
    end

end

