program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare alpha as float
        define alpha as 380.0

        declare result as float
        define result as mathCos(alpha)

        if result > 1.0 or result < (0.0-0.128)  then begin
            _RUNTIME_signalFailure()
        end
    end

end

