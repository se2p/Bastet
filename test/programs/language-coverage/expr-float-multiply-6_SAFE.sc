program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare a as number
        declare b as number
        declare c as number
        if (a > 2.2) then begin
            if (b > 2.1) then begin
                if (a * b < 4.6) then begin
                    _RUNTIME_signalFailure()
                end
            end
        end
    end

end

