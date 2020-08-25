program TestProgram

actor Beetle is ScratchSprite begin

    script on startup do begin
        ifOnEdgeBounce()
        _RUNTIME_signalFailure()
    end

end
