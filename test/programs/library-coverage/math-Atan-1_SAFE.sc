program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare alpha as float
        define alpha as 35.0

        declare result as float
        define result as mathAtan(alpha)

        if result > 84.290 and result < 90.0 then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

