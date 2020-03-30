program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare a as number
        declare b as number
        declare c as number
        if (a > 3.0) then begin
            if (b > 0.5) then begin
                if (a * b > 1.5) then begin
                    _RUNTIME_signalFailure()
                end
            end
        end
    end

end

