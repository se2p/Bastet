program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare deg as float
        define deg as 50.0

        declare rad as float
        define rad as degToRad(deg)

        if rad < 0.871 or rad > 0.9 then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

