program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare alpha as float
        define alpha as 255.0

        declare result as float
        define result as mathSin(alpha)
        if (result > 0.0-0.855) and result < (0.624)  then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

