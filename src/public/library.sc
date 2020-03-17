module ScratchLibrary

role RuntimeEntity begin

    extern _RUNTIME_getMouseX () returns number

    extern _RUNTIME_getMouseY () returns number

    extern _RUNTIME_getInitialActors () returns list of string

    extern _RUNTIME_getClonesOf (ac: string) returns list of string

    extern _RUNTIME_getAllActors () returns list of string

    extern _RUNTIME_isActorTypeOf (ac: string, actorType: string) returns boolean

    extern _RUNTIME_restart ()

    // Signal that the current scene should be rendered,
    //   or: signal a behavior that should be visible to the user.
    extern _RUNTIME_render ()

    // Returns the number of milliseconds that
    // elapsed since the VM started.
    extern _RUNTIME_millis () returns number

    // Returns the number of seconds that
    // elapsed since the VM started.
    extern _RUNTIME_seconds () returns number

    extern _RUNTIME_micros () returns number

    extern _RUNTIME_waitMillis (ms: number)

    extern _RUNTIME_waitMicros (micros: number)

    extern _RUNTIME_waitSeconds (s: number)

    extern _RUNTIME_timerValue () returns number

    extern _RUNTIME_resetTimer ()

    extern _RUNTIME_signalFailure ()

    extern _RUNTIME_numberFromInterval (from_num: number, to_num: number) returns number

    extern _RUNTIME_integerFromInterval (from_num: number, to_num: number) returns number

    extern _RUNTIME_getImageWidth (ident: string) returns number

    extern _RUNTIME_getImageHeight (ident: string) returns number

    define _RUNTIME_getGraphicIdByIndex (idx: number) in runtime returns result: string end

    define _RUNTIME_getGraphicIndexById (id: string) in runtime returns result: number end

    // A random integer in the interval [from, to],
    // that is, both end points are included.
    extern randomIntegerBetween (intervalStart: number, intervalEnd: number) returns number

    // See https://en.scratch-wiki.info/wiki/Pick_Random_()_to_()_(block)
    extern randomBetween (intervalStart: number, intervalEnd: number) returns number

    // TODO: Maybe add an approximation for sqrt
    extern mathSqrt (n: number) returns number

    // TODO: Maybe add an approximation for floor
    extern mathFloor (n: number) returns number

    extern mathAbs (n: number) returns number

    extern mathFloor (n: number) returns number

    extern mathCeiling (n: number) returns number

    extern mathSqrt (n: number) returns number

    extern mathSin (n: number) returns number

    extern mathCos (n: number) returns number

    extern mathTan (n: number) returns number

    extern mathAsin (n: number) returns number

    extern mathAcos (n: number) returns number

    extern mathAtan (n: number) returns number

    extern mathLn(n: number) returns number

    extern mathLog(n: number) returns number

    extern mathPowe(n: number) returns number

    extern mathPowten(n: number) returns number

    extern mathAtan2(n1: number, n2: number) returns number

    extern degToRad(n: number) returns number

    extern radToDeg(n: number) returns number

    // Make sure our direction is always between -179 and 180
    define atomic wrapClamp(dir: number, min: number, max: number) begin
        declare range as number
        declare result as number
        define range as ((max - min) +1)
        define result as (dir - (mathFloor((dir - min) / range) * range))
    end returns result : number

    // @Category "Control"
    // @Block "wait <Num> seconds"
    define waitSeconds (secs: number) begin
        // A busy-waiting implementation.
        // The external methode`_RUNTIME_waitSeconds` is intended to
        // not conduct a busy wait.
        declare waitUntil as number
        define waitUntil as _RUNTIME_seconds() + secs
        until (_RUNTIME_seconds() > waitUntil) repeat begin
        end
    end

    // @Category "Control"
    // @Block "wait <Num> millis"
    define waitMillis (millis: number) begin
        // A busy-waiting implementation.
        // The external method `_RUNTIME_waitMillis` is intended to
        // not conduct a busy wait.
        declare waitUntil as number
        define waitUntil as _RUNTIME_millis() + millis
        until (_RUNTIME_millis() > waitUntil) repeat begin
        end
    end

    // @Category "Control"
    // @Block "wait <Num> micros"
    define waitMicros (micros: number) begin
        // A busy-waiting implementation.
        // The external method `_RUNTIME_waitMicros` is intended to
        // not conduct a busy wait.
        declare waitUntil as number
        define waitUntil as _RUNTIME_micros() + micros
        until (_RUNTIME_micros() > waitUntil) repeat begin
        end
    end

    define atomic milliseconds() begin
        define result as _RUNTIME_millis()
    end returns result: number

    define atomic microseconds() begin
        define result as _RUNTIME_micros()
    end returns result: number
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

        declare leg_a_fst as number
        declare leg_b_fst as number
        define leg_a_fst as cast attribute "active_graphic_width" of fst to number
        define leg_b_fst as cast attribute "active_graphic_height" of fst to number

        declare radius_fst as number
        define radius_fst as 0.5 * mathSqrt(leg_a_fst * leg_a_fst + leg_b_fst * leg_b_fst)

        declare leg_a_snd as number
        declare leg_b_snd as number
        define leg_a_snd as cast attribute "active_graphic_width" of snd to number
        define leg_b_snd as cast attribute "active_graphic_height" of snd to number

        declare radius_snd as number
        define radius_snd as 0.5 * mathSqrt(leg_a_snd * leg_a_snd + leg_b_snd * leg_b_snd)

        declare x_fst as number
        define x_fst as cast attribute "x" of fst to number
        declare y_fst as number
        define y_fst as cast attribute "y" of fst to number

        declare x_snd as number
        define x_snd as cast attribute "x" of snd to number
        declare y_snd as number
        define y_snd as cast attribute "y" of snd to number

        declare result as boolean
        define result as not (((mathSqrt((x_fst + x_snd)*(x_fst + x_snd) + (y_fst + y_snd) * (y_fst + y_snd)) - radius_fst - radius_snd) > 0))

    end returns result : boolean

    // @Category "Specification"
    define touchingMousePointer (obj: actor) begin
        declare result as boolean

        declare x as number
        declare y as number
        define x as cast attribute "x" of obj to number
        define y as cast attribute "y" of obj to number

        declare width as number
        declare height as number
        define width as cast attribute "active_graphic_width" of obj to number
        define height as cast attribute "active_graphic_height" of obj to number

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
    declare volume as number

    // 480 * 360 = 172800 pixels
    declare active_graphic_pixels as list of number
    declare active_graphic_index as number
    declare active_graphic_name as string
    declare active_graphic_width as number
    declare active_graphic_height as number

    declare graphics_effect as enum [ "color", "fisheye", "whirl", "pixelate", "mosaic", "brightness", "ghost" ]
    declare color_effect_value as number
    declare fisheye_effect_value as number
    declare whirl_effect_value as number
    declare pixelate_effect_value as number
    declare mosaic_effect_value as number
    declare brightness_effect_value as number
    declare ghost_effect_value as number


    // @Category "Looks"
    define atomic changeActiveGraphicTo (id: string) begin
        define active_graphic_name as id
        define active_graphic_width as _RUNTIME_getImageWidth(id)
        define active_graphic_height as _RUNTIME_getImageHeight(id)
    end

    // @Category "Looks"
    // @Block "change <string as effect> effect by <number as value>
    define atomic changeGraphicEffectBy (eff:string, val:number) begin

    end

    // @Category "Looks"
    // @Block "clear graphic effects"
    define atomic clearGraphicEffects () begin

    end

    // @Category "Looks"
    // @Block "backdrop number"
    define backdropNumber () begin

    end returns result : number

    // @Category "Looks"
    // @Block "backdrop name"
    define backdropName () begin

    end returns result : string

    // @Category "Sound"
    // @Block "play sound <sound as snd> until done"
    define atomic playUntilDone (snd: number) begin

    end

    // @Category "Sound"
    // @Block "start sound <sound as snd>"
    define startSound (snd: number) begin

    end

    // @Category "Sound"
    // @Block "stop all sounds"
    define stopAllSounds () begin

    end

    // @Category "Sound"
    // @Block "change <string as effect> sound effect by <number as num>"
    define changeSoundEffectBy (eff: string, val: number) begin

    end

    // @Category "Sound"
    // @Block "set <string as effect> sound effect to <number as num>"
    define setSoundEffectTo (eff: string, val: number) begin

    end

    // @Category "Sound"
    // @Block "clear sound effects"
    define clearSoundEffects () begin

    end

    // @Category "Sound"
    // @Block "change volume by <number as delta>"
    define changeVolumeBy (delta: number) begin

    end

    // @Category "Sound"
    // @Block "set volume to <number as percent>"
    define setVolumeTo (perc: number) begin

    end

    // @Category "Sound"
    // @Block "volume"
    define volume () begin

    end returns result : number

    // data_setvariableto, sensing_setdragmode, motion_setrotationstyle, looks_seteffectto,
    // sound_seteffectto, sound_setvolumeto;

    // operator_join, operator_letter_of, sensing_username, data_itemoflist,
    // sound_volume, motion_xposition, motion_yposition, motion_direction,
    // looks_costumenumbername, looks_backdropnumbername, looks_size, sensing_answer, sensing_of;

    // data_replaceitemoflist, data_insertatlist, data_deletealloflist, data_deleteoflist, data_addtolist;

    // operator_add, operator_subtract, operator_multiply, operator_divide,
    // operator_mod, operator_random, operator_round, operator_length,
    // data_lengthoflist, data_itemnumoflist, sensing_timer, sensing_dayssince2000,
    // sensing_current, sensing_distanceto, sensing_mousex, sensing_mousey,
    // sensing_loudness, operator_mathop;

    // control_wait,            //
    //    control_wait_until,      //"wait" "until" BoolExpr
     //   control_stop,            //"stop" "other" "scripts" "in" "sprite"
      //  control_create_clone_of, // "create" "clone" "of" Ident
     //   event_broadcast,         // "broadcast" Message
     //   event_broadcastandwait,  // "broadcast" Message "and" "wait"
     //   sensing_resettimer,      // "reset" "timer"
     //   data_changevariableby,    // "change" Variable "by" Expression

     //   sound_changevolumeby,
     //   sound_changeeffectby,


     //   sensing_askandwait, //  "ask"  StringExpr  "and" "wait"
     //   looks_switchbackdropto, // "switch" "backdrop" "to"  Backdrop

     //   data_showvariable,
     //   data_hidevariable,
     //   data_showlist,
     //   data_hidelist;

     //       sound_cleareffects,     // |  "clear" "sound" "effects"
     //       sound_stopallsounds;    // |  "stop" "all" "sounds"

     // sensing_touchingobject, sensing_touchingcolor, sensing_coloristouchingcolor,
     // sensing_keypressed, sensing_mousedown, operator_gt, operator_lt, operator_equals,
     // operator_and, operator_or, operator_not, operator_contains, data_listcontainsitem;

end

role ScratchSprite is ScratchEntity begin

    // x-coordinate in [-240,+240]
    // See https://en.scratch-wiki.info/wiki/Coordinate_System
    declare x as number

    // y-coordinate in [-180,+180]
    // See https://en.scratch-wiki.info/wiki/Coordinate_System
    declare y as number

    // Percent of the original size in [3,54000]
    // See https://en.scratch-wiki.info/wiki/Size_(value)
    declare size as number

    // The current layer of a sprite
    // See https://en.scratch-wiki.info/wiki/Layer_(value)
    declare layer as number

    // The rotation of the sprite in [-360,+360]
    // See https://en.scratch-wiki.info/wiki/Direction_(value)
    declare direction as number

    // Whether or not the sprite is visible (difference to ghost mode!)
    // See https://en.scratch-wiki.info/wiki/Hide_(block)
    declare visible as boolean

    // Bubble above a ScratchSprite for saying or thinking text for a given duration
    // In Scratch if the bubbleText is empty, the bubble is not visible
    declare bubbleText as string
    declare bubbleType as string
    declare bubbleStart as number
    declare bubbleDuration as number

    // Initialize the variables with their default values
    define x as 0
    define y as 0
    define size as 100
    define layer as 0
    define direction as 90
    define visible as true

    define atomic pointTowards (s: actor) begin
        // Todo what about random?
        declare targetX as number
        declare targetY as number

        define targetX as cast (attribute "x" of s) to number
        define targetY as cast (attribute "y" of s) to number

        declare dx as number
        declare dy as number
        define dx as targetX - x
        define dy as targetY - y

        define direction as (90 - radToDeg(mathAtan2(dy, dx)))
    end

    define atomic moveSteps (n: number) begin
        declare dx as number
        declare dy as number
        declare radians as number

        define radians as degToRad(90 - direction)
        define dx as n * mathCos(radians)
        define dy as n * mathSin(radians)
        define dy as n * mathSin(radians)

        define x as (x + dx)
        define y as (y + dy)
    end


    define changeXBy (increment: number) begin
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
    define touchingMousePointer () begin
        declare result as boolean

        if not (_RUNTIME_getMouseX() < x
                or _RUNTIME_getMouseX() > x + active_graphic_width
                or _RUNTIME_getMouseY() < y
                or _RUNTIME_getMouseY() > y + active_graphic_height) then begin

            define result as false
        end
    end returns result : boolean

    // @Category "Sensing"
    define touchingObject (obj: actor) begin
        // Over-approximation of the sprites be calculating a circle around each sprite and testing if the circles touch

        declare leg_a as number
        declare leg_b as number
        // TODO: Query attributes of myself and the other actor
        define leg_a as active_graphic_width
        define leg_b as active_graphic_height

        declare radius as number
        define radius as 0.5 * mathSqrt(leg_a * leg_a + leg_b * leg_b)

        declare leg_a_other as number
        declare leg_b_other as number
        define leg_a_other as cast attribute "active_graphic_width" of obj to number
        define leg_b_other as cast attribute "active_graphic_height" of obj to number

        declare radius_other as number
        define radius_other as 0.5 * mathSqrt(leg_a_other * leg_a_other + leg_b_other * leg_b_other)

        declare x_other as number
        define x_other as cast attribute "x" of obj to number
        declare y_other as number
        define y_other as cast attribute "y" of obj to number

        declare result as boolean
        define result as not (((mathSqrt((x + x_other)*(x + x_other) + (y + y_other) * (y + y_other)) - radius - radius_other) > 0))

    end returns result : boolean

    // @Category "Sensing"
    define touchingColor (clr: number) begin
        // ...
    end returns result : boolean

    // @Category "Sensing"
    define colorIsTouchingColor(clr: number, tching: number) begin
        // ...
    end returns result : boolean

    // @Category "Sensing"
    define distanceToMousePointer () begin
        // ...
    end returns result : number

    define sayTextFor (msg: string, scs: number) begin
        // msgBounded = substr(msg, 0, 330)
        define bubbleText as msg
        define bubbleStart as _RUNTIME_millis()
        define bubbleType as "say"
        define bubbleDuration as scs
    end

    define sayText (msg: string) begin
        define bubbleText as msg
        define bubbleStart as _RUNTIME_millis()
        define bubbleType as "say"
    end

    // @Category "looks"
    define turnLeft(degrees: number) begin
        setDirection(direction - degrees)
    end

    // @Category "looks"
    define turnRight(degrees: number) begin
        setDirection(direction + degrees)
    end

    define setDirection(dir: number) begin
        // TODO do we need to check if we are in the stage
        // Make sure direction is between -179 and 180
        define direction as wrapClamp(dir, 0-179, 180)
    end

    //    looks_show,            //   "show"
    //    looks_hide,            //   |  "hide"
    //    looks_sayforsecs,      //   |  "say" StringExpr "for" NumExpr  "secs"
    //    looks_say,             //   |  "say" StringExpr
    //    looks_thinkforsecs,    //   |  "think" StringExpr "for" NumExpr  "secs"
    //    looks_think,           //   |  "think" StringExpr
    //    looks_switchcostumeto,    //   |  "switch" "costume" "to" ElementChoice
    //    looks_nextcostume,        //   |  "switch" "costume" "to" ElementChoice
    //    looks_changesizeby,       //   |  "change" "size" "by"  NumExpr
    //    looks_setsizeto,          //   |  "set" "size" "to"  NumExpr  "percent"
    //    looks_gotofrontback,      //   |  "go" "to" "layer"  NumExpr
    //    looks_goforwardbackwardlayers;    //   |  "change" "layer" "by"  NumExpr

    //    motion_movesteps,       // "move"  NumExpr  "steps"
    //    motion_turnright,       // |  "turn" "right"  NumExpr "degrees"
    //    motion_turnleft,        // |  "turn" "left"  NumExpr "degrees"
    //    motion_gotoxy,
    //    motion_goto,            // |  "go" "to"  Position
    //    motion_glideto,
    //    motion_glidesecstoxy,   // |  "glide"  NumExpr  "secs" "to" Position
    //    motion_pointindirection,// |  "point" "in" "direction" NumExpr
    //    motion_pointtowards,    // |  "point" "towards"  Position
    //    motion_changexby,       // |  "change" "x" "by"  NumExpr
    //    motion_changeyby,       // |  "change" "y" "by"  NumExpr
    //    motion_setx,            // |  "set" "x" "to"  NumExpr
    //    motion_sety,            // |  "set" "y" "to"  NumExpr
    //    motion_ifonedgebounce;  // |  "if" "on" "edge" "bounce"

end

role ScratchStage is ScratchEntity begin

    define switchBackdropTo (id: string) begin
        changeActiveImageTo(id)
    end

    define switchBackdropToAndWait (id: string) begin

    end

    define nextBackdrop () begin
        declare idx as number
        define idx as _RUNTIME_getGraphicIndexById(active_graphic_name)
        define idx as (current_idx+1) mod _RUNTIME_getNumGraphics()

        declare id as string
        define id as _RUNTIME_getGraphicIdByIndex(current_idx)

        changeActiveGraphicTo(id)
    end

    define previousBackdrop() begin
        declare idx as number
        define idx as _RUNTIME_getGraphicIndexById(active_graphic_name)
        define idx as (current_idx-1) mod _RUNTIME_getNumGraphics()

        declare id as string
        define id as _RUNTIME_getGraphicIdByIndex(current_idx)

        changeActiveGraphicTo(id)
    end

    define randomBackdrop() begin
         declare idx as number
         define idx as _RUNTIME_getGraphicIndexById(active_graphic_name)
         define idx as random(0, _RUNTIME_getNumGraphics()-1)

         declare id as string
         define id as _RUNTIME_getGraphicIdByIndex(current_idx)

         changeActiveGraphicTo(id)
    end
end

