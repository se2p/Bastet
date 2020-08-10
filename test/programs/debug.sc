program TestProgram

actor Beetle is ScratchSprite begin

    script on message "SPRITE_CLICK" () do begin
        _RUNTIME_signalFailure()
    end

end