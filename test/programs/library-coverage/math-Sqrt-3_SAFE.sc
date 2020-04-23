program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare num as float
        define num as 0.0

        declare result as float
        define result as mathSqrt(num)

        if result = 0.0 then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

