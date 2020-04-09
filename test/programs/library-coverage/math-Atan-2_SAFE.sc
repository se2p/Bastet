program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare alpha as float
        define alpha as 0.0-0.5

        declare result as float
        define result as mathAtan(alpha)

        if result < 0.0 and result > (0.0-45.0) then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

