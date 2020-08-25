program Mini1Program

actor MiniActor is ScratchSprite begin

    script on startup do begin
        ifOnEdgeBounce()
        _RUNTIME_signalFailure()
    end

end
