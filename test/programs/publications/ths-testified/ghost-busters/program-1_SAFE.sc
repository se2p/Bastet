program Ghostbusters

actor Stage is ScratchStage begin 
    image backdrop1 "cd21514d0531fdffb22204e0ec5ed84a.svg"
    image Woods "f3eb165d6f3fd23370f97079f2e631bf.svg"

    declare strid "game over" as string
    declare score as float
    declare time as float

    script on bootstrap do begin
        changeActiveGraphicTo("Woods")
    end 

    script on startup do begin 
        define score as 0
        define time as 10
        showVariable("score")
        showVariable("time")
        until (cast time to string = 0) repeat begin 
            wait 1 seconds 
            define time as time + (0-1)
        end 
        broadcast "game over"
    end 

end 

actor Ghost is ScratchSprite begin 
    image strid "ghost-a" "f522b08c5757569ad289d67bce290cd0.svg"
    image strid "ghost-b" "d1d89391f1d9c74557e504456d58a002.svg"
    image strid "ghost-c" "634744e3f98bee53e9cb477a63aa9b21.svg"
    image strid "ghost-d" "40ba3a0b5b3899a655fd8867229d4ee3.svg"

    declare hit as string

    script on bootstrap do begin
        changeActiveGraphicTo("ghost-a")
    end 

    script on message "SPRITE_CLICK" () do begin 
        if ((cast hit to string = 0)) then begin 
            define hit as 1
            define Stage.score as Stage.score + 3
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
            define hit as 0
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

    declare hit as string

    script on bootstrap do begin 
        changeActiveGraphicTo("bat-a")
    end 

    script on message "SPRITE_CLICK" () do begin 
        if ((cast hit to string = 0)) then begin 
            define hit as 1
            define Stage.score as Stage.score + (0-1)
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
            define hit as 0
            show()
            wait 1 seconds 
        end 
    end 

    script on message "game over"()  do begin 
        stopOtherScriptsInActor() 
        hide()
    end 

end 

actor Bat2 is ScratchSprite begin 
    image strid "bat-a" "4e4ced87ed37ee66c758bba077e0eae6.svg"
    image strid "bat-b" "bc6dd12fc9e407c7774959cdf427f8b5.svg"
    image strid "bat-c" "60f5bfce5d9b11bfcd199a6aa5454b3f.svg"
    image strid "bat-d" "698c2a48e774f9959d57c9618b156c20.svg"

    declare hit as string

    script on bootstrap do begin 
        changeActiveGraphicTo("bat-a")
    end 

    script on message "SPRITE_CLICK" () do begin 
        if ((cast hit to string = 0)) then begin 
            define hit as 1
            define Stage.score as Stage.score + (0-1)
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
            define hit as 0
            show()
            wait 1 seconds 
        end 
    end 

    script on message "game over"()  do begin 
        stopOtherScriptsInActor() 
        hide()
    end 

end 

actor Bat3 is ScratchSprite begin 
    image strid "bat-a" "4e4ced87ed37ee66c758bba077e0eae6.svg"
    image strid "bat-b" "bc6dd12fc9e407c7774959cdf427f8b5.svg"
    image strid "bat-c" "60f5bfce5d9b11bfcd199a6aa5454b3f.svg"
    image strid "bat-d" "698c2a48e774f9959d57c9618b156c20.svg"

    declare hit as string

    script on bootstrap do begin 
        changeActiveGraphicTo("bat-a")
    end 

    script on message "SPRITE_CLICK" () do begin 
        if ((cast hit to string = 0)) then begin 
            define hit as 1
            define Stage.score as Stage.score + (0-1)
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
            define hit as 0
            show()
            wait 1 seconds 
        end 
    end 

    script on message "game over"()  do begin 
        stopOtherScriptsInActor() 
        hide()
    end 

end 
