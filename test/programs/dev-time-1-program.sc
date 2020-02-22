program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        wait 1 seconds
        wait 1 seconds
        wait 1 seconds
        if timer < 2 then begin
            _RUNTIME_signalFailure()
        end
        declare m as number
        define m as _RUNTIME_millis()
        if (m < 3000) then begin
            _RUNTIME_signalFailure()
        end
        declare t as number
        define t as _RUNTIME_timerValue()
        if (m < 3000) then begin
            _RUNTIME_signalFailure()
        end
        _RUNTIME_resetTimer()
        if (_RUNTIME_timerValue() > 100) then begin
            _RUNTIME_signalFailure()
        end
        wait 1 seconds
        if (_RUNTIME_timerValue() < 1000) then begin
            _RUNTIME_signalFailure()
        end
    end

end


