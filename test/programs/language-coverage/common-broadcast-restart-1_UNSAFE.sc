program Mini1Program

actor MiniActor is RuntimeEntity begin

    declare r as int
    declare x as int

    define x as 0
    define r as 0

    script on startup do begin
        broadcast "foo" and wait
    end

    script on received message "foo" do begin
        define x as x + 1
        if r < 2 then begin
            define r as r + 1
            broadcast "bar"
        end
    end

    script on received message "bar" do begin
        define x as x + 1
        if x > 4 then begin
            _RUNTIME_signalFailure()
        end
        broadcast "wauz"
    end

    script on received message "wauz" do begin
        define x as x + 1
        broadcast "foo"
    end

end

