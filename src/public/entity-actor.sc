module EntityModule;

actor Entity {

    declare attribute "active_graphic" as image;
    declare attribute "volume" as number;
    declare attribute "sound_effect" as enum [ "pitch", "pan_left_right" ];
    declare attribute "graphics_effect" as enum [ "color", "fisheye", "whirl", "pixelate", "mosaic", "brightness", "ghost" ];

    // ATTENTION: The 'define' construct is similar to macros found in Lisp.
    //  See https://en.wikibooks.org/wiki/Scheme_Programming/Macros

    define (change image to <string as id>) as external {
       // JAVASCRIPT CODE here (signaled by the 'external' keyword)
    }

    define (while (boolean as condition) do {block}) as {
       until (not condition) do block;
    }

    // @Category "Looks"
    define (change <string as effect> effect by <number as value>) as {

    }

    // @Category "Looks"
    define (clear graphic effects) as {

    }

    // @Category "Looks"
    define (backdrop number) as {
        declare num as number;
        // ...
    } returns num

    // @Category "Sound"
    define (play sound <sound as snd> until done) as {

    }

    // @Category "Sound"
    define (start sound <sound as snd>) as {

    }

    // @Category "Sound"
    define (stop all sounds) as {

    }

    // @Category "Sound"
    define (change <string as effect> sound effect by <number as num>) as {

    }

    // @Category "Sound"
    define (set <string as effect> sound effect to <number as num>) as {

    }

    // @Category "Sound"
    define (clear sound effects) as {

    }

    // @Category "Sound"
    define (change volume by <number as delta>) as {

    }

    // @Category "Sound"
    define (set volume to <number as percent>) as {

    }

    // @Category "Sound"
    define (volume) as {
        declare vol as number;
        vol = attribute "volume";
    } returns vol

    control_stop,
    control_delete_this_clone;

    data_setvariableto, sensing_setdragmode, motion_setrotationstyle, looks_seteffectto,
    sound_seteffectto, sound_setvolumeto;

    operator_join, operator_letter_of, sensing_username, data_itemoflist,
    sound_volume, motion_xposition, motion_yposition, motion_direction,
    looks_costumenumbername, looks_backdropnumbername, looks_size, sensing_answer, sensing_of;


        data_replaceitemoflist, data_insertatlist, data_deletealloflist, data_deleteoflist, data_addtolist;

    operator_add, operator_subtract, operator_multiply, operator_divide,
    operator_mod, operator_random, operator_round, operator_length,
    data_lengthoflist, data_itemnumoflist, sensing_timer, sensing_dayssince2000,
    sensing_current, sensing_distanceto, sensing_mousex, sensing_mousey,
    sensing_loudness, operator_mathop;

        control_wait,            //"wait" NumExpr "seconds"
        control_wait_until,      //"wait" "until" BoolExpr
        control_stop,            //"stop" "other" "scripts" "in" "sprite"
        control_create_clone_of, // "create" "clone" "of" Ident
        event_broadcast,         // "broadcast" Message
        event_broadcastandwait,  // "broadcast" Message "and" "wait"
        sensing_resettimer,      // "reset" "timer"
        data_changevariableby,    // "change" Variable "by" Expression

        sound_changevolumeby,
        sound_changeeffectby,
        looks_changeeffectby;


        sensing_askandwait, //  "ask"  StringExpr  "and" "wait"
        looks_switchbackdropto, // "switch" "backdrop" "to"  Backdrop
        looks_cleargraphiceffects, // "clear" "graphic" "effects"
        data_showvariable,
        data_hidevariable,
        data_showlist,
        data_hidelist;

            sound_playuntildone,    //    "play" "sound"  ElementChoice  "until" "done"
            sound_play,             // |  "start" "sound"  ElementChoice
            sound_cleareffects,     // |  "clear" "sound" "effects"
            sound_stopallsounds;    // |  "stop" "all" "sounds"

    sensing_touchingobject, sensing_touchingcolor, sensing_coloristouchingcolor,
    sensing_keypressed, sensing_mousedown, operator_gt, operator_lt, operator_equals,
    operator_and, operator_or, operator_not, operator_contains, data_listcontainsitem;


}
