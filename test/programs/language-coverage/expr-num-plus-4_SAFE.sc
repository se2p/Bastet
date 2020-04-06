program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare a as int
        declare b as int
        declare c as int
        if a > b then begin
            if b > c then begin
                if c > 0 then begin
                    if a + b < 2 then begin
                        _RUNTIME_signalFailure()
                    end
                end
            end
        end
    end

end

