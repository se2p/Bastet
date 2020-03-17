program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare rad as number
        define rad as 35

        declare deg as number
        define deg as radToDeg(rad)

        if deg < 0.628 or deg > 1.257 then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

