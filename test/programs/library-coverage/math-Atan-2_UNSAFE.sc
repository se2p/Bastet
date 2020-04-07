program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare alpha as int
        define alpha as 0

        declare result as int
        define result as mathAtan(alpha)

        if result < 0 or result > (0-45) then begin
            _RUNTIME_signalFailure()
        end
    end

end

