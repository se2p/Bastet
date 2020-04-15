program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare rad as float
        define rad as (0.0-5.0)

        declare deg as float
        define deg as radToDeg(rad)

        if deg > (0.0-286.0) or deg < (0.0-287.0) then begin
            _RUNTIME_signalFailure()
        end
    end

end

