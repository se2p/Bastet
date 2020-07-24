program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare alpha as float
        define alpha as 35.0

        declare result as float
        define result as mathSin(degToRad(alpha))

        if result > 0.45 and result < 0.59  then begin
        end else begin
            _RUNTIME_signalFailure("Sin Test")
        end
    end

end

