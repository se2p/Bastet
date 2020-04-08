program Mini1Program
actor MiniActor is RuntimeEntity begin
    script on startup do begin
        declare alpha as float
        define alpha as 37.0
        declare result as float
        if (alpha < 36.0) then begin
            assume result < 1.0
            assume result > 0.0-0.127
            _RUNTIME_signalFailure("Test")
        end else if (alpha > 35.0 and alpha < 72.0) then begin
            assume result < 0.0-0.128
            assume result > 0.0-0.967
        end
        if result < 0.0-0.128  then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end
end