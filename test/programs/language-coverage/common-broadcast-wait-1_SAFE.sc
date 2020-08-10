program Mini1Program

actor MiniActor is RuntimeEntity begin

    declare x as int

    script on bootstrap do begin
        define x as 0
    end

    script on startup do begin
        broadcast "foo" and wait
        if (not (x = 1)) then begin
            _RUNTIME_signalFailure()
        end
    end

    script on message "foo" () do begin
        define x as 1
    end

end

