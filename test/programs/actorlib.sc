program Mini1Program
actor MiniActor is RuntimeEntity begin
    script on startup do begin
        declare alpha as number
        if not (alpha = 0 or alpha < 0) then begin
            _RUNTIME_signalFailure()
        end
    end
end