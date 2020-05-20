program TestProgram

actor Beetle is ScratchSprite begin

    script on startup do begin
        hide()
        _RUNTIME_signalFailure("Bug revealed!")
    end

end



