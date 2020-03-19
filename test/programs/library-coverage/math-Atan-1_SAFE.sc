program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare alpha as number
        define alpha as 35

        declare result as number
        define result as mathAtan(alpha)

        if result < 0 or result > 0.154 then begin
            _RUNTIME_signalFailure()
        end
    end

end

