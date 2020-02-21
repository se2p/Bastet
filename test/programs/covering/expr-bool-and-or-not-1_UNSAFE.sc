program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        if not true or false or true then begin
            _RUNTIME_signalFailure()
        end else begin
        end
    end

end

