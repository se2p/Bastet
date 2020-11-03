program Task7Spec

actor GameObserver is Observer begin

    declare state1 as integer
    declare state1entered as integer

    declare state2 as integer
    declare state2entered as integer

    declare state3 as integer
    declare state3entered as integer

    declare state4 as integer
    declare state4enteredTime as integer
    declare state4enteredX as integer

    declare bowl as actor

    define atomic checkProperty1 () begin
        // Timer and score start at 30 seconds and 0 points, respectively
        if state1 = 0 then begin
            if (Stage.countdown = 30 and Stage.points = 0) then begin
                define state1 as 1
            end else begin
                if _RUNTIME_micros() - state1entered > 100000 then begin
                    _RUNTIME_signalFailure("Timer and score start at 30 seconds and 0 points, respectively")
                end
            end
        end
    end

    define atomic checkProperty2 () begin
        // Bowl starts atX=0/Y=−145
        if state2 = 0 then begin
            if (Bowl.x = 0 and Bowl.y = 0-145) then begin
                define state2 as 1
            end else begin
                if _RUNTIME_micros() - state2entered > 100000 then begin
                    _RUNTIME_signalFailure("Bowl starts atX=0/Y=−145")
                end
            end
        end
    end

    define atomic checkProperty3 () begin
        // Fruits have a size of 50%
        if state3 = 0 then begin
            if _RUNTIME_micros() - state2entered > 100000 then begin
                define state3 as 1
            end
        end else if state3 = 1 then begin
            if not Bananas.size = 50 then begin
                _RUNTIME_signalFailure("Bananas size must be 50%")
            end
            if not Apple.size = 50 then begin
                _RUNTIME_signalFailure("Apples size must be 50%")
            end
        end
    end

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
            end if keyPressedByCode(KEY_RIGHT) then begin
                define state4enteredX as bowlX
                define state4enteredTime as _RUNTIME_micros()
                define state4 as 2
            end
        end else if state4 = 1 then begin
            // MOVE LEFT
            if _RUNTIME_micros() - state4enteredTime > 100000 then begin
                if bowlX >= state4enteredX then begin
                    _RUNTIME_signalFailure("Bowl must move left when corresponding arrow key is pressed")
                end
            end

            if keyPressedByCode(KEY_LEFT) then begin
                define state4enteredX as bowlX
                define state4enteredTime as _RUNTIME_micros()
                // Stay in the state
            end if keyPressedByCode(KEY_RIGHT) then begin
                define state4enteredX as bowlX
                define state4enteredTime as _RUNTIME_micros()
                define state4 as 0
            end
        end else if state4 = 2 then begin
            // MOVE RIGHT
            if _RUNTIME_micros() - state4enteredTime > 100000 then begin
                if bowlX <= state4enteredX then begin
                    _RUNTIME_signalFailure("Bowl must move right when corresponding arrow key is pressed")
                end
            end

            if keyPressedByCode(KEY_RIGHT) then begin
                define state4enteredX as bowlX
                define state4enteredTime as _RUNTIME_micros()
                // Stay in the state
            end if keyPressedByCode(KEY_LEFT) then begin
                define state4enteredX as bowlX
                define state4enteredTime as _RUNTIME_micros()
                define state4 as 0
            end
        end
    end

    define atomic checkProperty5 () begin
        // Bowl can only move horizontally with a speed of 10
    end

    define atomic checkProperty6 () begin
        // Apples fall down
    end

    define atomic checkProperty7 () begin
        // Apples fall in a straight line with a speed of -5
    end

    define atomic checkProperty8 () begin
        // Bananas fall down
    end

    define atomic checkProperty9 () begin
        // Bananas fall in a straight line with a speed of -7
    end

    define atomic checkProperty10 () begin
        // Apples spawn again at the top of the screen after touching the bowl
    end

    define atomic checkProperty11 () begin
        // Apples spawn at random X position
    end

    define atomic checkProperty12 () begin
        // Apples spawn at Y = 170
    end

    define atomic checkProperty13 () begin
        // Bananas spawn again at the top of the screen after touching the bowl
    end

    define atomic checkProperty14 () begin
        // Bananas spawn at random X position
    end

    define atomic checkProperty15 () begin
        // Bananas spawn at Y=170
    end

    define atomic checkProperty16 () begin
        // Only one apple must fall down at a time
    end

    define atomic checkProperty17 () begin
        // Only one banana must fall down at a time
    end

    define atomic checkProperty18 () begin
        // Banana must wait for a second before falling down in the beginning
    end

    define atomic checkProperty19 () begin
        // Banana must wait for a second before falling down after displaying ”-8”
    end

    define atomic checkProperty20 () begin
        // Apple gives 5 points when it touches the bowl
    end

    define atomic checkProperty21 () begin
        // Game over when the apple touches the ground
    end

    define atomic checkProperty22 () begin
        // Apple displays ”Game Over!” message when it touches the ground
    end

    define atomic checkProperty23 () begin
        // Banana gives 8 points when it touches the bowl
    end

    define atomic checkProperty24 () begin
        // Banana subtracts 8 points when it touches the ground
    end

    define atomic checkProperty25 () begin
        // Banana displays ”-8” message when it touches the ground
    end

    define atomic checkProperty26 () begin
        // Timer is decremented by one once a second
    end

    define atomic checkProperty27 () begin
        // Game stops after 30 seconds elapsed
    end

    define atomic checkProperty28 () begin
        // Bowl must display ”End!” after 30 seconds elapsed
    end

    define atomic checkProperties() begin
        checkProperty1()
        checkProperty2()
        checkProperty3()
        checkProperty4()
        checkProperty5()
        checkProperty6()
        checkProperty7()
        checkProperty8()
        checkProperty9()
        checkProperty10()
        checkProperty11()
        checkProperty12()
        checkProperty13()
        checkProperty14()
        checkProperty15()
        checkProperty16()
        checkProperty17()
        checkProperty18()
        checkProperty19()
        checkProperty20()
        checkProperty21()
        checkProperty22()
        checkProperty23()
        checkProperty24()
        checkProperty25()
        checkProperty26()
        checkProperty27()
        checkProperty28()
    end

    script on bootstrap finished do begin
        define bowl as locate actor "Bowl"

        define state1 as 0
        define state1entered as _RUNTIME_micros()

        define state2 as 0
        define state2entered as _RUNTIME_micros()

        define state3 as 0
        define state3entered as _RUNTIME_micros()

        define state4 as 0
        define state4enteredTime as _RUNTIME_micros()
        define state4enteredX as cast (attribute "x" of bowl) to int

        checkProperties()
    end

    script on statement finished do begin
        checkProperties()
    end

end

