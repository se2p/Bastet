program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        if 2.0 * 2.0 + 2.2 = 6.2 then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

