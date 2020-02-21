program Mini1Program

actor MiniActor is RuntimeEntity begin

    declare x as number

    define x as 0

    script on startup do begin
        broadcast "foo" and wait
        if (x = 2) then begin
            _RUNTIME_signalFailure()
        end
    end

    script on received message "foo" do begin
        define x as 2
    end

end

