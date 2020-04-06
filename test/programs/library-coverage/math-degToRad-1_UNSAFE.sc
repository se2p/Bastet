program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare deg as int
        define deg as 50

        declare rad as int
        define rad as degToRad(deg)

        if rad < 0.871 or rad > 0.9 then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

