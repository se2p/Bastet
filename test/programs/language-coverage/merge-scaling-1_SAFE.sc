program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare r as int
        define r as 0

        declare a1 as int
        define a1 as 1

        if (a1 > 0) then begin
            define r as r + 1
        end

        if (a1 > 0) then begin
            if not (r > 0) then begin
                _RUNTIME_signalFailure()
            end
        end
    end

end

