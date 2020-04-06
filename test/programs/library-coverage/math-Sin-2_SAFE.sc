program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare alpha as int
        define alpha as 380

        declare result as int
        define result as mathSin(alpha)

        if result > 0 or result < (0-0.991)  then begin
            _RUNTIME_signalFailure()
        end
    end

end

