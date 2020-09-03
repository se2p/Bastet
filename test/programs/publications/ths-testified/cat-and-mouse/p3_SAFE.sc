program P3_CatAndMouse

actor Stage is ScratchStage begin

end

actor strid "Mouse" is ScratchSprite begin

    declare lives as int

    declare cat as actor

    script on startup do begin
        define cat as locate actor "Cat"
        define lives as 3
        declare key as int

        until (lives = 0) repeat begin
            if touchingObject(cat) then begin
                define lives as lives - 1
            end

            if keyPressedByCode(KEY_DOWN) then begin
                setDirection(180)
                moveSteps(10)
            end else if keyPressedByCode(KEY_UP) then begin
                setDirection(0)
                moveSteps(10)
            end else if keyPressedByCode(KEY_LEFT) then begin
                setDirection(0 - 90)
                moveSteps(10)
            end else if keyPressedByCode(KEY_RIGHT) then begin
                setDirection(90)
                moveSteps(10)
            end
        end

        sayTextFor("Oh no", 3)
    end
end

actor strid "Cat" is ScratchSprite begin
    declare mouse as actor

    script on startup do begin
        define mouse as locate actor "Mouse"

        repeat forever begin
            pointTowards(mouse)
            moveSteps(5)

            if touchingObject(mouse) then begin
                wait 5 seconds
            end
        end
    end
end
