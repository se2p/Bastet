program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare r as number
        define r as 0

        declare a1 as number
        define a1 as 1
        declare a2 as number
        define a2 as 2
        declare a3 as number
        define a3 as 3

        if (a1 > 0) then begin
            define r as r + 1
        end

        if (a2 > 0) then begin
            define r as r + 2
        end

        if (a3 > 0) then begin
            define r as r + 4
        end

        if (a1 > 0) then begin
            if not (r > 0) then begin
                _RUNTIME_signalFailure()
            end
        end

        if (a2 > 0) then begin
            if not (r > 1) then begin
                _RUNTIME_signalFailure()
            end
        end

        if (a3 > 0) then begin
            if not (r > 3) then begin
                _RUNTIME_signalFailure()
            end
        end
    end

end

