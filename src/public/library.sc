module ScratchLibrary

actor IOActor begin

    declare mouseX as int

    declare mouseY as int

    declare answer as string

    // Key code of the currently pressed key
    declare key_pressed as int

end


role MathActor begin

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

    // mathAtan approximates the Atan value in degrees for a given "real" value
    // param n : float - the real value for which the Atan value is approximated
    // return result: float - the approximated interval of the Atan value
    define atomic mathAtan(n: float) begin
        if n < 0.0-9.0 or n = 0.0-9.0 then begin
            assume result > 0.0-90.0
            assume result < 0.0-84.290
        end else if (n < 0.0-5.0 or n = 0.0-5.0) and n > 0.0-9.0 then begin
            assume result > 0.0-84.289
            assume result < 0.0-80.537
        end else if (n < 0.0-2.0 or n = 0.0-2.0) and n > 0.0-5.0 then begin
            assume result > 0.0-80.537
            assume result < 0.0-63.435
        end else if (n < 0.0-1.0 or n = 0.0-1.0) and n > 0.0-2.0 then begin
            assume result > 0.0-63.434
            assume result < 0.0-45.0
        end else if (n < 0.0 or n = 0.0) and n > 0.0-1.0 then begin
            assume result > 0.0-45.0
            assume result < 0.0
        end else if (n < 1.0 or n = 1.0) and n > 0.0 then begin
            assume result < 45.0
            assume result > 0.0
        end else if (n < 2.0 or n = 2.0) and n > 1.0  then begin
            assume result > 45.0
            assume result < 63.435
        end else if (n < 6.0 or n = 6.0) and n > 2.0 then begin
            assume result < 80.538
            assume result > 63.434
        end else if (n < 10.0 or n = 10.0) and n > 6.0 then begin
            assume result < 84.289
            assume result > 80.537
        end else if n > 10.0 then begin
            assume result > 84.290
            assume result < 90.0
        end else begin
            // got invalid input
            _RUNTIME_signalFailure("mathAtan")
        end
    end returns result: float

    // mathAtan2 approximates the Atan2 value in degrees for two given "real" numbers.
    // The result is the angle between the positive x-axis and ray from (0,0) to (x,y)
    //
    // param x : float - x-coordinate of the target point
    // param y : float - y-coordinate of the target point
    // return result: float - the approximated interval of the Atan2 value
    define atomic mathAtan2(x: float, y: float) begin
        declare PI as float
        define PI as 3.14159265359
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
            _RUNTIME_signalFailure("3")
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

     // mathCos approximates the cos value for a given degree number
     //
     // param alpha : float - degree number for which the cos value will be approximated
     // return result: float - the approximated interval
    define atomic mathCos(alpha: float) begin
        define alpha as wrapClamp(alpha, 0.0, 360.0)

        if ((alpha > 0.0 or alpha = 0.0) and alpha < 36.0) then begin
            assume (result < 1.0 or result = 1.0)
            assume result > 0.0-0.127
        end else if ((alpha > 36.0 or alpha = 36.0) and alpha < 72.0) then begin
            assume result < 0.0-0.128
            assume result > 0.0-0.967
        end else if ((alpha > 72.0 or alpha = 72.0) and alpha < 108.0) then begin
            assume result < 0.376
            assume result > 0.0-0.967
        end else if ((alpha > 107.0 or alpha = 107.0) and alpha < 143.0) then begin
            assume result < 0.872
            assume result > 0.375
        end else if ((alpha = 143.0 or alpha > 143.0) and alpha < 180.0) then begin
            assume result < 0.872
            assume result > 0.0-0.599
        end else if ((alpha > 180.0 or alpha = 180.0) and alpha < 216.0) then begin
            assume result < 0.0-0.598
            assume result > 0.0-0.717
        end else if ((alpha > 216.0 or alpha = 216.0) and alpha < 252.0) then begin
            assume result > 0.0-0.717
            assume result < 0.783
        end else if ((alpha > 252.0 or alpha = 252.0) and alpha < 288.0) then begin
            assume result < 0.783
            assume result > 0.517
        end else if ((alpha > 288.0 or alpha = 288.0) and alpha < 324.0) then begin
            assume result < 0.518
            assume result > 0.0-0.914
        end else if ((alpha = 324.0 or alpha > 324.0) and alpha < 360.0) then begin
            assume result > 0.0-0.914
            assume result < 0.0-0.284
        end else begin
            // got invalid input
            _RUNTIME_signalFailure("mathCos")
        end
    end returns result: float

    // mathSin approximates the sin value for a given degree number
    //
    // param alpha : float - degree number for which the sin value will be approximated
    // return result: float - the approximated interval
    define atomic mathSin(alpha: float) begin
        define alpha as wrapClamp(alpha, 0.0, 360.0)

        if (alpha > 0.0 or alpha = 0.0) and alpha < 36.0 then begin
            assume (result < 0.0 or result = 0.0)
            assume result > 0.0-0.991
        end else if (alpha > 36.0 or alpha = 36.0) and alpha < 72.0 then begin
            assume result > 0.0-0.991
            assume result < 0.254
        end else if (alpha > 72.0 or alpha = 72.0) and alpha < 108.0 then begin
            assume result > 0.253
            assume result < 0.927
        end else if (alpha > 108.0 or alpha = 108.0) and alpha < 144.0 then begin
            assume result < 0.927
            assume result > 0.0-0.491
        end else if (alpha > 144.0 or alpha = 144.0) and alpha < 180.0 then begin
            assume result < 0.0-0.492
            assume result > 0.0-0.801
        end else if (alpha > 180.0 or alpha = 180.0) and alpha < 216.0 then begin
            assume result > 0.0-0.801
            assume result < 0.697
        end else if (alpha > 216.0 or alpha = 216.0) and alpha < 252.0 then begin
            assume result > 0.623
            assume result < 0.697
        end else if (alpha > 252.0 or alpha = 216.0) and alpha < 288.0 then begin
            assume result < 0.624
            assume result > 0.0-0.855
        end else if (alpha > 288.0 or alpha = 288.0) and alpha < 324.0 then begin
            assume result > 0.0-0.854
            assume result < 0.0-0.405
        end else if (alpha > 324.0 or alpha = 324.0) and alpha < 360.0 then begin
            assume result > 0.0-0.404
            assume result < 0.959
        end else begin
            // got invalid input
            _RUNTIME_signalFailure("mathSin")
        end

    end returns result: float

    // radToDeg calculates the degree value for a given radians valuenumber
    //
    // param rad: float - radians number for which the degree value will be calculated
    // return result: float - the calculated degree value
    define atomic radToDeg(rad: float) begin
        declare PI as float
        define PI as 3.14159265359
        define result as ((rad * 180.0) / PI)
    end returns result: float

    // degToRad calculates the radians value for a given degree value
    //
    // param deg: float - degree number for which the radians value will be calculated
    // return result: float - the calculated radians value
    define atomic degToRad(deg: float) begin
        declare PI as float
        define PI as 3.14159265359
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

    define mathSqrt(num: float) begin
        declare result as float
        define result as nearestPerfectSqrt(num)

        // Three iterations of newton
        define result as (result + (num /result)) / 2.0
        define result as (result + (num /result)) / 2.0
        define result as (result + (num /result)) / 2.0
    end returns result: float

    define mathAbsF(n: float) begin
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
    define touchingObjects (fst: actor, snd: actor) begin
        // Over-approximation of the sprites be calculating a circle around each sprite and testing if the circles touch

        declare size_fst as float
        declare leg_a_fst as float
        declare leg_b_fst as float
        define leg_a_fst as cast (cast attribute "active_graphic_width" of fst to int) to float
        define leg_b_fst as cast (cast attribute "active_graphic_height" of fst to int) to float

        define size_fst as cast (cast attribute "size" of fst to int) to float
        define leg_a_fst as leg_a_fst * (size_fst / 100.0)
        define leg_b_fst as leg_b_fst * (size_fst / 100.0)

        declare radius_fst as float
        define radius_fst as 0.5 * mathSqrt(mathAbsF(leg_a_fst * leg_a_fst + leg_b_fst * leg_b_fst))

        declare size_snd as float
        declare leg_a_snd as float
        declare leg_b_snd as float
        define leg_a_snd as cast (cast attribute "active_graphic_width" of snd to int) to float
        define leg_b_snd as cast (cast attribute "active_graphic_height" of snd to int) to float

        define size_snd as cast (cast attribute "size" of snd to int) to float
        define leg_a_snd as leg_a_snd * (size_snd / 100.0)
        define leg_b_snd as leg_b_snd * (size_snd / 100.0)

        declare radius_snd as float
        define radius_snd as 0.5 * mathSqrt(mathAbsF(leg_a_snd * leg_a_snd + leg_b_snd * leg_b_snd))

        declare x_fst as float
        define x_fst as cast (cast attribute "x" of fst to int) to float
        declare y_fst as float
        define y_fst as cast (cast attribute "y" of fst to int) to float

        declare x_snd as float
        define x_snd as cast (cast attribute "x" of snd to int) to float
        declare y_snd as float
        define y_snd as cast (cast attribute "y" of snd to int) to float

        define result as not (((mathSqrt(mathAbsF((x_fst + x_snd)*(x_fst + x_snd) + (y_fst + y_snd) * (y_fst + y_snd))) - radius_fst - radius_snd) > 0.0))

    end returns result : boolean

    // @Category "Specification"
    define touchingMousePointer (obj: actor) begin
        declare x as int
        declare y as int
        define x as cast attribute "x" of obj to int
        define y as cast attribute "y" of obj to int

        declare width as int
        declare height as int
        define width as cast attribute "active_graphic_width" of obj to int
        define height as cast attribute "active_graphic_height" of obj to int

    if not (getMouseX() < x
            or getMouseX() > x + width
            or getMouseY() < y
            or getMouseY() > y + height) then begin

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
            define direction as cast radToDeg(mathAtan2(dx, dy)) to int
         end
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

    define changeXBy (increment: int) begin
       // set attribute "x" to (attribute "x" + increment)
    end

    define changeCostumeTo (id: string) begin
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
        // Over-approximation of the sprites be calculating a circle around each sprite and testing if the circles touch

        declare size_fst as float
        declare leg_a as float
        declare leg_b as float

        // TODO: Query attributes of myself and the other actor
        define leg_a as cast active_graphic_width to float
        define leg_b as cast active_graphic_height to float
        define size_fst as cast size to float
        define leg_a as leg_a * (size_fst / 100.0)
        define leg_b as leg_b * (size_fst / 100.0)

        declare radius as float
        define radius as 0.5 * mathSqrt(mathAbsF(leg_a * leg_a + leg_b * leg_b))

        declare size_snd as float
        declare leg_a_other as float
        declare leg_b_other as float
        define leg_a_other as cast (cast attribute "active_graphic_width" of obj to int) to float
        define leg_b_other as cast (cast attribute "active_graphic_height" of obj to int) to float

        define size_snd as cast (cast attribute "size" of obj to int) to float
        define leg_a_other as leg_a_other * (size_snd / 100.0)
        define leg_b_other as leg_b_other * (size_snd / 100.0)


        declare radius_other as float
        define radius_other as 0.5 * mathSqrt(mathAbsF(leg_a_other * leg_a_other + leg_b_other * leg_b_other))

        declare x_other as float
        define x_other as cast (cast attribute "x" of obj to int) to float
        declare y_other as float
        define y_other as cast (cast attribute "y" of obj to int) to float

        declare x_this as float
        define x_this as cast x to float
        declare y_this as float
        define y_this as cast y to float

        declare intermedRes as float
        define intermedRes as mathAbsF((x_this + x_other)*(x_this + x_other) + (y_this + y_other) * (y_this + y_other))

        define result as not (((mathSqrt(intermedRes) - radius - radius_other) > 0.0))

    end returns result : boolean

    // @Category "Sensing"
    define touchingColor (clr: int) begin
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
    define turnLeft(degrees: int) begin
        setDirection(direction - degrees)
    end

    // @Category "looks"
    define turnRight(degrees: int) begin
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

    define switchBackdropTo (id: string) begin
        changeActiveGraphicTo(id)
    end

    define switchBackdropToAndWait (id: string) begin

    end

    define nextBackdrop () begin
        declare idx as int
        define idx as getGraphicIndexById(active_graphic_name)
        define idx as (current_idx+1) mod getNumGraphics()

        declare id as string
        define id as getGraphicIdByIndex(current_idx)

        changeActiveGraphicTo(id)
    end

    define previousBackdrop() begin
        declare idx as int
        define idx as getGraphicIndexById(active_graphic_name)
        define idx as (current_idx-1) mod getNumGraphics()

        declare id as string
        define id as getGraphicIdByIndex(current_idx)

        changeActiveGraphicTo(id)
    end

    define randomBackdrop() begin
         declare idx as int
         define idx as getGraphicIndexById(active_graphic_name)
         define idx as randomIntegerBetween(0, getNumGraphics()-1)

         declare id as string
         define id as getGraphicIdByIndex(current_idx)

         changeActiveGraphicTo(id)
    end
end



