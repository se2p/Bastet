program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare x as number
        if x = x then begin
            _RUNTIME_signalFailure()
        end
    end

end

