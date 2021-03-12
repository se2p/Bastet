program Ghostbusters

actor Stage is ScratchStage begin
    image Woods "f3eb165d6f3fd23370f97079f2e631bf.svg"
    image youWon "ac1c11f560ee2d02436082e7e663998b.svg"
    image youLost "669e1e2c2b634838a823f6ad486d7b57.svg"

    declare strid "game over" as string
    declare score as integer
    declare maxPoints as integer

    script on bootstrap do begin
        changeActiveGraphicTo("Woods")
    end

    script on startup do begin
        switchBackdropToId("Woods")
        define maxPoints as 10
        define score as 0
        showVariable("score")
        repeat forever begin
            if (score < 0) then begin
                broadcast "game over"
                switchBackdropToId("youLost")
            end else begin
                if (score = maxPoints) then begin
                    broadcast "game over"
                    switchBackdropToId("youWon")
                end
            end
        end
    end

end

actor Ghost is ScratchSprite begin
    image strid "ghost-a" "f522b08c5757569ad289d67bce290cd0.svg"
    image strid "ghost-b" "d1d89391f1d9c74557e504456d58a002.svg"
    image strid "ghost-c" "634744e3f98bee53e9cb477a63aa9b21.svg"
    image strid "ghost-d" "40ba3a0b5b3899a655fd8867229d4ee3.svg"
    sound strid "space ripple" "ff8b8c3bf841a11fd5fe3afaa92be1b5.wav"

    declare hit as boolean

    script on bootstrap do begin
        changeActiveGraphicTo("ghost-a")
    end

    script on message "SPRITE_CLICK" () do begin
        if not hit then begin
            define hit as true
            define Stage.score as Stage.score + 1
            changeCostumeTo("ghost-c")
            wait 1 seconds
            hide()
        end
    end

    script on startup do begin
        repeat forever begin
            hide()
            changeCostumeTo("ghost-a")
            define size as randomBetween(50, 100)
            goTo(randomBetween((0-150), 150), randomBetween((0-150), 150))
            wait randomBetween(1, 2) seconds
            define hit as false
            show()
            wait randomBetween(1, 2) seconds
        end
    end

    script on message "game over"()  do begin
        stopOtherScriptsInActor()
        hide()
    end

end

actor Bat1 is ScratchSprite begin
    image strid "bat-a" "4e4ced87ed37ee66c758bba077e0eae6.svg"
    image strid "bat-b" "bc6dd12fc9e407c7774959cdf427f8b5.svg"
    image strid "bat-c" "60f5bfce5d9b11bfcd199a6aa5454b3f.svg"
    image strid "bat-d" "698c2a48e774f9959d57c9618b156c20.svg"
    sound owl "e8b6d605f5a1bb36c29e4e21ef754209.wav"

    declare hit as boolean

    script on bootstrap do begin
        changeActiveGraphicTo("bat-a")
    end

    script on message "SPRITE_CLICK" () do begin
        if not hit then begin
            define hit as true
            define Stage.score as Stage.score + (0-2)
            changeCostumeTo("bat-c")
            wait 1 seconds
            hide()
        end
    end

    script on startup do begin
        repeat forever begin
            hide()
            changeCostumeTo("bat-a")
            define size as randomBetween(50, 100)
            goTo(randomBetween((0-150), 150), randomBetween((0-150), 150))
            wait randomBetween(1, 2) seconds
            define hit as false
            show()
            wait 1 seconds
        end
    end

    script on message "game over"()  do begin
        stopOtherScriptsInActor()
        hide()
    end

end


