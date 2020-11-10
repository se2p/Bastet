program Task7


actor Stage is ScratchStage begin

    image BackgroundImage "back.png"

    declare countdown as int
    declare points as int

    script on startup do begin
        define countdown as 10
        define points as 0
        until (countdown = 0) repeat begin
            define countdown as countdown - 1
        end
    end

end

actor Bowl is ScratchSprite begin

    image BowlImage "bowl.svg"

    script on startup do begin
        goTo(0, 0-145)
        until (Stage.countdown = 0) repeat begin
            if keyPressedByCode(KEY_LEFT) then begin
                // moveSteps(0-10)
            end
        end
    end

end

actor GameObserver is Observer begin

    declare state4 as integer
    declare state4enteredTime as integer
    declare state4enteredX as integer

    declare bowl as actor

    define atomic checkProperty4 () begin
        //
        declare bowlX as integer
        define bowlX as cast (attribute "x" of bowl) to int

        if state4 = 0 then begin
            // STAY
            if keyPressedByCode(KEY_LEFT) then begin
                define state4enteredX as bowlX
                define state4enteredTime as _RUNTIME_micros()
                define state4 as 1
            end
        end else if state4 = 1 then begin
            // MOVE LEFT
            if _RUNTIME_micros() - state4enteredTime > 100000 then begin
                if bowlX >= state4enteredX then begin
                    _RUNTIME_signalFailure("Bowl must move left when corresponding arrow key is pressed")
                end
            end
        end
    end

    script on bootstrap finished do begin
        define bowl as locate actor "Bowl"

        define state4 as 0
        define state4enteredTime as _RUNTIME_micros()
        define state4enteredX as cast (attribute "x" of bowl) to int

        checkProperty4()
    end

    script on statement finished do begin
        checkProperty4()
    end

end

