program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        if true and false or true then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

