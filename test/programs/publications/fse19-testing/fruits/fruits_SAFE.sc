program Fruits

actor Stage is ScratchStage begin

    image BackgroundImage "back.png"

    declare countdown as int
    declare points as int

    script on startup do begin
        define countdown as 30
        define points as 0
        until (countdown = 0) repeat begin
            wait 1 seconds
            define countdown as countdown - 1
        end
    end

end

actor Bowl is ScratchSprite begin

    image BowlImage "bowl.svg"

    script on startup do begin
        goTo(0, 0-145)
        wait until (Stage.countdown = 30)
        until (Stage.countdown = 0) repeat begin
            if keyPressedByCode(KEY_RIGHT) then begin
                moveSteps(10)
            end
            if keyPressedByCode(KEY_LEFT) then begin
                moveSteps(0-10)
            end
        end
        sayTextFor("Ende!", 1)
        stop all
    end

end

actor Apple is ScratchSprite begin

    image AppleImage "apple.svg"

    script on startup do begin
        define size as 50
        goToRandomPosition()
        define y as 170
        until (Stage.countdown = 0) repeat begin
            define y as y - 5
            if touchingObject(locate actor "Bowl") then begin
                define Stage.points as Stage.points + 5
                hide()
                goToRandomPosition()
                define y as 170
                show()
            end
            if touchingColor(16711680) then begin
                sayTextFor("Game over!", 1)
                stop all
            end
        end
    end

end

actor Bananas is ScratchSprite begin

    image BananasImage "bananas.svg"

    script on startup do begin
        hide()
        define size as 50
        goToRandomPosition()
        define y as 170
        wait 1 seconds
        until (Stage.countdown = 0) repeat begin
            show()
            define y as y - 7
            if touchingObject(locate actor "Bowl") then begin
                define Stage.points as Stage.points + 8
                hide()
                goToRandomPosition()
                define y as 170
                show()
            end
            if touchingColor(16711680) then begin
                define Stage.points as Stage.points - 8
                sayTextFor("-8", 1)
                hide()
                goToRandomPosition()
                define y as 170
                wait 1 seconds
                show()
            end
        end
    end

end
