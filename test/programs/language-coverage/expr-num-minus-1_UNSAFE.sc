program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare a as number
        declare b as number
        declare c as number
        if a > b and a < 100 then begin
            if b > c and b < 100 then begin
                if c > 0 and c < 100 then begin
                    if c - b - a < 0 then begin
                        _RUNTIME_signalFailure()
                    end
                end
            end
        end
    end

end

