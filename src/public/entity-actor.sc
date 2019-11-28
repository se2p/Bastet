module EntityModule;

actor Entity {

    declare attribute "active_graphic" as image;
    declare attribute "volume" as number;
    declare attribute "sound_effect" as enum [ "pitch", "pan_left_right" ];
    declare attribute "graphics_effect" as enum [ "color", "fisheye", "whirl", "pixelate", "mosaic", "brightness", "ghost" ];

    // ATTENTION: The 'define' construct is similar to macros found in Lisp.
    //  See https://en.wikibooks.org/wiki/Scheme_Programming/Macros

    define image_change_image_to (id: string) as {
       // JAVASCRIPT CODE here (signaled by the 'external' keyword)
    }


    // @Category "Looks"
    // @Block "change <string as effect> effect by <number as value>
    define looks_changeeffectby (effect:string, value:number) as {

    }

    // @Category "Looks"
    // @Block "clear graphic effects"
    define looks_cleargraphiceffects () as {

    }

    // @Category "Looks"
    // @Block "backdrop number"
    define looks_backdropnumber as {

    } returns result : number

    // @Category "Looks"
    // @Block "backdrop name"
    define looks_backdropname as {

    } returns result : string

    // @Category "Sound"
    // @Block "play sound <sound as snd> until done"
    define sound_playuntildone (snd: sound) as {

    }

    // @Category "Sound"
    // @Blo0ck "start sound <sound as snd>"
    define sound_play (snd: sound) as {

    }

    // @Category "Sound"
    define (stop all sounds) as {

    }

    // @Category "Sound"
    // @Block "change <string as effect> sound effect by <number as num>"
    define sound_changeeffectby (effect: string, value: number) as {

    }

    // @Category "Sound"
    // @Block "set <string as effect> sound effect to <number as num>"
    define sound_seteffectto (effect: string, value: number) as {

    }

    // @Category "Sound"
    // @Block "clear sound effects"
    define sound_cleareffects () as {

    }

    // @Category "Sound"
    // @Block "change volume by <number as delta>"
    define sound_changevolumeby (delta: number) as {

    }

    // @Category "Sound"
    // @Block "set volume to <number as percent>"
    define sound_setvolumeto (percent: number) as {

    }

    // @Category "Sound"
    // @Block "volume"
    define volume () as {
        result = attribute "volume"
    } returns result : int


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
        ;


        sensing_askandwait, //  "ask"  StringExpr  "and" "wait"
        looks_switchbackdropto, // "switch" "backdrop" "to"  Backdrop

        data_showvariable,
        data_hidevariable,
        data_showlist,
        data_hidelist;


            sound_cleareffects,     // |  "clear" "sound" "effects"
            sound_stopallsounds;    // |  "stop" "all" "sounds"

    sensing_touchingobject, sensing_touchingcolor, sensing_coloristouchingcolor,
    sensing_keypressed, sensing_mousedown, operator_gt, operator_lt, operator_equals,
    operator_and, operator_or, operator_not, operator_contains, data_listcontainsitem;


}
