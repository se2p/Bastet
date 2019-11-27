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

}
