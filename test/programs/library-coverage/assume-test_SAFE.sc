program Mini1Program
actor MiniActor is RuntimeEntity begin
    script on startup do begin
        declare alpha as number
        assume alpha > 0
        assume alpha < 50
        if (alpha = 0 or alpha < 0  or alpha > 50 or alpha = 50) then begin
            _RUNTIME_signalFailure()
        end
    end
end
