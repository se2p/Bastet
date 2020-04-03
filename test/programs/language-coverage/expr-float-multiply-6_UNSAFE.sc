program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare a as float
        declare b as float
        declare c as float
        if (a > 3.0) then begin
            if (b > 0.5) then begin
                if (a * b > 1.5) then begin
                    _RUNTIME_signalFailure()
                end
            end
        end
    end

end

