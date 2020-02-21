program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        if true or false then begin
            _RUNTIME_signalFailure()
        end else begin
        end
    end

end

