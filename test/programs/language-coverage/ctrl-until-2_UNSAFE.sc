program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare rad as number

        define rad as 360

        define rad as rad - 36
        until rad < 0 repeat begin
            define rad as rad - 36
        end

        if (rad < 0) then begin
            _RUNTIME_signalFailure()
        end
    end

end

