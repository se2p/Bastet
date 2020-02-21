program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        if true or false then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

