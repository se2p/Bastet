program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        broadcast "foo"
    end

    script on received message "foo" do begin
        _RUNTIME_signalFailure()
    end

end

