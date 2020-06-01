program TestProgram

actor Beetle is ScratchSprite begin

    script on startup do begin
        hide()
        declare buggleStart as int
        define bubbleStart as _RUNTIME_millis()
        wait 1 seconds
        _RUNTIME_signalFailure("Bug revealed!")
    end

end



