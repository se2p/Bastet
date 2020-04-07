program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare a as int
        declare b as int
        declare c as int
        if (a > 1) then begin
            if (b > 1) then begin
                if (a * b > 4) then begin
                    _RUNTIME_signalFailure()
                end
            end
        end
    end

end

