program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare alpha as float
        define alpha as 143.1

        declare result as float
        define result as mathCos(alpha)

        if result > 0.0-0.599 or result < (0.872)  then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

