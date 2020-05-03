module ScratchLibrary

actor IOActor begin

    declare mouseX as int

    declare mouseY as int

    declare answer as string

    // Key code of the currently pressed key
    declare key_pressed as int

end


role MathActor begin

    declare PI as float
    declare PI_HALF as float
    declare PI_SQR_TIMES_FIVE as float
    declare TWO_PI as float

    define PI as 3.14159265359
    define TWO_PI as 6.28318530718
    define PI_HALF as  1.570796326795
    define PI_SQR_TIMES_FIVE as 49.34802200545329


    // WrampClamp function takes a value and makes sure it is within the given bounds
    // param value: float - the value that will be wrapped
    // param min: float - the lower bound
    // param max: flaot - the upper bound
    // return result: float - the wrapped value
    define atomic wrapClamp(value: float, min: float, max: float) begin
        declare range as float
        define range as ((max - min) + 1.0)
        define result as (value - (mathFloor((value - min) / range) * range))
    end returns result : float

    define atomic mathFloor (n: float) begin
        declare num as int
        define num as cast n to int
        define result as cast num to float
        if result > n then begin
            define result as result - 1.0
        end

    end returns result : float

    // mathAtan approximates the Atan value in radians for a given "real" value
    // param n : float - the real value for which the Atan value is approximated
    // return result: float - the approximated interval of the Atan value
    define atomic mathAtan  (input: float) begin

        if input > TWO_PI then begin
            declare asDeg as int
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

    // mathAtan2 approximates the Atan2 value in radians for two given "real" numbers.
    // The result is the angle between the positive x-axis and ray from (0,0) to (x,y)
    //
    // param x : float - x-coordinate of the target point
    // param y : float - y-coordinate of the target point
    // return result: float - the approximated interval of the Atan2 value
    define atomic mathAtan2(x: float, y: float) begin
        if x > 0.0 then begin
            define result as mathAtan((y / x))
        end else if x < 0.0 and y > 0.0 then begin
            // TODO use constant for pi
            define result as mathAtan((y/x)) +  PI
        end else if x < 0.0 and y = 0.0 then begin
            declare nondet as int
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

    // mathSin approximates the sin value for a given radians number
    //
    // param alpha : float - radians number for which the sin value will be approximated
    // return result: float - the approximated interval
    define atomic mathSin  (input: float) begin
        if input > TWO_PI then begin
            declare asDeg as int
            define asDeg as cast (radToDeg(input)) to int
            define asDeg as asDeg mod 360
            define input as degToRad(asDeg)
        end

        if input >=  0.0  and input <  0.1571 then begin
            assume result >  0.0
            assume result <=  0.1565
        end else if input >=  0.1571  and input <  0.3142 then begin
            assume result >  0.1565
            assume result <=  0.3091
        end else if input >=  0.3142  and input <  0.4712 then begin
            assume result >  0.3091
            assume result <=  0.454
        end else if input >=  0.4712  and input <  0.6283 then begin
            assume result >  0.454
            assume result <=  0.5878
        end else if input >=  0.6283  and input <  0.7854 then begin
            assume result >  0.5878
            assume result <=  0.7071
        end else if input >=  0.7854  and input <  0.9425 then begin
            assume result >  0.7071
            assume result <=  0.809
        end else if input >=  0.9425  and input <  1.0996 then begin
            assume result >  0.809
            assume result <=  0.891
        end else if input >=  1.0996  and input <  1.2566 then begin
            assume result >  0.891
            assume result <=  0.951
        end else if input >=  1.2566  and input <  1.4137 then begin
            assume result >  0.951
            assume result <=  0.9877
        end else if input >=  1.4137  and input <  1.5708 then begin
            assume result >  0.9877
            assume result <=  1.0
        end else if input >=  1.5708  and input <  1.7279 then begin
            assume result <=  1.0
            assume result >  0.9877
        end else if input >=  1.7279  and input <  1.885 then begin
            assume result <=  0.9877
            assume result >  0.951
        end else if input >=  1.885  and input <  2.042 then begin
            assume result <=  0.951
            assume result >  0.891
        end else if input >=  2.042  and input <  2.1991 then begin
            assume result <=  0.891
            assume result >  0.809
        end else if input >=  2.1991  and input <  2.3562 then begin
            assume result <=  0.809
            assume result >  0.7071
        end else if input >=  2.3562  and input <  2.5133 then begin
            assume result <=  0.7071
            assume result >  0.5878
        end else if input >=  2.5133  and input <  2.6704 then begin
            assume result <=  0.5878
            assume result >  0.4539
        end else if input >=  2.6704  and input <  2.8274 then begin
            assume result <=  0.4539
            assume result >  0.309
        end else if input >=  2.8274  and input <  2.9845 then begin
            assume result <=  0.309
            assume result >  0.1564
        end else if input >=  2.9845  and input <  3.1416 then begin
            assume result <=  0.1564
            assume result >  0.0
        end else if input >=  3.1416  and input <  3.2987 then begin
            assume result <=  0.0
            assume result >  0.0-0.1565
        end else if input >=  3.2987  and input <  3.4558 then begin
            assume result <=  0.0-0.1565
            assume result >  0.0-0.3091
        end else if input >=  3.4558  and input <  3.6128 then begin
            assume result <=  0.0-0.3091
            assume result >  0.0-0.454
        end else if input >=  3.6128  and input <  3.7699 then begin
            assume result <=  0.0-0.454
            assume result >  0.0-0.5878
        end else if input >=  3.7699  and input <  3.927 then begin
            assume result <=  0.0-0.5878
            assume result >  0.0-0.7071
        end else if input >=  3.927  and input <  4.0841 then begin
            assume result <=  0.0-0.7071
            assume result >  0.0-0.809
        end else if input >=  4.0841  and input <  4.2412 then begin
            assume result <=  0.0-0.809
            assume result >  0.0-0.891
        end else if input >=  4.2412  and input <  4.3982 then begin
            assume result <=  0.0-0.891
            assume result >  0.0-0.951
        end else if input >=  4.3982  and input <  4.5553 then begin
            assume result <=  0.0-0.951
            assume result >  0.0-0.9877
        end else if input >=  4.5553  and input <  4.7124 then begin
            assume result <=  0.0-0.9877
            assume result >  0.0-1.0
        end else if input >=  4.7124  and input <  4.8695 then begin
            assume result >  0.0-1.0
            assume result <=  0.0-0.9877
        end else if input >=  4.8695  and input <  5.0265 then begin
            assume result >  0.0-0.9877
            assume result <=  0.0-0.9511
        end else if input >=  5.0265  and input <  5.1836 then begin
            assume result >  0.0-0.9511
            assume result <=  0.0-0.891
        end else if input >=  5.1836  and input <  5.3407 then begin
            assume result >  0.0-0.891
            assume result <=  0.0-0.809
        end else if input >=  5.3407  and input <  5.4978 then begin
            assume result >  0.0-0.809
            assume result <=  0.0-0.7071
        end else if input >=  5.4978  and input <  5.6549 then begin
            assume result >  0.0-0.7071
            assume result <=  0.0-0.5878
        end else if input >=  5.6549  and input <  5.8119 then begin
            assume result >  0.0-0.5878
            assume result <=  0.0-0.454
        end else if input >=  5.8119  and input <  5.969 then begin
            assume result >  0.0-0.454
            assume result <=  0.0-0.309
        end else if input >=  5.969  and input <  6.1261 then begin
            assume result >  0.0-0.309
            assume result <=  0.0-0.1564
        end
    end returns result: float

     // mathCos approximates the cos value for a given radians number
     //
     // param alpha : float - radians number for which the cos value will be approximated
     // return result: float - the approximated interval
    define atomic mathCos  (input: float) begin
        if input > TWO_PI then begin
            declare asDeg as int
            define asDeg as cast (radToDeg(input)) to int
            define asDeg as asDeg mod 360
            define input as degToRad(asDeg)
        end

        if input >=  0.0  and input <  0.1571 then begin
            assume result <=  1.0
            assume result >  0.9877
        end else if input >=  0.1571  and input <  0.3142 then begin
            assume result <=  0.9877
            assume result >  0.951
        end else if input >=  0.3142  and input <  0.4712 then begin
            assume result <=  0.951
            assume result >  0.891
        end else if input >=  0.4712  and input <  0.6283 then begin
            assume result <=  0.891
            assume result >  0.809
        end else if input >=  0.6283  and input <  0.7854 then begin
            assume result <=  0.809
            assume result >  0.7071
        end else if input >=  0.7854  and input <  0.9425 then begin
            assume result <=  0.7071
            assume result >  0.5878
        end else if input >=  0.9425  and input <  1.0996 then begin
            assume result <=  0.5878
            assume result >  0.454
        end else if input >=  1.0996  and input <  1.2566 then begin
            assume result <=  0.454
            assume result >  0.3091
        end else if input >=  1.2566  and input <  1.4137 then begin
            assume result <=  0.3091
            assume result >  0.1565
        end else if input >=  1.4137  and input <  1.5708 then begin
            assume result <=  0.1565
            assume result >  0.0
        end else if input >=  1.5708  and input <  1.7279 then begin
            assume result <=  0.0
            assume result >  0.0-0.1565
        end else if input >=  1.7279  and input <  1.885 then begin
            assume result <=  0.0-0.1565
            assume result >  0.0-0.3091
        end else if input >=  1.885  and input <  2.042 then begin
            assume result <=  0.0-0.3091
            assume result >  0.0-0.454
        end else if input >=  2.042  and input <  2.1991 then begin
            assume result <=  0.0-0.454
            assume result >  0.0-0.5878
        end else if input >=  2.1991  and input <  2.3562 then begin
            assume result <=  0.0-0.5878
            assume result >  0.0-0.7071
        end else if input >=  2.3562  and input <  2.5133 then begin
            assume result <=  0.0-0.7071
            assume result >  0.0-0.809
        end else if input >=  2.5133  and input <  2.6704 then begin
            assume result <=  0.0-0.809
            assume result >  0.0-0.891
        end else if input >=  2.6704  and input <  2.8274 then begin
            assume result <=  0.0-0.891
            assume result >  0.0-0.951
        end else if input >=  2.8274  and input <  2.9845 then begin
            assume result <=  0.0-0.951
            assume result >  0.0-0.9877
        end else if input >=  2.9845  and input <  3.1416 then begin
            assume result <=  0.0-0.9877
            assume result >  0.0-1.0
        end else if input >=  3.1416  and input <  3.2987 then begin
            assume result <=  0.0-1.0
            assume result >  0.0-0.9877
        end else if input >=  3.2987  and input <  3.4558 then begin
            assume result <=  0.0-0.9877
            assume result >  0.0-0.951
        end else if input >=  3.4558  and input <  3.6128 then begin
            assume result <=  0.0-0.951
            assume result >  0.0-0.891
        end else if input >=  3.6128  and input <  3.7699 then begin
            assume result <=  0.0-0.891
            assume result >  0.0-0.809
        end else if input >=  3.7699  and input <  3.927 then begin
            assume result <=  0.0-0.809
            assume result >  0.0-0.7071
        end else if input >=  3.927  and input <  4.0841 then begin
            assume result <=  0.0-0.7071
            assume result >  0.0-0.5878
        end else if input >=  4.0841  and input <  4.2412 then begin
            assume result <=  0.0-0.5878
            assume result >  0.0-0.4539
        end else if input >=  4.2412  and input <  4.3982 then begin
            assume result <=  0.0-0.4539
            assume result >  0.0-0.309
        end else if input >=  4.3982  and input <  4.5553 then begin
            assume result <=  0.0-0.309
            assume result >  0.0-0.1564
        end else if input >=  4.5553  and input <  4.7124 then begin
            assume result <=  0.0-0.1564
            assume result >  0.0
        end else if input >=  4.7124  and input <  4.8695 then begin
            assume result <=  0.0
            assume result >  0.1565
        end else if input >=  4.8695  and input <  5.0265 then begin
            assume result <=  0.1565
            assume result >  0.309
        end else if input >=  5.0265  and input <  5.1836 then begin
            assume result <=  0.309
            assume result >  0.454
        end else if input >=  5.1836  and input <  5.3407 then begin
            assume result <=  0.454
            assume result >  0.5878
        end else if input >=  5.3407  and input <  5.4978 then begin
            assume result <=  0.5878
            assume result >  0.7071
        end else if input >=  5.4978  and input <  5.6549 then begin
            assume result <=  0.7071
            assume result >  0.809
        end else if input >=  5.6549  and input <  5.8119 then begin
            assume result <=  0.809
            assume result >  0.891
        end else if input >=  5.8119  and input <  5.969 then begin
            assume result <=  0.891
            assume result >  0.951
        end else if input >=  5.969  and input <  6.1261 then begin
            assume result <=  0.951
            assume result >  0.9877
        end
    end returns result: float

    // radToDeg calculates the degree value for a given radians valuenumber
    //
    // param rad: float - radians number for which the degree value will be calculated
    // return result: float - the calculated degree value
    define atomic radToDeg(rad: float) begin
        define result as ((rad * 180.0) / PI)
    end returns result: float

    // degToRad calculates the radians value for a given degree value
    //
    // param deg: float - degree number for which the radians value will be calculated
    // return result: float - the calculated radians value
    define atomic degToRad(deg: float) begin
        define result as (deg * PI) / 180.0
    end returns result: float

    define atomic nearestPerfectSqrt(num: float) begin
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


    define atomic mathSqrt(num: float) begin
        declare result as float
        define result as nearestPerfectSqrt(num)

        if not (num = result) then begin
            // Three iterations of newton
            define result as (result + (num /result)) / 2.0
            define result as (result + (num /result)) / 2.0
            define result as (result + (num /result)) / 2.0
        end
    end returns result: float

    define atomic mathAbsF(n: float) begin
        if n < 0.0 then begin
            define result as n * (0.0-1.0)
        end else begin
            define result as n
        end

    end returns result: float
end

role RuntimeEntity is MathActor begin

extern _RUNTIME_getInitialActors () returns list of string

    extern _RUNTIME_getClonesOf (ac: string) returns list of string

    extern _RUNTIME_getAllActors () returns list of string

    extern _RUNTIME_isActorTypeOf (ac: string, actorType: string) returns boolean

    extern _RUNTIME_restart ()

    // Signal that the current scene should be rendered,
    //   or: signal a behavior that should be visible to the user.
    extern _RUNTIME_render ()

    // Returns the int of milliseconds that
    // elapsed since the VM started.
    extern _RUNTIME_millis () returns int

    // Returns the int of seconds that
    // elapsed since the VM started.
    extern _RUNTIME_seconds () returns int

    extern _RUNTIME_micros () returns int

    extern _RUNTIME_waitMillis (ms: int)

    extern _RUNTIME_waitMicros (micros: int)

    extern _RUNTIME_waitSeconds (s: int)

    extern _RUNTIME_timerValue () returns int

    extern _RUNTIME_resetTimer ()

    extern _RUNTIME_signalFailure ()

    extern _RUNTIME_numberFromInterval (from_num: int, to_num: int) returns int

    extern _RUNTIME_integerFromInterval (from_num: int, to_num: int) returns int

    // A random integer in the interval [from, to],
    // that is, both end points are included.
    extern randomIntegerBetween (intervalStart: int, intervalEnd: int) returns int

    // See https://en.scratch-wiki.info/wiki/Pick_Random_()_to_()_(block)
    extern randomBetween (intervalStart: int, intervalEnd: int) returns int

    extern mathAbs (n: int) returns int

    extern mathCeiling (n: int) returns int

    extern mathTan (n: int) returns int

    extern mathAsin (n: int) returns int

    extern mathAcos (n: int) returns int

    extern mathLn(n: int) returns int

    extern mathLog(n: int) returns int

    extern mathPowe(n: int) returns int

    extern mathPowten(n: int) returns int

    extern label (str: string)

    define getMouseX()  begin
        declare io as actor

        define io as locate actor "IOActor"
        define result as cast (attribute "mouseX" of io) to int
    end returns result: int

    define getMouseY()  begin
        declare io as actor

        define io as locate actor "IOActor"
        define result as cast (attribute "mouseY" of io) to int
    end returns result: int

    define getGraphicIdByIndex (idx: int) begin
        define result as ""
    end returns result: string

    define getGraphicIndexById (id: string) begin
        define result as (0-1)
    end returns result: int

    define getGraphicPixels (id: string) begin
        define result as ""
    end returns result: string

    define getImageWidth (ident: string) begin
        define result as 0
    end returns result: int

    define getImageHeight (ident: string) begin
        define result as 0
    end returns result: int

    define getNumGraphics () begin
        define result as 0
    end returns result: int

    // @Category "Control"
    // @Block "wait <Num> seconds"
    define waitSeconds (secs: int) begin
        // A busy-waiting implementation.
        // The external methode`_RUNTIME_waitSeconds` is intended to
        // not conduct a busy wait.
        declare waitUntil as int
        define waitUntil as _RUNTIME_seconds() + secs
        until (_RUNTIME_seconds() > waitUntil) repeat begin
        end
    end

    // @Category "Control"
    // @Block "wait <Num> millis"
    define waitMillis (millis: int) begin
        // A busy-waiting implementation.
        // The external method `_RUNTIME_waitMillis` is intended to
        // not conduct a busy wait.
        declare waitUntil as int
        define waitUntil as _RUNTIME_millis() + millis
        until (_RUNTIME_millis() > waitUntil) repeat begin
        end
    end

    // @Category "Control"
    // @Block "wait <Num> micros"
    define waitMicros (micros: int) begin
        // A busy-waiting implementation.
        // The external method `_RUNTIME_waitMicros` is intended to
        // not conduct a busy wait.
        declare waitUntil as int
        define waitUntil as _RUNTIME_micros() + micros
        until (_RUNTIME_micros() > waitUntil) repeat begin
        end
    end

    define atomic milliseconds() begin
        define result as _RUNTIME_millis()
    end returns result: int

    define atomic microseconds() begin
        define result as _RUNTIME_micros()
    end returns result: int
    end

    role Observer is RuntimeEntity begin

    // @Category "Specification"
    define atomic assert (condition: boolean) begin
        if not condition then begin
            _RUNTIME_signalFailure("Asserted property must be satisfied!")
        end
    end

    // @Category "Specification"
    define atomic touchingObjects (fst: actor, snd: actor) begin
            declare size_fst as float
            declare width as float
            declare height as float

            // TODO: Query attributes of myself and the other actor
            define width as cast (cast attribute "active_graphic_width" of fst to int) to float
            define height as cast (cast attribute "active_graphic_height" of fst to int) to float
            define size_fst as cast (cast attribute "size" of fst to int) to float

            define width as width * (size_fst / 100.0)
            define height as height * (size_fst / 100.0)

            declare size_snd as float
            declare width_snd as float
            declare height_snd as float
            define width_snd as cast (cast attribute "active_graphic_width" of snd to int) to float
            define height_snd as cast (cast attribute "active_graphic_height" of snd to int) to float

            define size_snd as cast (cast attribute "size" of snd to int) to float
            define width_snd as width_snd * (size_snd / 100.0)
            define height_snd as height_snd * (size_snd / 100.0)

            declare x_snd as float
            define x_snd as cast (cast attribute "x" of snd to int) to float
            declare y_snd as float
            define y_snd as cast (cast attribute "y" of snd to int) to float

            declare x_fst as float
            define x_fst as cast (cast attribute "x" of fst to int) to float
            declare y_fst as float
            define y_fst as cast (cast attribute "y" of fst to int) to float

            define result as false

            declare condOne as boolean
            declare condTwo as boolean
            declare condThree as boolean
            declare condFour as boolean
            declare condFive as boolean

            define condOne as (x_fst + width / 2.0 > x_snd - width_snd / 2.0 and y_fst + height / 2.0 > y_snd - height_snd / 2.0)
            define condTwo as (x_fst - width / 2.0 < x_snd + width_snd / 2.0 and  y_fst + height / 2.0 > y_snd - height_snd / 2.0)
            define condThree as (x_snd + width_snd / 2.0 > x_fst - width / 2.0 and y_snd + height_snd / 2.0 > y_fst - height / 2.0)
            define condFour as (x_snd - width_snd / 2.0 < x_fst + width / 2.0 and  y_snd + height_snd / 2.0 > y_fst - height / 2.0)
            define condFive as (x_fst = x_snd and y_fst = y_snd)

            if (condOne or condTwo or condThree or condFour or condFive) then begin
                define result as true
            end

    end returns result : boolean

    // @Category "Specification"
    define atomic touchingMousePointer (obj: actor) begin
        declare x as int
        declare y as int
        define x as cast attribute "x" of obj to int
        define y as cast attribute "y" of obj to int

        declare width as int
        declare height as int
        define width as cast attribute "active_graphic_width" of obj to int
        define height as cast attribute "active_graphic_height" of obj to int

        define result as true
        if not (getMouseX() < x + width / 2
            or getMouseX() > x - width / 2
            or getMouseY() < y + height / 2
            or getMouseY() > y - height / 2) then begin

            define result as false
        end
    end returns result : boolean

end

role ScratchEntity is RuntimeEntity begin

    declare sound_effect as enum [ "pitch", "pan_left_right" ]
    declare volume as int

    // 480 * 360 = 172800 pixels
    declare active_graphic_pixels as list of int
    declare active_graphic_index as int
    declare active_graphic_name as string
    declare active_graphic_width as int
    declare active_graphic_height as int

    declare graphics_effect as enum [ "color", "fisheye", "whirl", "pixelate", "mosaic", "brightness", "ghost" ]
    declare color_effect_value as float
    declare fisheye_effect_value as float
    declare whirl_effect_value as float
    declare pixelate_effect_value as float
    declare mosaic_effect_value as float
    declare brightness_effect_value as float
    declare ghost_effect_value as float

    define color_effect_value as 0.0

    define atomic simpleReturn(n:float) begin
        define result as n
    end returns result: float

    // @Category "Looks"
    define atomic changeActiveGraphicTo (id: string) begin
        define active_graphic_name as id
        define active_graphic_width as getImageWidth(id)
        define active_graphic_height as getImageHeight(id)
        //FIXME Set graphic pixels, this is currently not done as we do not supports lists yet
    end

    // @Category "Looks"
    // @Block "change <string as effect> effect by <int as value>
    define atomic changeGraphicEffectBy (eff:string, val:int) begin
    end

    // @Category "Looks"
    // @Block "clear graphic effects"
    define atomic clearGraphicEffects () begin
    end

    // @Category "Looks"
    // @Block "backdrop int"
    define backdropNumber () begin
    end returns result : int

    // @Category "Looks"
    // @Block "backdrop name"
    define backdropName () begin
    end returns result : string

    // @Category "Sound"
    // @Block "play sound <sound as snd> until done"
    define atomic playUntilDone (snd: int) begin
    end

    // @Category "Sound"
    // @Block "start sound <sound as snd>"
    define startSound (snd: int) begin
    end

    // @Category "Sound"
    // @Block "stop all sounds"
    define stopAllSounds () begin
    end

    // @Category "Sound"
    // @Block "change <string as effect> sound effect by <int as num>"
    define changeSoundEffectBy (eff: string, val: int) begin
    end

    // @Category "Sound"
    // @Block "set <string as effect> sound effect to <int as num>"
    define setSoundEffectTo (eff: string, val: int) begin
    end

    // @Category "Sound"
    // @Block "clear sound effects"
    define clearSoundEffects () begin
    end

    // @Category "Sound"
    // @Block "change volume by <int as delta>"
    define changeVolumeBy (delta: int) begin
    end

    // @Category "Sound"
    // @Block "set volume to <int as percent>"
    define setVolumeTo (perc: int) begin
    end

    // @Category "Sound"
    // @Block "volume"
    define volume () begin
    end returns result : int

end

role ScratchSprite is ScratchEntity begin

    // x-coordinate in [-240,+240]
    // See https://en.scratch-wiki.info/wiki/Coordinate_System
    declare x as int

    // y-coordinate in [-180,+180]
    // See https://en.scratch-wiki.info/wiki/Coordinate_System
    declare y as int

    // Percent of the original size in [3,54000]
    // See https://en.scratch-wiki.info/wiki/Size_(value)
    declare size as int

    // The current layer of a sprite
    // See https://en.scratch-wiki.info/wiki/Layer_(value)
    declare layer as int

    // The rotation of the sprite in [-360,+360]
    // See https://en.scratch-wiki.info/wiki/Direction_(value)
    declare direction as int

    declare rotationStyle as string

    // Whether or not the sprite is visible (difference to ghost mode!)
    // See https://en.scratch-wiki.info/wiki/Hide_(block)
    declare visible as boolean

    declare draggable as boolean

    // Bubble above a ScratchSprite for saying or thinking text for a given duration
    // In Scratch if the bubbleText is empty, the bubble is not visible
    declare bubbleText as string
    declare bubbleType as string
    declare bubbleStart as int
    declare bubbleDuration as int

    // Initialize the variables with their default values
    define size as 100
    define layer as 0
    define direction as 90
    define visible as true

    //
    // DO NOT initialize the following and keep them NONDET:
    //      define x as 0
    //      define y as 0
    //

    define atomic pointTowards (s: actor) begin
        // Todo what about random?
        declare targetX as int
        declare targetY as int

        define targetX as cast (attribute "x" of s) to int
        define targetY as cast (attribute "y" of s) to int

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


    define atomic pointTowardsPos(targetX: int, targetY: int) begin
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

    define atomic pointTowardsSelf() begin
    end

    define atomic moveSteps (n: int) begin
        declare nf as float
        declare dx as float
        declare dy as float
        declare ndir as float

        define nf as cast n to float

//        define radians as degToRad(90.0 - cast direction to float)
        define ndir as cast direction to float
        define dx as nf * mathCos(90.0 - ndir)
        define dy as nf * mathSin(90.0 - ndir)

        declare tmpx as int
        declare tmpy as int
        define tmpx as cast dx to int
        define tmpy as cast dy to int

        define x as x + tmpx
        define y as y + tmpy
    end

    // @Category "Motion"
    define atomic goTo (newX: int, newY: int) begin
        define x as newX
        define y as newY
    end

    define atomic hide () begin
        define visible as false
    end

    define atomic show () begin
        define visible as true
    end

    // @Category "Motion"
    define atomic goToRandomPosition () begin
        define x as randomIntegerBetween(0-240, 240)
        define y as randomIntegerBetween(0-180, 180)
    end

    define atomic changeXBy (increment: int) begin
       // set attribute "x" to (attribute "x" + increment)
    end

    define atomic changeCostumeTo (id: string) begin
        changeActiveGraphicTo(id)
    end

    // @Category "Sensing"
    define touchingEdge () begin
        // ...
    end returns result : boolean

    // @Category "Sensing"
    define atomic touchingMousePointer () begin
        if not (getMouseX() < x
                or getMouseX() > x + active_graphic_width
                or getMouseY() < y
                or getMouseY() > y + active_graphic_height) then begin

            define result as false
        end
    end returns result : boolean

    // @Category "Sensing"
    define atomic touchingObject (obj: actor) begin
        declare size_fst as float
        declare width as float
        declare height as float

        // TODO: Query attributes of myself and the other actor
        define width as cast active_graphic_width to float
        define height as cast active_graphic_height to float
        define size_fst as cast size to float

        define width as width * (size_fst / 100.0)
        define height as height * (size_fst / 100.0)

        declare size_snd as float
        declare width_other as float
        declare height_other as float
        define width_other as cast (cast attribute "active_graphic_width" of obj to int) to float
        define height_other as cast (cast attribute "active_graphic_height" of obj to int) to float

        define size_snd as cast (cast attribute "size" of obj to int) to float
        define width_other as width_other * (size_snd / 100.0)
        define height_other as height_other * (size_snd / 100.0)

        declare x_other as float
        define x_other as cast (cast attribute "x" of obj to int) to float
        declare y_other as float
        define y_other as cast (cast attribute "y" of obj to int) to float

        declare x_this as float
        define x_this as cast x to float
        declare y_this as float
        define y_this as cast y to float

        define result as false

        declare condOne as boolean
        declare condTwo as boolean
        declare condThree as boolean
        declare condFour as boolean
        declare condFive as boolean

        define condOne as (x_this + width / 2.0 > x_other - width_other / 2.0 and y_this + height / 2.0 > y_other - height_other / 2.0)
        define condTwo as (x_this - width / 2.0 < x_other + width_other / 2.0 and  y_this + height / 2.0 > y_other - height_other / 2.0)
        define condThree as (x_other + width_other / 2.0 > x_this - width / 2.0 and y_other + height_other / 2.0 > y_this - height / 2.0)
        define condFour as (x_other - width_other / 2.0 < x_this + width / 2.0 and  y_other + height_other / 2.0 > y_this - height / 2.0)
        define condFive as (x_this = x_other and y_this = y_other)

        if (condOne or condTwo or condThree or condFour or condFive) then begin
            define result as true
        end

    end returns result : boolean

    // @Category "Sensing"
    define atomic touchingColor (clr: int) begin
        // ...
    end returns result : boolean

    // @Category "Sensing"
    define colorIsTouchingColor(clr: int, tching: int) begin
        // ...
    end returns result : boolean

    // @Category "Sensing"
    define distanceToMousePointer () begin
        // ...
    end returns result : int

    define atomic sayTextFor (msg: string, scs: int) begin
        // msgBounded = substr(msg, 0, 330)
        define bubbleText as msg
        define bubbleStart as _RUNTIME_millis()
        define bubbleType as "say"
        define bubbleDuration as scs
    end

    define atomic sayText (msg: string) begin
        define bubbleText as msg
        define bubbleStart as _RUNTIME_millis()
        define bubbleType as "say"
    end

    // @Category "looks"
    define atomic turnLeft(degrees: int) begin
        setDirection(direction - degrees)
    end

    // @Category "looks"
    define atomic turnRight(degrees: int) begin
        setDirection(direction + degrees)
    end

    define atomic setDirection(dir: int) begin
        // TODO do we need to check if we are in the stage
        // Make sure direction is between -179 and 180
        declare wrapped as float
        define wrapped as wrapClamp(cast dir to float, 0.0-179.0, 180.0)
        define direction as cast wrapped to int
    end

end

role ScratchStage is ScratchEntity begin

    declare current_idx as int

    declare videoTransparency as int

    declare videoState as string

    declare tempo as int

    define current_idx as 0

    define atomic switchBackdropTo (id: string) begin
        changeActiveGraphicTo(id)
    end

    define atomic switchBackdropToAndWait (id: string) begin

    end

    define atomic nextBackdrop () begin
        declare idx as int
        define idx as getGraphicIndexById(active_graphic_name)
        define idx as (current_idx+1) mod getNumGraphics()

        declare id as string
        define id as getGraphicIdByIndex(current_idx)

        changeActiveGraphicTo(id)
    end

    define atomic previousBackdrop() begin
        declare idx as int
        define idx as getGraphicIndexById(active_graphic_name)
        define idx as (current_idx-1) mod getNumGraphics()

        declare id as string
        define id as getGraphicIdByIndex(current_idx)

        changeActiveGraphicTo(id)
    end

    define atomic randomBackdrop() begin
         declare idx as int
         define idx as getGraphicIndexById(active_graphic_name)
         define idx as randomIntegerBetween(0, getNumGraphics()-1)

         declare id as string
         define id as getGraphicIdByIndex(current_idx)

         changeActiveGraphicTo(id)
    end
end



