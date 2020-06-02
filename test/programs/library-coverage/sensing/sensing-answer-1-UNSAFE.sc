program TestProgram

actor TestActor is ScratchSprite begin

    script on startup do begin
        askAndWait("What is your name?")
        if answer() = "Hans" then begin
           _RUNTIME_signalFailure("Expecting this to fail")
        end
    end

end
