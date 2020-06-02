program TestProgram

actor TestActor is ScratchSprite begin

    script on startup do begin
        askAndWait("What is your name?")
        declare a as string
        declare io as actor
        define io as locate actor "IOActor"
        define a as attribute "answer" of io
        assume a = "Hans"
        if answer() = "Hans" then begin
           _RUNTIME_signalFailure("Expecting this to fail")
        end
    end

end
