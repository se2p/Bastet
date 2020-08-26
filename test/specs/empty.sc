program NeverSpec

actor NeverObserver is Observer begin

    script on statement finished do begin
        if false then begin
            _RUNTIME_signalFailure("should never happen")
        end
    end

end

