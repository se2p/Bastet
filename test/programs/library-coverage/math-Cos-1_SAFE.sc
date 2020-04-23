program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare alpha as float
        define alpha as 143.1

        declare result as float
        define result as mathCos(degToRad(alpha))

        if result < 0.0-0.70 and result > (0.0-0.81)  then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

