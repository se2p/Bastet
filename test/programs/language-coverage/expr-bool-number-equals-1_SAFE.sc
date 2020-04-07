program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare x as int
        if x = x then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

