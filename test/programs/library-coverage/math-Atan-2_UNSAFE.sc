program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare alpha as number
        define alpha as 380

        declare result as number
        define result as mathCos(alpha)

        if result < 0 or result > 0.154 then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

