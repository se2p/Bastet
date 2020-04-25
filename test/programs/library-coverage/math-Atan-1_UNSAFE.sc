program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare alpha as float
        define alpha as 35.0

        declare result as float
        define result as mathAtan(degToRad(alpha))

        if result > 0.4403 and result <= 0.561 then begin
            _RUNTIME_signalFailure()
        end
    end

end

