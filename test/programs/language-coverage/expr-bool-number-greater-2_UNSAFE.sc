program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare x as number
        if x > 2 then begin
            _RUNTIME_signalFailure()
        end
    end

end

