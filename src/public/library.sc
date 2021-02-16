module ScratchLibrary

/**
 * Actor that models the environment, in particular inputs from the
 * user using keyboard and mouse and a corresponding event dispatcher loop.
 */
actor IOActor is RuntimeEntity begin

    /**
     * The current mouse position
     */
    declare mouseX as integer
    declare mouseY as integer
    declare mouseDown as boolean
    declare lastMouseDown as boolean
    declare mouseClicked as boolean

    /**
     * Key code of the currently pressed key
     */
    declare keyPressed as integer
    declare lastKeyPressed as integer

    /**
     * The last answer given to an `ask` block
     */
    declare integerAnswer as integer
    declare askActive as boolean

    define atomic beginAsk() begin
        // declare nondetStr as string
        // define answer as nondetStr

        declare nondetInt as integer
        define integerAnswer as nondetInt
        declare inputDurationSecs as integer
        assume inputDurationSecs > 0
        assume inputDurationSecs < 30
        define askActive as true
        // ATTENTION/FIXME: The following wait statement should allow to interleave other threads
        wait inputDurationSecs seconds
        // UNSOUND: might wait arbitrarily long
    end

    define atomic makeInputVariablesNonDet() begin
        declare nondetX as integer
        define mouseX as nondetX

        declare nondetY as integer
        define mouseY as nondetY

        declare nondetKey as integer
        define keyPressed as nondetKey

        declare nondetDown as boolean
        define mouseDown as nondetDown
    end

    script on bootstrap do begin
        define askActive as false
    end

    script on message "ASK" () in "SYSTEM" do begin
        beginAsk()
        define askActive as false
    end

    /**
     * The event-dispatcher loop that models the timing
     * of keyboard and mouse inputs.
     */
    script messageDispatcherLoop on startup do begin
        // Hack as long no other dispatch handling is in place
        repeat forever begin
            makeInputVariablesNonDet()

            define mouseClicked as mouseDown and not lastMouseDown
            if mouseClicked then begin
                broadcast "CLICK" () to "SYSTEM"
            end

            if keyPressed = 37 then begin
                broadcast "KEY_37_PRESSED" () to "SYSTEM"
            end else if keyPressed = 38 then begin
                broadcast "KEY_38_PRESSED" () to "SYSTEM"
            end else if keyPressed = 39 then begin
                broadcast "KEY_39_PRESSED" () to "SYSTEM"
            end else if keyPressed = 40 then begin
                broadcast "KEY_40_PRESSED" () to "SYSTEM"
            end

            define lastKeyPressed as keyPressed
            define lastMouseDown as mouseDown
        end
    end

end

/**
 * Functionality to deal with keyboard inputs.
 * In particular the mapping between key codes and the
 * corresponding Scratch key identifiers.
 */
role KeyboardIO begin

    declare KEY_ANY as integer
    declare KEY_ENTER as integer
    declare KEY_SPACE as integer
    declare KEY_LEFT as integer
    declare KEY_UP as integer
    declare KEY_RIGHT as integer
    declare KEY_DOWN as integer

    define KEY_ANY as 0
    define KEY_ENTER as 13
    define KEY_SPACE as 32
    define KEY_LEFT as 37
    define KEY_UP as 38
    define KEY_RIGHT as 39
    define KEY_DOWN as 40

    define atomic stringToKey (s: string) begin
        if s = " " then begin
            define result as KEY_SPACE
        end else if s = "ArrowLeft" or s = "Left" then begin
            define result as KEY_LEFT
        end else if s = "ArrowRight" or s = "Right" then begin
            define result as KEY_LEFT
        end else if s = "ArrowUp" or s = "Up" then begin
            define result as KEY_UP
        end else if s = "ArrowDown" or s = "Down" then begin
            define result as KEY_DOWN
        end else if s = "Enter" then begin
            define result as KEY_ENTER
        end else if s = "Any" then begin
            // Any key
        end else begin
            _RUNTIME_signalFailure("Unknown key string")
        end
    end returns result : integer

end

/**
 * Mathematical functions and their approximations that are available
 * to model the behavior of Scratch programs.
 *
 * Approximations are used whenever sufficient to reason about
 * particular properties of Scratch programs. In particular
 * in cases where we would have to deal with undecidable
 * mathematical theories such as natural numbers with multiplication.
 */
role MathActor begin

    declare PI as float
    declare PI_HALF as float
    declare PI_SQR_TIMES_FIVE as float
    declare TWO_PI as float

    define PI as 3.14159265359
    define TWO_PI as 6.28318530718
    define PI_HALF as  1.570796326795
    define PI_SQR_TIMES_FIVE as 49.34802200545329

    /**
     * WrampClamp function takes a value and makes sure it is within the given bounds
     * param value: float - the value that will be wrapped
     * param min: float - the lower bound
     * param max: flaot - the upper bound
     * return result: float - the wrapped value
     */
    define atomic wrapClamp (value: float, min: float, max: float) begin
        declare range as float
        define range as ((max - min) + 1.0)
        define result as (value - (mathFloor((value - min) / range) * range))
    end returns result : float

    @ Category "Operator"
    @ Block "[floor v] of (num)"
    @ Opcode "operator_mathop"
    define atomic mathFloor (n: float) begin
        declare num as integer
        define num as cast n to int
        define result as cast num to float
        if result > n then begin
            define result as result - 1.0
        end
    end returns result : float

    /**
     * mathAtan approximates the Atan value in radians for a given "real" value
     * param n : float - the real value for which the Atan value is approximated
     * return result: float - the approximated interval of the Atan value
     */
    @ Category "Operator"
    @ Block "[atan v] of (num)"
    @ Opcode "operator_mathop"
    define atomic mathAtan (input: float) begin
        if input > TWO_PI then begin
            declare asDeg as integer
            define asDeg as cast (radToDeg(input)) to int
            define asDeg as asDeg mod 360
            define input as degToRad(asDeg)
        end

        if input >=  0.0  and input <  0.1571 then begin
            assume result >  0.0
            assume result <=  0.1558
        end else if input >=  0.1571  and input <  0.3142 then begin
            assume result >  0.1558
            assume result <=  0.3044
        end else if input >=  0.3142  and input <  0.4712 then begin
            assume result >  0.3044
            assume result <=  0.4403
        end else if input >=  0.4712  and input <  0.6283 then begin
            assume result >  0.4403
            assume result <=  0.561
        end else if input >=  0.6283  and input <  0.7854 then begin
            assume result >  0.561
            assume result <=  0.6658
        end else if input >=  0.7854  and input <  0.9425 then begin
            assume result >  0.6658
            assume result <=  0.7558
        end else if input >=  0.9425  and input <  1.0996 then begin
            assume result >  0.7558
            assume result <=  0.8328
        end else if input >=  1.0996  and input <  1.2566 then begin
            assume result >  0.8328
            assume result <=  0.8986
        end else if input >=  1.2566  and input <  1.4137 then begin
            assume result >  0.8986
            assume result <=  0.9551
        end else if input >=  1.4137  and input <  1.5708 then begin
            assume result >  0.9551
            assume result <=  1.0039
        end else if input >=  1.5708  and input <  1.7279 then begin
            assume result >  1.0039
            assume result <=  1.0462
        end else if input >=  1.7279  and input <  1.885 then begin
            assume result >  1.0462
            assume result <=  1.083
        end else if input >=  1.885  and input <  2.042 then begin
            assume result >  1.083
            assume result <=  1.1154
        end else if input >=  2.042  and input <  2.1991 then begin
            assume result >  1.1154
            assume result <=  1.144
        end else if input >=  2.1991  and input <  2.3562 then begin
            assume result >  1.144
            assume result <=  1.1694
        end else if input >=  2.3562  and input <  2.5133 then begin
            assume result >  1.1694
            assume result <=  1.1921
        end else if input >=  2.5133  and input <  2.6704 then begin
            assume result >  1.1921
            assume result <=  1.2125
        end else if input >=  2.6704  and input <  2.8274 then begin
            assume result >  1.2125
            assume result <=  1.2308
        end else if input >=  2.8274  and input <  2.9845 then begin
            assume result >  1.2308
            assume result <=  1.2475
        end else if input >=  2.9845  and input <  3.1416 then begin
            assume result >  1.2475
            assume result <=  1.2626
        end else if input >=  3.1416  and input <  3.2987 then begin
            assume result >  1.2626
            assume result <=  1.2765
        end else if input >=  3.2987  and input <  3.4558 then begin
            assume result >  1.2765
            assume result <=  1.2891
        end else if input >=  3.4558  and input <  3.6128 then begin
            assume result >  1.2891
            assume result <=  1.3008
        end else if input >=  3.6128  and input <  3.7699 then begin
            assume result >  1.3008
            assume result <=  1.3115
        end else if input >=  3.7699  and input <  3.927 then begin
            assume result >  1.3115
            assume result <=  1.3214
        end else if input >=  3.927  and input <  4.0841 then begin
            assume result >  1.3214
            assume result <=  1.3307
        end else if input >=  4.0841  and input <  4.2412 then begin
            assume result >  1.3307
            assume result <=  1.3392
        end else if input >=  4.2412  and input <  4.3982 then begin
            assume result >  1.3392
            assume result <=  1.3472
        end else if input >=  4.3982  and input <  4.5553 then begin
            assume result >  1.3472
            assume result <=  1.3547
        end else if input >=  4.5553  and input <  4.7124 then begin
            assume result >  1.3547
            assume result <=  1.3617
        end else if input >=  4.7124  and input <  4.8695 then begin
            assume result >  1.3617
            assume result <=  1.3683
        end else if input >=  4.8695  and input <  5.0265 then begin
            assume result >  1.3683
            assume result <=  1.3744
        end else if input >=  5.0265  and input <  5.1836 then begin
            assume result >  1.3744
            assume result <=  1.3802
        end else if input >=  5.1836  and input <  5.3407 then begin
            assume result >  1.3802
            assume result <=  1.3857
        end else if input >=  5.3407  and input <  5.4978 then begin
            assume result >  1.3857
            assume result <=  1.3909
        end else if input >=  5.4978  and input <  5.6549 then begin
            assume result >  1.3909
            assume result <=  1.3958
        end else if input >=  5.6549  and input <  5.8119 then begin
            assume result >  1.3958
            assume result <=  1.4004
        end else if input >=  5.8119  and input <  5.969 then begin
            assume result >  1.4004
            assume result <=  1.4048
        end else if input >=  5.969  and input <  6.1261 then begin
            assume result >  1.4048
            assume result <=  1.409
        end
    end returns result: float

    /**
     * mathAtan2 approximates the Atan2 value in radians for two given "real" numbers.
     * The result is the angle between the positive x-axis and ray from (0,0) to (x,y)
     *
     * param x : float - x-coordinate of the target point
     * param y : float - y-coordinate of the target point
     * return result: float - the approximated interval of the Atan2 value
     */
    define atomic mathAtan2 (x: float, y: float) begin
        if x > 0.0 then begin
            define result as mathAtan((y / x))
        end else if x < 0.0 and y > 0.0 then begin
            define result as mathAtan((y/x)) +  PI
        end else if x < 0.0 and y = 0.0 then begin
            declare nondet as integer
            if nondet = 1 then begin
                define result as PI
            end else begin
                define result as 0.0 - PI
            end
        end else if x < 0.0 and y < 0.0 then begin
            define result as mathAtan((y/x)) -  PI
        end else if x = 0.0 and y > 0.0 then begin
            define result as (PI / 2.0)
        end else if x = 0.0 and y < 0.0 then begin
            define result as (0.0 - (PI / 2.0))
        end else begin
            // not defined for (0.0, 0.0)
            // but: the JavaScript implementation returns 0
            define result as 0.0
        end
    end returns result: float

    @ Category "Operator"
    @ Block "[sin v] of (num)"
    @ Opcode "operator_mathop"
    define atomic mathSinDegree (input: float) begin
        declare radians as float
        define radians as degToRad(input)
        define result as mathSin(radians)
    end returns result: float

    /**
     * mathSin approximates the sin value for a given radians number
     *
     * param alpha : float - radians number for which the sin value will be approximated
     * return result: float - the approximated interval
     */
    define atomic mathSin (input: float) begin
        if input >= 0.0 and input < 0.3142 then begin
            assume result > 0.0
            assume result <= 0.3091
        end else if input >= 0.3142 and input < 0.4713 then begin
            assume result > 0.3091
            assume result <= 0.454
        end else if input >= 0.4713 and input < 0.6284 then begin
            assume result > 0.454
            assume result <= 0.5879
        end else if input >= 0.6284 and input < 0.7855 then begin
            assume result > 0.5879
            assume result <= 0.7072
        end else if input >= 0.7855 and input < 0.9426 then begin
            assume result > 0.7072
            assume result <= 0.8091
        end else if input >= 0.9426 and input < 1.0997 then begin
            assume result > 0.8091
            assume result <= 0.8911
        end else if input >= 1.0997 and input < 1.2568 then begin
            assume result > 0.8911
            assume result <= 0.9511
        end else if input >= 1.2568 and input < 1.4139 then begin
            assume result > 0.9511
            assume result <= 0.9877
        end else if input >= 1.4139 and input < 1.571 then begin
            assume result > 0.9877
            assume result <= 1.0
        end else if input >= 1.571 and input < 1.7281 then begin
            assume result > 0.9877
            assume result <= 1.0
        end else if input >= 1.7281 and input < 1.8852 then begin
            assume result > 0.951
            assume result <= 0.9877
        end else if input >= 1.8852 and input < 2.0423 then begin
            assume result > 0.8909
            assume result <= 0.951
        end else if input >= 2.0423 and input < 2.1994 then begin
            assume result > 0.8088
            assume result <= 0.8909
        end else if input >= 2.1994 and input < 2.3565 then begin
            assume result > 0.7069
            assume result <= 0.8088
        end else if input >= 2.3565 and input < 2.5136 then begin
            assume result > 0.5875
            assume result <= 0.7069
        end else if input >= 2.5136 and input < 2.6707 then begin
            assume result > 0.4537
            assume result <= 0.5875
        end else if input >= 2.6707 and input < 2.8278 then begin
            assume result > 0.3087
            assume result <= 0.4537
        end else if input >= 2.8278 and input < 2.9849 then begin
            assume result > 0.1561
            assume result <= 0.3087
        end else if input >= 2.9849 and input < 3.142 then begin
            assume result > 0.0 - 0.0004
            assume result <= 0.1561
        end else if input >= 3.142 and input < 3.2991 then begin
            assume result > 0.0 - 0.1569
            assume result <= 0.0 - 0.0004
        end else if input >= 3.2991 and input < 3.4562 then begin
            assume result > 0.0 - 0.3094
            assume result <= 0.0 - 0.1569
        end else if input >= 3.4562 and input < 3.6133 then begin
            assume result > 0.0 - 0.4544
            assume result <= 0.0 - 0.3094
        end else if input >= 3.6133 and input < 3.7704 then begin
            assume result > 0.0 - 0.5882
            assume result <= 0.0 - 0.4544
        end else if input >= 3.7704 and input < 3.9275 then begin
            assume result > 0.0 - 0.7075
            assume result <= 0.0 - 0.5882
        end else if input >= 3.9275 and input < 4.0846 then begin
            assume result > 0.0 - 0.8093
            assume result <= 0.0 - 0.7075
        end else if input >= 4.0846 and input < 4.2417 then begin
            assume result > 0.0 - 0.8913
            assume result <= 0.0 - 0.8093
        end else if input >= 4.2417 and input < 4.3988 then begin
            assume result > 0.0 - 0.9512
            assume result <= 0.0 - 0.8913
        end else if input >= 4.3988 and input < 4.5559 then begin
            assume result > 0.0 - 0.9878
            assume result <= 0.0 - 0.9512
        end else if input >= 4.5559 and input < 4.713 then begin
            assume result > 0.0 - 1.0
            assume result <= 0.0 - 0.9878
        end else if input >= 4.713 and input < 4.8701 then begin
            assume result > 0.0 - 1.0
            assume result <= 0.0 - 0.9876
        end else if input >= 4.8701 and input < 5.0272 then begin
            assume result > 0.0 - 0.9876
            assume result <= 0.0 - 0.9509
        end else if input >= 5.0272 and input < 5.1843 then begin
            assume result > 0.0 - 0.9509
            assume result <= 0.0 - 0.8907
        end else if input >= 5.1843 and input < 5.3414 then begin
            assume result > 0.0 - 0.8907
            assume result <= 0.0 - 0.8086
        end else if input >= 5.3414 and input < 5.4985 then begin
            assume result > 0.0 - 0.8086
            assume result <= 0.0 - 0.7066
        end else if input >= 5.4985 and input < 5.6556 then begin
            assume result > 0.0 - 0.7066
            assume result <= 0.0 - 0.5872
        end else if input >= 5.6556 and input < 5.8127 then begin
            assume result > 0.0 - 0.5872
            assume result <= 0.0 - 0.4533
        end else if input >= 5.8127 and input < 5.9698 then begin
            assume result > 0.0 - 0.4533
            assume result <= 0.0 - 0.3083
        end else if input >= 5.9698 and input < 6.1269 then begin
            assume result > 0.0 - 0.3083
            assume result <= 0.0 - 0.1556
        end else if input >= 6.1269 and input < 6.284 then begin
            assume result > 0.0 - 0.1556
            assume result <= 0.0008
        end
    end returns result: float

    @ Category "Operator"
    @ Block "[cos v] of (num)"
    @ Opcode "operator_mathop"
    define atomic mathCosDegree (input: float) begin
        declare radians as float
        define radians as degToRad(input)
        define result as mathCos(radians)
    end returns result: float

    /**
     * mathCos approximates the cos value for a given radians number
     *
     * param alpha : float - radians number for which the cos value will be approximated
     * return result: float - the approximated interval
     */
    define atomic mathCos (input: float) begin
        if input >= 0.0 and input < 0.3142 then begin
            assume result > 0.951
            assume result <= 1.0
        end else if input >= 0.3142 and input < 0.4713 then begin
            assume result > 0.891
            assume result <= 0.951
        end else if input >= 0.4713 and input < 0.6284 then begin
            assume result > 0.809
            assume result <= 0.891
        end else if input >= 0.6284 and input < 0.7855 then begin
            assume result > 0.707
            assume result <= 0.809
        end else if input >= 0.7855 and input < 0.9426 then begin
            assume result > 0.5877
            assume result <= 0.707
        end else if input >= 0.9426 and input < 1.0997 then begin
            assume result > 0.4539
            assume result <= 0.5877
        end else if input >= 1.0997 and input < 1.2568 then begin
            assume result > 0.3089
            assume result <= 0.4539
        end else if input >= 1.2568 and input < 1.4139 then begin
            assume result > 0.1563
            assume result <= 0.3089
        end else if input >= 1.4139 and input < 1.571 then begin
            assume result > 0.0 - 0.0002
            assume result <= 0.1563
        end else if input >= 1.571 and input < 1.7281 then begin
            assume result > 0.0 - 0.1567
            assume result <= 0.0 - 0.0002
        end else if input >= 1.7281 and input < 1.8852 then begin
            assume result > 0.0 - 0.3092
            assume result <= 0.0 - 0.1567
        end else if input >= 1.8852 and input < 2.0423 then begin
            assume result > 0.0 - 0.4542
            assume result <= 0.0 - 0.3092
        end else if input >= 2.0423 and input < 2.1994 then begin
            assume result > 0.0 - 0.588
            assume result <= 0.0 - 0.4542
        end else if input >= 2.1994 and input < 2.3565 then begin
            assume result > 0.0 - 0.7073
            assume result <= 0.0 - 0.588
        end else if input >= 2.3565 and input < 2.5136 then begin
            assume result > 0.0 - 0.8092
            assume result <= 0.0 - 0.7073
        end else if input >= 2.5136 and input < 2.6707 then begin
            assume result > 0.0 - 0.8912
            assume result <= 0.0 - 0.8092
        end else if input >= 2.6707 and input < 2.8278 then begin
            assume result > 0.0 - 0.9512
            assume result <= 0.0 - 0.8912
        end else if input >= 2.8278 and input < 2.9849 then begin
            assume result > 0.0 - 0.9877
            assume result <= 0.0 - 0.9512
        end else if input >= 2.9849 and input < 3.142 then begin
            assume result > 0.0 - 1.0
            assume result <= 0.0 - 0.9877
        end else if input >= 3.142 and input < 3.2991 then begin
            assume result > 0.0 - 1.0
            assume result <= 0.0 - 0.9876
        end else if input >= 3.2991 and input < 3.4562 then begin
            assume result > 0.0 - 0.9876
            assume result <= 0.0 - 0.9509
        end else if input >= 3.4562 and input < 3.6133 then begin
            assume result > 0.0 - 0.9509
            assume result <= 0.0 - 0.8908
        end else if input >= 3.6133 and input < 3.7704 then begin
            assume result > 0.0 - 0.8908
            assume result <= 0.0 - 0.8087
        end else if input >= 3.7704 and input < 3.9275 then begin
            assume result > 0.0 - 0.8087
            assume result <= 0.0 - 0.7067
        end else if input >= 3.9275 and input < 4.0846 then begin
            assume result > 0.0 - 0.7067
            assume result <= 0.0 - 0.5874
        end else if input >= 4.0846 and input < 4.2417 then begin
            assume result > 0.0 - 0.5874
            assume result <= 0.0 - 0.4535
        end else if input >= 4.2417 and input < 4.3988 then begin
            assume result > 0.0 - 0.4535
            assume result <= 0.0 - 0.3085
        end else if input >= 4.3988 and input < 4.5559 then begin
            assume result > 0.0 - 0.3085
            assume result <= 0.0 - 0.1559
        end else if input >= 4.5559 and input < 4.713 then begin
            assume result > 0.0 - 0.1559
            assume result <= 0.0006
        end else if input >= 4.713 and input < 4.8701 then begin
            assume result > 0.0006
            assume result <= 0.1571
        end else if input >= 4.8701 and input < 5.0272 then begin
            assume result > 0.1571
            assume result <= 0.3096
        end else if input >= 5.0272 and input < 5.1843 then begin
            assume result > 0.3096
            assume result <= 0.4546
        end else if input >= 5.1843 and input < 5.3414 then begin
            assume result > 0.4546
            assume result <= 0.5883
        end else if input >= 5.3414 and input < 5.4985 then begin
            assume result > 0.5883
            assume result <= 0.7076
        end else if input >= 5.4985 and input < 5.6556 then begin
            assume result > 0.7076
            assume result <= 0.8094
        end else if input >= 5.6556 and input < 5.8127 then begin
            assume result > 0.8094
            assume result <= 0.8913
        end else if input >= 5.8127 and input < 5.9698 then begin
            assume result > 0.8913
            assume result <= 0.9513
        end else if input >= 5.9698 and input < 6.1269 then begin
            assume result > 0.9513
            assume result <= 0.9878
        end else if input >= 6.1269 and input < 6.284 then begin
            assume result > 0.9878
            assume result <= 1.0
        end
    end returns result: float

    /**
     * radToDeg calculates the degree value for a given radians value
     *
     * param rad: float - radians number for which the degree value will be calculated
     * return result: float - the calculated degree value
     */
    define atomic radToDeg (rad: float) begin
        // define result as ((rad * 180.0) / PI)
        define result as rad * 57.2957795131
    end returns result: float

    /**
     * degToRad calculates the radians value for a given degree value
     *
     * param deg: float - degree number for which the radians value will be calculated
     * return result: float - the calculated radians value [0..2*pi]
     */
    define atomic degToRad (deg: float) begin
        // define result as (deg * PI) / 180.0
        define result as deg * 0.01745329252
    end returns result: float

    define atomic nearestPerfectSqrt (num: float) begin
        if num < 0.0 then begin
            _RUNTIME_signalFailure("Sqrt of negative number not allowed")
        end else if num = 0.0 then begin
		    define result as 0.0
        end else if num <= 1.0 then begin
		    define result as 1.0
        end else if num <= 4.0 then begin
		    define result as 2.0
        end else if num <= 9.0 then begin
		    define result as 3.0
        end else if num <= 16.0 then begin
		    define result as 4.0
        end else if num <= 25.0 then begin
		    define result as 5.0
        end else if num <= 36.0 then begin
		    define result as 6.0
        end else if num <= 49.0 then begin
		    define result as 7.0
        end else if num <= 64.0 then begin
		    define result as 8.0
        end else if num <= 81.0 then begin
		    define result as 9.0
        end else if num <= 100.0 then begin
		    define result as 10.0
        end else if num <= 121.0 then begin
		    define result as 11.0
        end else if num <= 144.0 then begin
		    define result as 12.0
        end else if num <= 169.0 then begin
		    define result as 13.0
        end else if num <= 196.0 then begin
		    define result as 14.0
        end else if num <= 225.0 then begin
		    define result as 15.0
        end else if num <= 256.0 then begin
		    define result as 16.0
        end else if num <= 289.0 then begin
		    define result as 17.0
        end else if num <= 324.0 then begin
		    define result as 18.0
        end else if num <= 361.0 then begin
		    define result as 19.0
        end else if num <= 400.0 then begin
		    define result as 20.0
        end else if num <= 441.0 then begin
		    define result as 21.0
        end else if num <= 484.0 then begin
		    define result as 22.0
        end else if num <= 529.0 then begin
		    define result as 23.0
        end else if num <= 576.0 then begin
		    define result as 24.0
        end else if num <= 625.0 then begin
		    define result as 25.0
        end
    end returns result: float

    @ Category "Operator"
    @ Block "[sqrt v] of (num)"
    @ Opcode "operator_mathop"
    define atomic mathSqrt (num: float) begin
        declare result as float
        define result as nearestPerfectSqrt(num)

        if not (num = result) then begin
            // Three iterations of newton
            define result as (result + (num / result)) / 2.0
            define result as (result + (num / result)) / 2.0
            define result as (result + (num / result)) / 2.0
        end
    end returns result: float

    define atomic mathAbs (n: integer) begin
        if n < 0 then begin
            define result as 0 - n
        end else begin
            define result as n
        end
    end returns result: integer

    @ Category "Operator"
    @ Block "[abs v] of (num)"
    @ Opcode "operator_mathop"
    define atomic mathAbsF (n: float) begin
        if n < 0.0 then begin
            define result as 0.0 - n
        end else begin
            define result as n
        end
    end returns result: float

    define atomic mathMax (n1: integer, n2: integer) begin
        if (n1 > n2) then begin
            define result as n1
        end else begin
            define result as n2
        end
    end returns result: integer

    define atomic mathMin (n1: integer, n2: integer) begin
        if (n1 < n2) then begin
            define result as n1
        end else begin
            define result as n2
        end
    end returns result: integer

    define atomic mathMaxF (n1: float, n2: float) begin
        if (n1 > n2) then begin
            define result as n1
        end else begin
            define result as n2
        end
    end returns result: float

    define atomic mathMinF (n1: float, n2: float) begin
        if (n1 < n2) then begin
            define result as n1
        end else begin
            define result as n2
        end
    end returns result: float

end

/**
 * The base functionality for all runtime entities available in Scratch.
 */
role RuntimeEntity is MathActor, KeyboardIO begin

    extern _RUNTIME_getInitialActors () returns list of string

    extern _RUNTIME_getClonesOf (ac: string) returns list of string

    extern _RUNTIME_getAllActors () returns list of string

    extern _RUNTIME_isActorTypeOf (ac: string, actorType: string) returns boolean

    extern _RUNTIME_restart ()

    /**
     * Signal that the current scene should be rendered,
     *   or: signal a behavior that should be visible to the user.
     */
    extern _RUNTIME_render ()

    /**
     * Returns the integer of milliseconds that
     * elapsed since the VM started.
     */
    extern _RUNTIME_millis () returns integer

    /**
     * Returns the integer of seconds that
     * elapsed since the VM started.
     */
    extern _RUNTIME_seconds () returns integer

    extern _RUNTIME_micros () returns integer

    extern _RUNTIME_waitMillis (ms: integer)

    extern _RUNTIME_waitMicros (micros: integer)

    extern _RUNTIME_waitSeconds (s: integer)

    extern _RUNTIME_timerValue () returns integer

    extern _RUNTIME_resetTimer ()

    extern _RUNTIME_signalFailure ()

    extern _RUNTIME_numberFromInterval (fromNum: integer, toNum: integer) returns integer

    extern _RUNTIME_integerFromInterval (fromNum: integer, toNum: integer) returns integer

    @ Category "Operator"
    @ Block "[ceiling v] of (num)"
    @ Opcode "operator_mathop"
    extern mathCeiling (n: float) returns integer

    @ Category "Operator"
    @ Block "[tan v] of (num)"
    @ Opcode "operator_mathop"
    extern mathTan (n: integer) returns integer

    @ Category "Operator"
    @ Block "[asin v] of (num)"
    @ Opcode "operator_mathop"
    extern mathAsin (n: integer) returns integer

    @ Category "Operator"
    @ Block "[acos v] of (num)"
    @ Opcode "operator_mathop"
    extern mathAcos (n: integer) returns integer

    @ Category "Operator"
    @ Block "[ln v] of (num)"
    @ Opcode "operator_mathop"
    extern mathLn(n: integer) returns integer

    @ Category "Operator"
    @ Block "[log v] of (num)"
    @ Opcode "operator_mathop"
    extern mathLog(n: integer) returns integer

    @ Category "Operator"
    @ Block "[e ^ v] of (num)"
    @ Opcode "operator_mathop"
    extern mathPowe(n: integer) returns integer

    @ Category "Operator"
    @ Block "[10 ^ v] of (num)"
    @ Opcode "operator_mathop"
    extern mathPowten(n: integer) returns integer

    extern label (str: string)

    /**
     * A random integer in the interval [from, to],
     * that is, both end points are included.
     */
    define randomIntegerBetween (intervalStart: integer, intervalEnd: integer) begin
        assume result >= intervalStart
        assume result <= intervalEnd
    end returns result: integer

    /**
     * See https://en.scratch-wiki.info/wiki/Pick_Random_()_to_()_(block)
     */
    define randomBetween (intervalStart: integer, intervalEnd: integer) begin
        define result as randomIntegerBetween(intervalStart, intervalEnd)
    end returns result: integer

    define getGraphicIdByIndex (idx: integer) begin
        define result as ""
    end returns result: string

    define getGraphicIndexById (id: string) begin
        define result as (0-1)
    end returns result: integer

    define getGraphicPixels (id: string) begin
        define result as ""
    end returns result: string

    define getImageWidth (ident: string) begin
        define result as 0
    end returns result: integer

    define getImageHeight (ident: string) begin
        define result as 0
    end returns result: integer

    define getNumGraphics () begin
        define result as 0
    end returns result: integer

    /**
     * A busy-waiting implementation.
     * The external method `_RUNTIME_waitSeconds` is intended to
     * not conduct a busy wait.
     */
    @ Category "Control"
    @ Block "wait (num) seconds"
    @ Opcode "control_wait"
    define waitSeconds (secs: integer) begin
        declare waitUntil as integer
        define waitUntil as _RUNTIME_seconds() + secs
        until (_RUNTIME_seconds() > waitUntil) repeat begin
        end
    end

    /**
     * A busy-waiting implementation.
     * The external method `_RUNTIME_waitMillis` is intended to
     * not conduct a busy wait.
     */
    @ Category "Control"
    @ Block "wait (num) millis"
    define waitMillis (millis: integer) begin
        declare waitUntil as integer
        define waitUntil as _RUNTIME_millis() + millis
        until (_RUNTIME_millis() > waitUntil) repeat begin
        end
    end

    /**
     * A busy-waiting implementation.
     * The external method `_RUNTIME_waitMicros` is intended to
     * not conduct a busy wait.
     */
    @ Category "Control"
    @ Block "wait (num) micros"
    define waitMicros (micros: integer) begin
        declare waitUntil as integer
        define waitUntil as _RUNTIME_micros() + micros
        until (_RUNTIME_micros() > waitUntil) repeat begin
        end
    end

    /**
     * A busy-waiting implementation for wait-until-condition.
     */
    @ Category "Control"
    @ Block "wait until <cond>"
    @ Opcode "wait_until"
    define waitUntil (cond: boolean) begin
        until cond repeat begin
        end
    end

    define atomic milliseconds () begin
        define result as _RUNTIME_millis()
    end returns result: integer

    define atomic microseconds () begin
        define result as _RUNTIME_micros()
    end returns result: integer

    @ Category "Sensing"
    @ Block "mouse down?"
    @ Opcode "sensing_mousedown"
    define atomic mouseDown () begin
    end returns result : boolean

    @ Category "Sensing"
    @ Block "mouse x"
    @ Opcode "sensing_mousex"
    define atomic mouseX () begin
        declare io as actor
        define io as locate actor "IOActor"
        define result as cast (attribute "mouseX" of io) to int
    end returns result: integer

    @ Category "Sensing"
    @ Block "mouse y"
    @ Opcode "sensing_mousey"
    define atomic mouseY ()  begin
        declare io as actor
        define io as locate actor "IOActor"
        define result as cast (attribute "mouseY" of io) to int
    end returns result: integer

    /**
     * Non-deterministic version of `mouseY`. Deprecated!
     * Needed (with this signature) to get some programs running.
     */
    define atomic getMouseY ()  begin
        // non-deterministic
    end returns result: integer

    /**
     * Non-deterministic version of `mouseY`. Deprecated!
     * Needed (with this signature) to get some programs running.
     */
    define atomic getMouseX ()  begin
        // non-deterministic
    end returns result: integer

    @ Category "Sensing"
    @ Block "key (integer as key) pressed?"
    @ Opcode "sensing_keypressed"
    define atomic keyPressedByCode (key: integer) begin
         define result as keyPressed() = key
    end returns result : boolean

    define atomic keyPressedByCodeNondet (key: integer) begin
    end returns result : boolean

    define atomic keyPressed () begin
        declare io as actor
        define io as locate actor "IOActor"
        define result as cast (attribute "keyPressed" of io) to int
    end returns result : integer

    define atomic keyPressedByCodeNondet (key: int) begin
         define result as keyPressedNondet() = key
    end returns result : boolean

    define atomic keyPressedNondet() begin
        // non-det (variable `result` is not initialized)
    end returns result : int

    @ Category "Sensing"
    @ Block "key (string as key) pressed?"
    @ Opcode "sensing_keypressed"
    define atomic keyPressedByName (name: string) begin
        declare key as integer
        define key as stringToKey(name)
        define result as keyPressedByCode(key)
    end returns result : boolean

    @ Category "Sensing"
    @ Block "loudness"
    @ Opcode "sensing_loudness"
    define atomic loudness () begin
        // non-deterministic
        assume result >= 0-1 // reported if permission for microphone is denied
        assume result <= 100
    end returns result : integer

end

/**
 * Functionality to observe the state and behaviour of (other) actors.
 * Typically inherited by actors of the specification concern.
 */
role Observer is RuntimeEntity begin

    @ Category "Specification"
    define atomic assert (cond: boolean) begin
        if not cond then begin
            _RUNTIME_signalFailure("Asserted property must be satisfied!")
        end
    end

    @ Category "Specification"
    define atomic fail(msg: string) begin
        _RUNTIME_signalFailure(msg)
    end

    @ Category "Specification"
    define atomic touchingObjects (fst: actor, snd: actor) begin
        declare xFst as integer
        define xFst as cast attribute "x" of fst to int
        declare yFst as integer
        define yFst as cast attribute "y" of fst to int

        assume xFst < 720
        assume xFst > 0-720
        assume yFst < 720
        assume yFst > 0-720

        declare xSnd as integer
        define xSnd as cast attribute "x" of snd to int
        declare ySnd as integer
        define ySnd as cast attribute "y" of snd to int

        assume xSnd <= 720
        assume xSnd >= 0-720
        assume ySnd <= 720
        assume ySnd >= 0-720

        declare halfWidthFst as integer
        declare halfHeightFst as integer
        define halfWidthFst as cast attribute "activeGraphicHalfWidth" of fst to int
        define halfHeightFst as cast attribute "activeGraphicHalfHeight" of fst to int

        declare halfWidthSnd as integer
        declare halfHeightSnd as integer
        define halfWidthSnd as cast attribute "activeGraphicHalfWidth" of snd to int
        define halfHeightSnd as cast attribute "activeGraphicHalfHeight" of snd to int

        define result as false

        declare fstLeft as integer
        declare fstRight as integer
        declare sndLeft as integer
        declare sndRight as integer

        declare fstTop as integer
        declare fstBottom as integer
        declare sndTop as integer
        declare sndBottom as integer

        define fstLeft as xFst - halfWidthFst
        define fstRight as xFst + halfWidthFst
        define sndLeft as xSnd - halfWidthSnd
        define sndRight as xSnd + halfWidthSnd

        define fstBottom as yFst - halfHeightFst
        define fstTop as yFst + halfHeightFst
        define sndBottom as ySnd - halfHeightSnd
        define sndTop as ySnd + halfHeightSnd

        declare xOverlap as boolean
        declare yOverlap as boolean

        define xOverlap as sndRight >= fstLeft and sndLeft <= fstRight
        define yOverlap as sndBottom <= fstTop and sndTop >= fstBottom

        if (xOverlap and yOverlap) then begin
            define result as true
        end

    end returns result : boolean

    @ Category "Specification"
    define atomic areDisjoint (fst: actor, snd: actor) begin
        define result as not touchingObjects(fst, snd)
    end returns result : boolean

    @ Category "Specification"
    define atomic touchingMousePointer (obj: actor) begin
        declare x as integer
        declare y as integer
        define x as cast attribute "x" of obj to int
        define y as cast attribute "y" of obj to int

        declare halfWidth as integer
        declare halfHeight as integer
        define halfWidth as cast attribute "activeGraphicHalfWidth" of obj to int
        define halfHeight as cast attribute "activeGraphicHalfHeight" of obj to int

        define result as true
        if not (mouseX() < x + halfWidth
            or mouseX() > x - halfWidth
            or mouseY() < y + halfHeight
            or mouseY() > y - halfHeight) then begin

            define result as false
        end
    end returns result : boolean

end

/**
 * The base functionality of all visual Scratch entities such
 * as the stage and the different sprites.
 */
role ScratchEntity is RuntimeEntity begin

    declare soundEffect as enum [ "pitch", "panLeftRight" ]
    declare pitchEffectValue as float
    declare panLeftRightValue as float

    declare volume as integer

    /**
     * The current layer of the entity
     * See https://en.scratch-wiki.info/wiki/Layer_(value)
     */
    declare layer as integer

    /**
     * 480 * 360 = 172800 pixels
     */
    declare activeGraphicPixels as list of integer
    declare activeGraphicIndex as integer
    declare activeGraphicName as string
    declare activeGraphicWidth as integer
    declare activeGraphicHeight as integer

    declare activeGraphicHalfWidth as integer
    declare activeGraphicHalfHeight as integer

    declare graphicsEffect as enum [ "color", "fisheye", "whirl", "pixelate", "mosaic", "brightness", "ghost" ]
    declare colorEffectValue as float
    declare fisheyeEffectValue as float
    declare whirlEffectValue as float
    declare pixelateEffectValue as float
    declare mosaicEffectValue as float
    declare brightnessEffectValue as float
    declare ghostEffectValue as float

    declare STAGE_WIDTH as integer
    declare STAGE_HEIGHT as integer
    declare STAGE_HALF_WIDTH as integer
    declare STAGE_HALF_HEIGHT as integer

    define STAGE_WIDTH as 480
    define STAGE_HEIGHT as 360
    define STAGE_HALF_WIDTH as 240
    define STAGE_HALF_HEIGHT as 180

    define colorEffectValue as 0.0

    define atomic simpleReturn (n: float) begin
        define result as n
    end returns result: float

    @ Category "Looks"
    @ Opcode "looks_switchcostumeto"
    @ Opcode "looks_switchbackdropto"
    define atomic changeActiveGraphicTo (id: string) begin
        define activeGraphicName as id
        define activeGraphicWidth as getImageWidth(id)
        define activeGraphicHeight as getImageHeight(id)

        define activeGraphicHalfWidth as getImageWidth(id) / 2
        define activeGraphicHalfHeight as getImageHeight(id) / 2
        //FIXME Set graphic pixels, this is currently not done as we do not supports lists yet
    end

    @ Category "Looks"
    @ Block "next backdrop"
    @ Block "switch backdrop to (next backdrop v)"
    @ Opcode "looks_nextbackdrop"
    @ Opcode "looks_switchbackdropto"
    define atomic switchBackdropToNext () begin
        // Implement me using broadcasts
    end

    @ Category "Looks"
    @ Block "switch backdrop to (previous backdrop v)"
    @ Opcode "looks_switchbackdropto"
    define atomic switchBackdropToPrev () begin
        // Implement me using broadcasts
    end

    @ Category "Looks"
    @ Block "switch backdrop to (random backdrop v)"
    @ Opcode "looks_switchbackdropto"
    define atomic switchBackdropToRandom () begin
        // Implement me using broadcasts
    end

    @ Category "Looks"
    @ Block "switch backdrop to (backdrop v)"
    @ Opcode "looks_switchbackdropto"
    define atomic switchBackdropToId (id: string) begin
        // Implement me using broadcasts
    end

    @ Category "Looks"
    @ Block "change (effect v) effect by (value)"
    @ Opcode "looks_changeeffectby"
    define atomic changeGraphicEffectBy (eff:string, val:integer) begin
    end

    @ Category "Looks"
    @ Block "clear graphic effects"
    @ Opcode "looks_cleargraphiceffects"
    define atomic clearGraphicEffects () begin
    end

    @ Category "Looks"
    @ Block "backdrop integer"
    @ Opcode "looks_backdropnumbername"
    define backdropNumber () begin
    end returns result : integer

    @ Category "Looks"
    @ Block "backdrop name"
    @ Opcode "looks_backdropnumbername"
    define backdropName () begin
    end returns result : string

    @ Category "Sound"
    @ Block "play sound (sound v) until done"
    @ Opcode "sound_playuntildone"
    define atomic playUntilDone (snd: integer) begin
    end

    @ Category "Sound"
    @ Block "start sound (sound v)"
    @ Opcode "sound_play"
    define startSound (snd: integer) begin
    end

    @ Category "Sound"
    @ Block "stop all sounds"
    @ Opcode "sound_stopallsounds"
    define stopAllSounds () begin
    end

    @ Category "Sound"
    @ Block "change (effect v) sound effect by (val)"
    @ Opcode "sound_changeeffectby"
    define changeSoundEffectBy (effect: string, val: integer) begin
    end

    @ Category "Sound"
    @ Block "set (effect v) sound effect to (val)"
    @ Opcode "sound_seteffectto"
    define setSoundEffectTo (effect: string, val: integer) begin
    end

    @ Category "Sound"
    @ Block "clear sound effects"
    @ Opcode "sound_cleareffects"
    define clearSoundEffects () begin
    end

    @ Category "Sound"
    @ Block "change volume by (delta)"
    @ Opcode "sound_changevolumeby"
    define changeVolumeBy (delta: integer) begin
        define volume as volume + delta
    end

    @ Category "Sound"
    @ Block "set volume to (percent)"
    @ Opcode "sound_setvolumeto"
    define setVolumeTo (perc: integer) begin
        define volume as perc
    end

    @ Category "Sound"
    @ Block "volume"
    @ Opcode "sound_volume"
    define volume () begin
        define result as volume
    end returns result : integer

    @ Category "Sensing"
    @ Block "ask (question as string) and wait"
    @ Opcode "sensing_askandwait"
    define atomic askAndWait (question: string) begin
        broadcast "ASK" () to "SYSTEM" and wait
    end

    @ Category "Sensing"
    @ Block "answer"
    @ Opcode "sensing_answer"
    define atomic answer () begin
        declare io as actor
        define io as locate actor "IOActor"
        define result as attribute "answer" of io
    end returns result : string

    define atomic integerAnswer () begin
        declare io as actor
        define io as locate actor "IOActor"
        define result as cast attribute "integerAnswer" of io to integer
    end returns result : integer

    @ Category "Sensing"
    @ Block "timer"
    @ Opcode "sensing_timer"
    define atomic timerValue () begin
        define result as timer
    end returns result : integer

    @ Category "Sensing"
    @ Block "reset timer"
    @ Opcode "sensing_resettimer"
    define atomic resetTimer () begin
        reset timer
    end

    @ Category "Sensing"
    @ Block "current [year v]"
    @ Opcode "sensing_current"
    define atomic currentYear () begin
        // non-deterministic
        assume result >= 2020
    end returns result : integer

    @ Category "Sensing"
    @ Block "current [month v]"
    @ Opcode "sensing_current"
    define atomic currentMonth () begin
        // non-deterministic
        assume result >= 1
        assume result <= 12
    end returns result : integer

    @ Category "Sensing"
    @ Block "current [date v]"
    @ Opcode "sensing_current"
    define atomic currentDate () begin
        // non-deterministic
        assume result >= 1
        assume result <= 31
    end returns result : integer

    @ Category "Sensing"
    @ Block "current [day of week v]"
    @ Opcode "sensing_current"
    define atomic currentDayOfWeek () begin
        // non-deterministic
        assume result >= 1
        assume result <= 7
    end returns result : integer

    @ Category "Sensing"
    @ Block "current [hour v]"
    @ Opcode "sensing_current"
    define atomic currentHour () begin
        // non-deterministic
        assume result >= 0
        assume result <= 23
    end returns result : integer

    @ Category "Sensing"
    @ Block "current [minute v]"
    @ Opcode "sensing_current"
    define atomic currentMinute () begin
        // non-deterministic
        assume result >= 0
        assume result <= 59
    end returns result : integer

    @ Category "Sensing"
    @ Block "current [second v]"
    @ Opcode "sensing_current"
    define atomic currentSecond () begin
        // non-deterministic
        assume result >= 0
        assume result <= 59
    end returns result : integer

    @ Category "Sensing"
    @ Block "days since 2000"
    @ Opcode "sensing_dayssince2000"
    define atomic daysSinceMillennium () begin
        // non-deterministic
        assume result > 7565.0
    end returns result : float

    @ Category "Sensing"
    @ Block "username"
    @ Opcode "sensing_username"
    define atomic username () begin
        // non-deterministic
    end returns result : string

    @ Category "Data"
    @ Block "show variable [variable v]"
    @ Block "show list [list v]"
    @ Opcode "data_showlist"
    @ Opcode "data_showvariable"
    define atomic showVariable (var: string) begin
        // there is no effect that is relevant for BASTET
    end

    @ Category "Data"
    @ Block "hide variable [variable v]"
    @ Block "hide list [list v]"
    @ Opcode "data_hidelist"
    @ Opcode "data_hidevariable"
    define atomic hideVariable (var: string) begin
        // there is no effect that is relevant for BASTET
    end

    @ Category "Control"
    @ Block "stop [this script v]"
    @ Opcode "control_stop"
    define atomic stopThisScript () begin
        stop this script
    end

    @ Category "Control"
    @ Block "stop [all v]"
    @ Opcode "control_stop"
    define atomic stopAll () begin
        stop all
    end

    @ Category "Control"
    @ Block "stop [other scripts in sprite v]"
    @ Opcode "control_stop"
    define atomic stopOtherScriptsInActor () begin
        stop other scripts in actor
    end

    @ Category "Control"
    @ Block "create clone of (sprite v)"
    @ Opcode "control_create_clone_of"
    define atomic createCloneOf (sprite: string) begin
        create clone of sprite
    end

    @ Category "Operator"
    @ Block "join (first) (second)"
    @ Opcode "operator_join"
    define atomic joinStrings (first: string, second: string) begin
        define result as join first second
    end returns result : string

    @ Category "Operator"
    @ Block "letter (num) of (string)"
    @ Opcode "operator_letter_of"
    define atomic letterOf (num: integer, str: string) begin
        define result as letter num of str
    end returns result : string

end

/**
 * The base functionality of all Scratch sprites.
 */
role ScratchSprite is ScratchEntity begin

    /**
     * x-coordinate in [-240,+240]
     * See https://en.scratch-wiki.info/wiki/Coordinate_System
     */
    declare x as integer

    /**
     * y-coordinate in [-180,+180]
     * See https://en.scratch-wiki.info/wiki/Coordinate_System
     */
    declare y as integer

    /**
     * Percent of the original size in [3,54000]
     * See https://en.scratch-wiki.info/wiki/Size_(value)
     */
    declare size as integer

    /**
     * The rotation of the sprite in [-360,+360]
     * See https://en.scratch-wiki.info/wiki/Direction_(value)
     */
    declare direction as integer

    declare rotationStyle as string

    /**
     * Whether or not the sprite is visible (difference to ghost mode!)
     * See https://en.scratch-wiki.info/wiki/Hide_(block)
     */
    declare visible as boolean

    declare draggable as boolean

    /**
     * Bubble above a ScratchSprite for saying or thinking text for a given duration
     * In Scratch if the bubbleText is empty, the bubble is not visible
     */
    declare bubbleText as string
    declare bubbleType as string
    declare bubbleStart as integer
    declare bubbleDuration as integer

    // Initialize the variables with their default values
    define size as 100
    define layer as 0
    define direction as 90
    define visible as true

    /**
     * DO NOT initialize the following and keep them NONDET:
     *      define x as 0
     *      define y as 0
     */

    @ Category "Motion"
    @ Block "point towards [actor v]"
    @ Opcode "motion_pointtowards"
    define atomic pointTowards (s: actor) begin
        declare targetX as integer
        declare targetY as integer

        define targetX as cast (attribute "x" of s) to int
        define targetY as cast (attribute "y" of s) to int

        pointTowardsPos(targetX, targetY)
    end

    @ Category "Motion"
    @ Block "point towards [mouse-pointer v]"
    @ Opcode "motion_pointtowards"
    define atomic pointTowardsPos (targetX: integer, targetY: integer) begin
       declare dx as float
       declare dy as float
       define dx as cast (targetX - x) to float
       define dy as cast (targetY - y) to float

       if dx = 0.0 and dy = 0.0 then begin
           define direction as 90
        end else begin
           define direction as cast radToDeg(mathAtan2(dy, dx)) to int
        end
    end

    define atomic pointTowardsSelf () begin
    end

    @ Category "Motion"
    @ Block "move (num) steps"
    @ Opcode "motion_movesteps"
    define atomic moveSteps (n: integer) begin
        declare nf as float
        define nf as cast n to float

        declare radians as float
        define radians as degToRad(90.0 - (cast direction to float))

        declare dx as float
        declare dy as float
        define dx as nf * mathCos(radians)
        define dy as nf * mathSin(radians)

        define x as x + (cast dx to int)
        define y as y + (cast dy to int)
    end

    @ Category "Motion"
    @ Block "go to x: (newX) y: (newY)"
    @ Opcode "motion_gotoxy"
    define atomic goTo (newX: integer, newY: integer) begin
        define x as newX
        define y as newY
    end

    @ Category "Motion"
    @ Block "go to (actor v)"
    @ Opcode "motion_goto"
    define atomic goToSprite (o: actor) begin
        declare otherX as integer
        define otherX as cast attribute "x" of o to int

        declare otherY as integer
        define otherY as cast attribute "y" of o to int

        define x as otherX
        define y as otherY
    end

    @ Category "Motion"
    @ Block "glide (num) secs to (random pos v)"
    @ Opcode "motion_glideto"
    define atomic glideSecondsToRandomPos (secs: integer) begin
        // ...
    end

    @ Category "Motion"
    @ Block "glide (num) secs to x: (targetX) y: (targetY)"
    @ Opcode "motion_glideto"
    define atomic glideSecondsTo (secs: integer, targetX: integer, targetY: integer) begin
        // also used for glide to mouse pointer
        // ...
    end

    @ Category "Motion"
    @ Block "glide (num) secs to (actor v)"
    @ Opcode "motion_glideto"
    define atomic glideSecondsToSprite (secs: integer, o: actor) begin
        // ...
    end

    @ Category "Looks"
    @ Block "hide"
    @ Opcode "looks_hide"
    define atomic hide () begin
        define visible as false
    end

    @ Category "Looks"
    @ Block "show"
    @ Opcode "looks_show"
    define atomic show () begin
        define visible as true
    end

    @ Category "Motion"
    @ Block "go to (random position v)"
    @ Opcode "motion_goto"
    define atomic goToRandomPosition () begin
        define x as randomIntegerBetween(0-240, 240)
        define y as randomIntegerBetween(0-180, 180)
    end

    @ Category "Motion"
    @ Block "change x by (increment)"
    @ Opcode "motion_changexby"
    define atomic changeXBy (increment: integer) begin
       define x as x + increment
    end

    @ Category "Motion"
    @ Block "change y by (increment)"
    @ Opcode "motion_changeyby"
    define atomic changeYBy (increment: int) begin
        define y as y + increment
    end

    @ Category "Looks"
    @ Block "costume (number v)"
    @ Opcode "looks_costumenumbername"
    define atomic costumeNumber () begin
        // ...
    end returns result : integer

    @ Category "Looks"
    @ Block "costume (name v)"
    @ Opcode "looks_costumenumbername"
    define atomic costumeName () begin
        // ...
    end returns result : string

    @ Category "Looks"
    @ Block "next costume"
    @ Opcode "looks_nextcostume"
    define atomic nextCostume () begin
        // ...
    end

    @ Category "Looks"
    @ Block "switch costume to (costume v)"
    @ Opcode "looks_switchcostumeto"
    define atomic changeCostumeTo (id: string) begin
        changeActiveGraphicTo(id)
    end

    @ Category "Looks"
    @ Block "go to [front v] layer"
    @ Opcode "looks_gotofrontback"
    define atomic goToFrontLayer () begin
        define layer as 1
    end

    @ Category "Looks"
    @ Block "go to [back v] layer"
    @ Opcode "looks_gotofrontback"
    define atomic goToBackLayer () begin
        // ...
    end

    @ Category "Looks"
    @ Block "go [forward v] (num) layers"
    @ Block "go [backward v] (num) layers"
    @ Opcode "looks_goforwardbackwardlayers"
    define atomic changeLayerBy (num: integer) begin
        // ...
    end

    @ Category "Sensing"
    @ Block "touching (edge v) ?"
    @ Opcode "sensing_touchingobject"
    define atomic touchingEdge () begin
        define result as false

        declare boundsLeft as integer
        declare boundsRight as integer
        declare boundsTop as integer
        declare boundsBottom as integer

        define boundsLeft as x - activeGraphicHalfWidth
        define boundsRight as x + activeGraphicHalfWidth
        define boundsTop as y + activeGraphicHalfHeight
        define boundsBottom as y - activeGraphicHalfHeight

        if (boundsLeft < (0 - STAGE_HALF_WIDTH)) then begin
            define result as true
        end

        if (boundsRight > STAGE_HALF_WIDTH) then begin
            define result as true
        end

        if (boundsTop > STAGE_HALF_HEIGHT) then begin
            define result as true
        end

        if (boundsBottom > (0 - STAGE_HALF_HEIGHT)) then begin
            define result as true
        end
    end returns result : boolean

    @ Category "Motion"
    @ Block "if on edge, bounce"
    @ Opcode "motion_ifonedgebounce"
    define atomic ifOnEdgeBounce () begin
        declare boundsLeft as integer
        declare boundsRight as integer
        declare boundsTop as integer
        declare boundsBottom as integer

        define boundsLeft as x - activeGraphicHalfWidth
        define boundsRight as x + activeGraphicHalfWidth
        define boundsTop as y + activeGraphicHalfHeight
        define boundsBottom as y - activeGraphicHalfHeight

        declare distLeft as integer
        declare distRight as integer
        declare distTop as integer
        declare distBottom as integer

        define distLeft as mathMax(0, STAGE_HALF_WIDTH + boundsLeft)
        define distTop as mathMax(0, STAGE_HALF_HEIGHT - boundsTop)
        define distRight as mathMax(0, STAGE_HALF_WIDTH - boundsRight)
        define distBottom as mathMax(0, STAGE_HALF_HEIGHT + boundsBottom)


        // 1 = left, 2 = bottom, 3 = right, 4 = top
        declare nearestEdge as integer

        declare minDist as integer
        define minDist as 99999

        if (distLeft < minDist) then begin
            define minDist as distLeft
            define nearestEdge as 1
        end
        if (distTop < minDist) then begin
            define minDist as distTop
            define nearestEdge as 4
        end
        if (distRight < minDist) then begin
            define minDist as distRight
            define nearestEdge as 3
        end
        if (distBottom < minDist) then begin
            define minDist as distBottom
            define nearestEdge as 2
        end

        if (minDist > 0) then begin
            // Not touching any edge.
        end else begin
            // Point away from the nearest edge.
            declare radians as float
            define radians as degToRad(90.0 - cast direction to float)

            declare dx as float
            declare dy as float
            define dx as mathCos(radians)
            define dy as 0.0 - mathSin(radians)

            if (nearestEdge = 1) then begin
                define dx as mathMaxF(0.2, mathAbsF(dx))
            end else if (nearestEdge = 4) then begin
                define dy as mathMaxF(0.2, mathAbsF(dy))
            end else if (nearestEdge = 3) then begin
                define dx as 0.0 - mathMaxF(0.2, mathAbsF(dx))
            end else if (nearestEdge = 2) then begin
                define dy as 0.0 - mathMaxF(0.2, mathAbsF(dy))
            end

            define direction as (cast radToDeg(mathAtan2(dy, dx)) to int) + 90

            // Keep within the stage.
            keepInStage()
        end
    end

    define atomic keepInStage () begin
        declare newX as integer
        declare newY as integer

        define newX as x
        define newY as y

        declare fenceLeft as integer
        declare fenceRight as integer
        declare fenceTop as integer
        declare fenceBottom as integer

        define fenceLeft as 0 - STAGE_HALF_WIDTH
        define fenceRight as STAGE_HALF_WIDTH
        define fenceTop as STAGE_HALF_HEIGHT
        define fenceBottom as 0 - STAGE_HALF_HEIGHT

        declare boundsLeft as integer
        declare boundsRight as integer
        declare boundsTop as integer
        declare boundsBottom as integer

        define boundsLeft as x - activeGraphicHalfWidth
        define boundsRight as x + activeGraphicHalfWidth
        define boundsTop as y + activeGraphicHalfHeight
        define boundsBottom as y - activeGraphicHalfHeight

        // Adjust the known bounds to the target position.
        define boundsLeft as boundsLeft + (newX - x)
        define boundsRight as boundsRight + (newX - x)
        define boundsTop as boundsTop + (newY - y)
        define boundsBottom as boundsBottom + (newY - y)

        // Find how far we need to move the target position.
        declare dx as integer
        declare dy as integer

        define dx as 0
        define dy as 0

        if (boundsLeft < fenceLeft) then begin
            define dx as dx + (fenceLeft - boundsLeft)
        end
        if (boundsRight > fenceRight) then begin
            define dx as dx + (fenceRight - boundsRight)
        end
        if (boundsTop > fenceTop) then begin
            define dy as dy + (fenceTop - boundsTop)
        end
        if (boundsBottom < fenceBottom) then begin
            define dy as dx + (fenceBottom - boundsBottom)
        end

        goTo(newX + dx, newY + dy)
    end

    @ Category "Sensing"
    @ Block "touching (mouse pointer v) ?"
    @ Opcode "sensing_touchingobject"
    define atomic touchingMousePointer () begin
        declare objLeft as integer
        define objLeft as x - activeGraphicHalfWidth
        declare objRight as integer
        define objRight as x + activeGraphicHalfWidth

        declare objTop as integer
        define objTop as y + activeGraphicHalfHeight
        declare objBottom as integer
        define objBottom as y - activeGraphicHalfHeight

        declare mx as integer
        define mx as mouseX()
        declare my as integer
        define my as mouseY()

        declare xOverlap as boolean
        define xOverlap as mx >= objLeft and mx <= objRight
        declare yOverlap as boolean
        define yOverlap as my >= objBottom and my <= objTop

        define result as xOverlap and yOverlap
    end returns result : boolean

    /**
     * To understand this method, it is important to be aware of the fact
     * that the x and y coordinates of a Sprite represents its center point.
     *
     * This method approximates the shape of a sprite based on a rectangle.
     */
    @ Category "Sensing"
    @ Block "touching (actor v) ?"
    @ Opcode "sensing_touchingobject"
    define atomic touchingObject (snd: actor) begin
        declare xFst as integer
        define xFst as x
        declare yFst as integer
        define yFst as y

        assume xFst < 720
        assume xFst > 0-720
        assume yFst < 720
        assume yFst > 0-720

        declare xSnd as integer
        define xSnd as cast attribute "x" of snd to int
        declare ySnd as integer
        define ySnd as cast attribute "y" of snd to int

        assume xSnd <= 720
        assume xSnd >= 0-720
        assume ySnd <= 720
        assume ySnd >= 0-720

        declare halfWidthFst as integer
        declare halfHeightFst as integer
        define halfWidthFst as activeGraphicHalfWidth
        define halfHeightFst as activeGraphicHalfHeight

        declare halfWidthSnd as integer
        declare halfHeightSnd as integer
        define halfWidthSnd as cast attribute "activeGraphicHalfWidth" of snd to int
        define halfHeightSnd as cast attribute "activeGraphicHalfHeight" of snd to int

        define result as false

        assume halfWidthSnd <= 720
        assume halfWidthSnd > 0
        assume halfWidthFst < 720
        assume halfWidthFst > 0

        assume halfHeightSnd <= 720
        assume halfHeightSnd > 0
        assume halfHeightFst <= 720
        assume halfHeightFst > 0

        declare fstLeft as integer
        declare fstRight as integer
        declare sndLeft as integer
        declare sndRight as integer

        declare fstTop as integer
        declare fstBottom as integer
        declare sndTop as integer
        declare sndBottom as integer

        define fstLeft as xFst - halfWidthFst
        define fstRight as xFst + halfWidthFst
        define sndLeft as xSnd - halfWidthSnd
        define sndRight as xSnd + halfWidthSnd

        define fstBottom as yFst - halfHeightFst
        define fstTop as yFst + halfHeightFst
        define sndBottom as ySnd - halfHeightSnd
        define sndTop as ySnd + halfHeightSnd

        declare xOverlap as boolean
        declare yOverlap as boolean

        define xOverlap as sndRight >= fstLeft and sndLeft <= fstRight
        define yOverlap as sndBottom <= fstTop and sndTop >= fstBottom

        if (xOverlap and yOverlap) then begin
            define result as true
        end
    end returns result : boolean

    @ Category "Sensing"
    define atomic isDisjointFrom (snd: actor) begin
        define result as not touchingObject(snd)
    end returns result : boolean

    define atomic rgb (r: integer, g: integer, b: integer) begin
        define result as (65536 * r + 256 * g + b)
    end returns result : integer

    @ Category "Sensing"
    @ Block "touching color (color) ?"
    @ Opcode "sensing_touchingcolor"
    define atomic touchingColor (color: integer) begin
        // ...
    end returns result : boolean

    @ Category "Sensing"
    @ Block "color (color) is touching (touching) ?"
    @ Opcode "sensing_coloristouchingcolor"
    define atomic colorIsTouchingColor (color: integer, touching: integer) begin
        // ...
    end returns result : boolean

    @ Category "Sensing"
    @ Block "distance to (mouse pointer v)"
    @ Opcode "sensing_distanceto"
    define distanceToMousePointer () begin
        define result as distanceTo(mouseX(), mouseY())
    end returns result : integer

    /**
     * We use a 'TaxiCap' approximation:
     * https://en.wikibooks.org/wiki/Algorithms/Distance_approximations
     */
    define distanceTo (targetX: integer, targetY: integer) begin
        // ...
        declare dx as integer
        declare dy as integer
        define dx as mathAbs(x - targetX)
        define dy as mathAbs(y - targetY)
        define result as dx + dy
    end returns result : integer

    @ Category "Looks"
    @ Block "say (msg) for (num) seconds"
    @ Opcode "looks_sayforsecs"
    define atomic sayTextFor (msg: string, scs: integer) begin
        // msgBounded = substr(msg, 0, 330)
        define bubbleText as msg
        define bubbleStart as _RUNTIME_millis()
        define bubbleType as "say"
        define bubbleDuration as scs
    end

    @ Category "Looks"
    @ Block "think (msg) for (num) seconds"
    @ Opcode "looks_thinkforsecs"
    define atomic thinkTextFor (msg: string, scs: integer) begin
        // msgBounded = substr(msg, 0, 330)
        define bubbleText as msg
        define bubbleStart as _RUNTIME_millis()
        define bubbleType as "think"
        define bubbleDuration as scs
    end

    @ Category "Looks"
    @ Block "think (msg)"
    @ Opcode "looks_think"
    define atomic thinkText (msg: string) begin
        define bubbleText as msg
        define bubbleStart as _RUNTIME_millis()
        define bubbleType as "think"
    end

    @ Category "Looks"
    @ Block "say (msg)"
    @ Opcode "looks_say"
    define atomic sayText (msg: string) begin
        define bubbleText as msg
        define bubbleStart as _RUNTIME_millis()
        define bubbleType as "say"
    end

    define atomic say (msg: string) begin
        sayText(msg)
    end

    @ Category "Motion"
    @ Block "turn left (num) degrees"
    @ Opcode "motion_turnleft"
    define atomic turnLeft (degrees: integer) begin
        setDirection(direction - degrees)
    end

    @ Category "Motion"
    @ Block "turn right (num) degrees"
    @ Opcode "motion_turnright"
    define atomic turnRight (degrees: integer) begin
        setDirection(direction + degrees)
    end

    @ Category "Motion"
    @ Block "point in direction (num)"
    @ Opcode "motion_pointindirection"
    define atomic pointInDirection (dir: integer) begin
        setDirection(dir)
    end

    define atomic setDirection (dir: integer) begin
        // TODO do we need to check if we are in the stage
        // Make sure direction is between -179 and 180
        declare wrapped as float
        define wrapped as wrapClamp(cast dir to float, 0.0-179.0, 180.0)
        define direction as cast wrapped to int
    end

    script on message "CLICK" () in "SYSTEM" do begin
        if touchingMousePointer() then begin
            broadcast "SPRITE_CLICK" () to self
        end
    end

end

/**
 * The base functionality of the Scratch stage.
 */
role ScratchStage is ScratchEntity begin

    declare currentIdx as integer

    declare videoTransparency as integer

    declare videoState as string

    declare tempo as integer

    define currentIdx as 0

    @ Category "Looks"
    @ Block "switch backdrop to (id v) and wait"
    @ Opcode "looks_switchbackdroptoandwait"
    define atomic switchBackdropToAndWait (id: string) begin
        // ...
    end

    define atomic switchBackdropTo (id: string) begin
        changeActiveGraphicTo(id)
    end

    define atomic nextBackdrop () begin
        declare idx as integer
        define idx as getGraphicIndexById(activeGraphicName)
        define idx as (currentIdx+1) mod getNumGraphics()

        declare id as string
        define id as getGraphicIdByIndex(currentIdx)

        changeActiveGraphicTo(id)
    end

    define atomic previousBackdrop () begin
        declare idx as integer
        define idx as getGraphicIndexById(activeGraphicName)
        define idx as (currentIdx-1) mod getNumGraphics()

        declare id as string
        define id as getGraphicIdByIndex(currentIdx)

        changeActiveGraphicTo(id)
    end

    define atomic randomBackdrop () begin
         declare idx as integer
         define idx as getGraphicIndexById(activeGraphicName)
         define idx as randomIntegerBetween(0, getNumGraphics()-1)

         declare id as string
         define id as getGraphicIdByIndex(currentIdx)

         changeActiveGraphicTo(id)
    end

end
