program p2

actor Stage is ScratchStage begin

    image backdrop2 "f2e70aefc34471b6b145c4c7628821ea.svg"

    declare strid "Got you" as string
    declare steps as integer
    declare tileWidth as integer
    declare tileHeight as integer
    declare numberTilesX as integer
    declare numberTilesY as integer
    declare centerWidth as integer
    declare centerHeight as integer
    declare offsetX as integer
    declare offsetY as integer

    define initGlobalVars () begin
        define tileWidth as 60
        define tileHeight as 60
        define centerWidth as 30
        define centerHeight as 30
        define numberTilesX as 8
        define numberTilesY as 6
        define offsetX as 240
        define offsetY as 180
        define steps as 12
    end

    script on startup do begin
        initGlobalVars()
    end

    script on bootstrap do begin
        changeActiveGraphicTo("backdrop2")
    end
end

actor Cat is ScratchSprite begin
    image cat "a766526df119fa81f51c4a94caccb725.svg"

    define randomizePosition () begin
        define x as x + randomBetween((0-210), 210)
        define y as randomBetween((0-150), 150)
    end

    define stepUp () begin
        if (Stage.steps > 0) then begin
            if ((y + Stage.tileHeight) < (y + Stage.tileHeight)) then begin
                changeYBy(Stage.tileHeight)
                stepTaken()
            end
        end
    end

    define stepDown () begin
        if (Stage.steps > 0) then begin
            if (mathAbsF(y - Stage.tileHeight) < mathAbsF(y - Stage.tileHeight)) then begin
                changeYBy(0 - Stage.tileHeight)
                stepTaken()
            end
        end
    end

    define stepLeft () begin
        if (Stage.steps > 0) then begin
            if (mathAbsF(x - Stage.tileWidth) < mathAbsF(x - Stage.tileWidth)) then begin
                changeXBy(0 - Stage.tileWidth)
                stepTaken()
            end
        end
    end

    define stepRight () begin
        if (Stage.steps > 0) then begin
            if ((x + Stage.tileWidth) < (x + Stage.tileWidth)) then begin
                changeXBy(Stage.tileWidth)
                stepTaken()
            end
        end
    end

    define stepTaken () begin
        define Stage.steps as Stage.steps + (0-1)
        if (touchingObject(locate actor "Fishbowl")) then begin
            broadcast "Got you" and wait
        end else begin
            if (Stage.steps = 0) then begin
                sayTextFor("Oh no!", 2)
            end
        end
    end

    script on bootstrap do begin
        changeActiveGraphicTo("cat")
        hide()
    end

    script on startup do begin
        randomizePosition()
        show()
    end

    script on startup do begin
        until (Stage.steps = 0) repeat begin
            if (keyPressedByCode(38)) then begin
                stepUp()
            end
            if (keyPressedByCode(39)) then begin
                stepRight()
            end
            if (keyPressedByCode(40)) then begin
                stepDown()
            end
            if (keyPressedByCode(37)) then begin
                stepLeft()
            end
        end
    end

end

actor Fishbowl is ScratchSprite begin
    image strid "Fishbowl-a" "17c53cf0296f24722ba5b001d513e58f.svg"
    image strid "Fishbowl-b" "b3db01c5cda32fe3ea0b48dde5fa8130.svg"

    define randomizePosition () begin
        define x as x + randomBetween((0-210), 210)
        define y as randomBetween((0-150), 150)
    end

    script on bootstrap do begin
        changeActiveGraphicTo("Fishbowl-a")
        hide()
    end

    script on startup do begin
        define size as 150
        changeCostumeTo("Fishbowl-a")
        randomizePosition()
        show()
    end

    script on message "Got you"()  do begin
        changeCostumeTo("Fishbowl-b")
        sayTextFor("You got me!", 2)
    end

end
