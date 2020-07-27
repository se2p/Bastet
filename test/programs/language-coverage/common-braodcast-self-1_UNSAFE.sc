program TestProgram

actor Beetle begin

    extern _RUNTIME_signalFailure ()

    script on startup do begin
        broadcast "CLICK" () to "SYSTEM"
    end

    script on message "CLICK" () in "SYSTEM" do begin
        broadcast "SPRITE_CLICK" () to self
    end

    script on message "SPRITE_CLICK" () do begin
        _RUNTIME_signalFailure()
    end

end