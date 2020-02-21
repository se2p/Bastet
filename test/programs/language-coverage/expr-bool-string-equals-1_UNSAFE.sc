program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare x as string
        if x = x then begin
            _RUNTIME_signalFailure()
        end else begin
        end
    end

end

