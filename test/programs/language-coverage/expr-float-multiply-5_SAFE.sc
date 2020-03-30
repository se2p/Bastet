program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        if 0.5 * 2.0 = 1.0 then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

