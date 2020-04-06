program Mini1Program

actor MiniActor is RuntimeEntity begin

    declare x as int

    script on startup do begin
        define x as 1
        if (x = 1) then begin
            _RUNTIME_signalFailure()
        end
    end

end

