program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        if false or false then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

