module IntermediateModule

role RuntimeEntity begin

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

    extern _RUNTIME_signalFailure ()

    extern _RUNTIME_numberFromInterval(from_num: number, to_num: number) returns number

    extern _RUNTIME_integerFromInterval(from_num: number, to_num: number) returns number

end

role Observer is RuntimeEntity begin

    define atomic assert (condition: boolean) begin
        if not condition then begin
            _RUNTIME_signalFailure()
        end
    end

end

role ScratchEntity is RuntimeEntity begin

    // 480 * 360 = 172800 pixels
    declare active_graphic_pixels as list of number

    declare volume as number

    declare sound_effect as enum [ "pitch", "pan_left_right" ]

    declare graphics_effect as enum [ "color", "fisheye", "whirl", "pixelate", "mosaic", "brightness", "ghost" ]

    extern mathSin(n: number) returns number

    extern mathCos(n: number) returns number

    extern mathAtan2(n1: number, n2: number) returns number

    extern degToRad(n: number) returns number

    extern radToDeg(n: number) returns number

    // @Category "Looks"
    define changeActiveGraphicTo (id: string) begin
       // JAVASCRIPT CODE here (signaled by the 'external' keyword)
    end

    // @Category "Looks"
    // @Block "change <string as effect> effect by <number as value>
    define changeGraphicEffectBy (eff:string, val:number) begin

    end

    // @Category "Looks"
    // @Block "clear graphic effects"
    define clearGraphicEffects () begin

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
    define playUntilDone (snd: number) begin

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

    // control_wait,            //"wait" NumExpr "seconds"
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

    // Initialize the variables with their default values
    define x as 0
    define y as 0
    define size as 100
    define layer as 0
    define direction as 90
    define visible as true

    define atomic pointTowards (s: string) begin
        declare targetX as number
        declare targetY as number

        define targetX as (attribute "x" of s)
        define targetY as (attribute "y" of s)

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
        // ...
    end returns result : boolean

    // @Category "Sensing"
    define touchingObject (obj: string) begin
            // ...
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
    end

    define sayText (msg: string) begin

    end

    // @Category "looks"
    define turnLeft(deg: number) begin

    end

    // @Category "looks"
    define turnRight(deg: number) begin

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

    end

end

