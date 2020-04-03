module ScratchLibrary

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
        declare d as float
        define d as cast (cast n to int mod 1) to float
        define result as n - d
    end returns result : float

    // mathAtan approximates the Atan value in degrees for a given "real" value
    // param n : float - the real value for which the Atan value is approximated
    // return result: float - the approximated interval of the Atan value
    define atomic mathAtan(n: float) begin
        if n < 0.0-9.0 then begin
            assume result > 0.0-90.0
            assume result < 0.0-84.290
        end else if n < 0.0-5.0 and (n > 0.0-9.0 or n = 0.0-9.0) then begin
            assume result > 0.0-84.289
            assume result < 0.0-80.537
        end else if n > 0.0-6.0 and (n < 0.0-2.0 or n = 0.0-2.0) then begin
            assume result > 0.0-80.537
            assume result < 0.0-63.435
        end else if n > 0.0-2.0 and (n < 0.0-1.0 or n = 0.0-1.0) then begin
            assume result > 0.0-63.434
            assume result < 0.0-45.0
        end else if n > 0.0-1.0 and (n < 0.0 or n = 0.0) then begin
            assume result > 0.0-45.0
            assume result < 0.0
        end else if n > 0.0 and (n < 1.0 or n = 1.0) then begin
            assume result < 45.0
            assume result > 0.0
        end else if n > 1.0 and (n < 2.0 or n = 2.0) then begin
            assume result > 45.0
            assume result < 63.435
        end else if n > 2.0 and (n < 6.0 or n = 6.0) then begin
            assume result < 80.538
            assume result > 63.434
        end else if n > 6.0 and (n < 10.0 or n = 10.0) then begin
            assume result < 84.289
            assume result > 80.537
        end else if n > 10.0 then begin
            assume result > 84.290
            assume result < 90.0
        end else begin
            // got invalid input
            _RUNTIME_signalFailure()
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
            // TODO by definition this is +- PI, can we do this with assumes?
            define result as PI
        end else if x < 0.0 and y < 0.0 then begin
            define result as mathAtan((y/x)) -  PI
        end else if x = 0.0 and y > 0.0 then begin
            define result as (PI / 2.0)
        end else if x = 0.0 and y < 0.0 then begin
            define result as (0.0 - (PI / 2.0))
        end else begin
            // not defined for (0.0, 0.0)
            _RUNTIME_signalFailure()
        end

    end returns result: float

     // mathCos approximates the cos value for a given degree number
     //
     // param alpha : float - degree number for which the cos value will be approximated
     // return result: float - the approximated interval
    define atomic mathCos(alpha: float) begin
        define alpha as wrapClamp(alpha, 0.0, 360.0)

        if (alpha > (0.0-1.0) and alpha < 36.0) then begin
            assume result < 1.0
            assume result > 0.0-0.127
        end else if (alpha > 35.0 and alpha < 72.0) then begin
            assume result < 0.0-0.128
            assume result > 0.0-0.967
        end else if (alpha > 71.0 and alpha < 108.0) then begin
            assume result < 0.376
            assume result > 0.0-0.967
        end else if (alpha > 107.0 and alpha < 144.0) then begin
            assume result < 0.872
            assume result > 0.375
        end else if (alpha > 143.0 and alpha < 180.0) then begin
            assume result < 0.872
            assume result > 0.0-0.599
        end else if (alpha > 179.0 and alpha < 216.0) then begin
            assume result < 0.0-0.598
            assume result > 0.0-0.717
        end else if (alpha > 215.0 and alpha < 252.0) then begin
            assume result > 0.0-0.717
            assume result < 0.783
        end else if (alpha > 251.0 and alpha < 288.0) then begin
            assume result < 0.783
            assume result > 0.517
        end else if (alpha > 287.0 and alpha < 324.0) then begin
            assume result < 0.518
            assume result > 0.0-0.914
        end else if (alpha > 323.0 and alpha < 361.0) then begin
            assume result > 0.0-0.914
            assume result < 0.0-0.284
        end else begin
            // got invalid input
            _RUNTIME_signalFailure()
        end

    end returns result: float

    // mathSin approximates the sin value for a given degree number
    //
    // param alpha : float - degree number for which the sin value will be approximated
    // return result: float - the approximated interval
    define atomic mathSin(alpha: float) begin
        define alpha as wrapClamp(alpha, 0.0, 360.0)

        if alpha > (0.0-1.0) and alpha < 36.0 then begin
            assume result < 0.0
            assume result > 0.0-0.991
        end else if alpha > 35.0 and alpha < 72.0 then begin
            assume result > 0.0-0.991
            assume result < 0.254
        end else if alpha > 71.0 and alpha < 108.0 then begin
            assume result > 0.253
            assume result < 0.927
        end else if alpha > 107.0 and alpha < 144.0 then begin
            assume result < 0.927
            assume result > 0.0-0.491
        end else if alpha > 143.0 and alpha < 180.0 then begin
            assume result < 0.0-0.492
            assume result > 0.0-0.801
        end else if alpha > 179.0 and alpha < 216.0 then begin
            assume result > 0.0-0.801
            assume result < 0.697
        end else if alpha > 215.0 and alpha < 252.0 then begin
            assume result > 0.623
            assume result < 0.697
        end else if alpha > 251.0 and alpha < 288.0 then begin
            assume result < 0.624
            assume result > 0.0-0.855
        end else if alpha > 287.0 and alpha < 324.0 then begin
            assume result > 0.0-0.854
            assume result < 0.0-0.405
        end else if alpha > 323.0 and alpha < 361.0 then begin
            assume result > 0.0-0.404
            assume result < 0.959
        end else begin
            // got invalid input
            _RUNTIME_signalFailure()
        end

    end returns result: float

    // radToDeg calculates the degree value for a given radians valuenumber
    //
    // param rad: float - radians number for which the degree value will be calculated
    // return result: float - the calculated degree value
    define atomic radToDeg(rad: float) begin
        declare PI as float
        define PI as 3.14159265359

        define result as ((deg * PI) / 180.0)
    end returns result: float

    // degToRad calculates the radians value for a given degree value
    //
    // param deg: float - degree number for which the radians value will be calculated
    // return result: float - the calculated radians value
    define atomic degToRad(deg: float) begin
        declare PI as float
        define PI as 3.14159265359
        define result as (rad * PI) / 180.0
    end returns result: float

end

role RuntimeEntity is MathActor begin

    extern _RUNTIME_getMouseX () returns int

    extern _RUNTIME_getMouseY () returns int

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

    // TODO: Maybe add an approximation for sqrt
    extern mathSqrt (n: int) returns float

    extern mathAbs (n: int) returns int

    extern mathCeiling (n: int) returns int

    extern mathTan (n: int) returns int

    extern mathAsin (n: int) returns int

    extern mathAcos (n: int) returns int

    extern mathLn(n: int) returns int

    extern mathLog(n: int) returns int

    extern mathPowe(n: int) returns int

    extern mathPowten(n: int) returns int

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
            _RUNTIME_signalFailure()
        end
    end

    // @Category "Specification"
    define touchingObjects (fst: actor, snd: actor) begin
        // Over-approximation of the sprites be calculating a circle around each sprite and testing if the circles touch

        declare leg_a_fst as float
        declare leg_b_fst as float
        define leg_a_fst as cast attribute "active_graphic_width" of fst to float
        define leg_b_fst as cast attribute "active_graphic_height" of fst to float

        declare radius_fst as float
        define radius_fst as 0.5 * mathSqrt(leg_a_fst * leg_a_fst + leg_b_fst * leg_b_fst)

        declare leg_a_snd as float
        declare leg_b_snd as float
        define leg_a_snd as cast attribute "active_graphic_width" of snd to float
        define leg_b_snd as cast attribute "active_graphic_height" of snd to float

        declare radius_snd as float
        define radius_snd as 0.5 * mathSqrt(leg_a_snd * leg_a_snd + leg_b_snd * leg_b_snd)

        declare x_fst as float
        define x_fst as cast attribute "x" of fst to float
        declare y_fst as float
        define y_fst as cast attribute "y" of fst to float

        declare x_snd as float
        define x_snd as cast attribute "x" of snd to float
        declare y_snd as float
        define y_snd as cast attribute "y" of snd to float

        define result as not (((mathSqrt((x_fst + x_snd)*(x_fst + x_snd) + (y_fst + y_snd) * (y_fst + y_snd)) - radius_fst - radius_snd) > 0.0))

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

        if not (_RUNTIME_getMouseX() < x
                or _RUNTIME_getMouseX() > x + width
                or _RUNTIME_getMouseY() < y
                or _RUNTIME_getMouseY() > y + height) then begin

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
    declare color_effect_value as int
    declare fisheye_effect_value as int
    declare whirl_effect_value as int
    declare pixelate_effect_value as int
    declare mosaic_effect_value as int
    declare brightness_effect_value as int
    declare ghost_effect_value as int

    define color_effect_value as 0

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

    // Whether or not the sprite is visible (difference to ghost mode!)
    // See https://en.scratch-wiki.info/wiki/Hide_(block)
    declare visible as boolean

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

        define direction as cast (90.0 - radToDeg(mathAtan2(dy, dx))) to int
    end

    define atomic moveSteps (n: int) begin
        declare nf as float
        declare dx as float
        declare dy as float
        declare radians as float

        define nf as cast n to float

        define radians as degToRad(90.0 - cast direction to float)
        define dx as nf * mathCos(radians)
        define dy as nf * mathSin(radians)
        define dy as nf * mathSin(radians)

        define x as x + cast dx to int
        define y as y + cast dy to int
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
        if not (_RUNTIME_getMouseX() < x
                or _RUNTIME_getMouseX() > x + active_graphic_width
                or _RUNTIME_getMouseY() < y
                or _RUNTIME_getMouseY() > y + active_graphic_height) then begin

            define result as false
        end
    end returns result : boolean

    // @Category "Sensing"
    define atomic touchingObject (obj: actor) begin
        // Over-approximation of the sprites be calculating a circle around each sprite and testing if the circles touch

        declare leg_a as float
        declare leg_b as float

        // TODO: Query attributes of myself and the other actor
        define leg_a as cast active_graphic_width to float
        define leg_b as cast active_graphic_height to float

        declare radius as float
        define radius as 0.5 * mathSqrt(leg_a * leg_a + leg_b * leg_b)

        declare leg_a_other as float
        declare leg_b_other as float
        define leg_a_other as cast attribute "active_graphic_width" of obj to float
        define leg_b_other as cast attribute "active_graphic_height" of obj to float

        declare radius_other as float
        define radius_other as 0.5 * mathSqrt(leg_a_other * leg_a_other + leg_b_other * leg_b_other)

        declare x_other as float
        define x_other as cast attribute "x" of obj to float
        declare y_other as float
        define y_other as cast attribute "y" of obj to float

        declare x_this as float
        define x_this as cast x to float
        declare y_this as float
        define y_this as cast y to float

        define result as not (((mathSqrt((x_this + x_other)*(x_this + x_other) + (y_this + y_other) * (y_this + y_other)) - radius - radius_other) > 0.0))

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

