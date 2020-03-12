program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare rad as number
        define rad as (0-35)

        declare deg as number
        define deg as radToDeg(rad)

        if deg > (0-0.628) or deg < (0-1.257) then begin
            _RUNTIME_signalFailure()
        end
    end

end

