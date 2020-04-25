program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare alpha as float
        define alpha as 0.61

        declare result as float
        define result as mathSin(alpha)

        if result > 0.454 and result <= (0.5878)  then begin
            _RUNTIME_signalFailure()
        end
    end

end

