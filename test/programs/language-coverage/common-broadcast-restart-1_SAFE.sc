program Mini1Program

actor MiniActor is RuntimeEntity begin

    // ATTENTION: This program is important and illustrates
    // a recursion based on messages

    declare x as int

    script on bootstrap do begin
        define x as 0
    end

    script on startup do begin
        broadcast "foo" and wait
    end

    script on message "foo" () do begin
        define x as x + 1
        if x < 10 then begin
            broadcast "bar"
        end
    end

    script on message "bar" () do begin
        define x as x + 1
        if x > 20 then begin
            _RUNTIME_signalFailure()
        end
        broadcast "wauz"
    end

    script on message "wauz" () do begin
        define x as x + 1
        broadcast "foo"
    end

end

