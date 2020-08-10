program P4_PitcherAndCatcherSpec

actor CatcherObserver is Observer begin

    script on message "CLICK" () in "SYSTEM" do begin
        _RUNTIME_signalFailure("foooo")
    end
end
