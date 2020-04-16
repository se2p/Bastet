program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare num as float
        define num as 30.0

        declare result as float
        define result as mathSqrt(num)

        if result > 5.4 and result < 5.5 then begin
            _RUNTIME_signalFailure()
        end
    end

end

