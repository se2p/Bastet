module SpriteModule;

import Entity from "entity-actor.sc"

actor Sprite is Entity {

    declare attribute "x" as number;
    declare attribute "y" as number;
    declare attribute "size" as number;
    declare attribute "zindex" as number;
    declare attribute "direction" as number;
    declare attribute "visible" as boolean;
    declare attribute "rotation_style" as enum [ "left_right", "do_not_rotate", "all_arround" ];
    declare attribute "drag_mode" as enum [ "draggable", "not_draggable" ];

    define (change x by <number as increment>) as {
       set attribute "x" to (attribute "x" + increment);
    }

    define (change custome to <string as id>) as {
        change image to (id);
    }

    // @Category "Sensing"
    define (touching edge) as {
        declare result as boolean;
        // ...
    } returns result

    // @Category "Sensing"
    define (touching mousepointer) as {
        declare result as boolean;
        // ...
    } returns result

    // @Category "Sensing"
    define (touching color <color as c>) as {
        declare result as boolean;
        // ...
    } returns result

    // @Category "Sensing"
    define (color <color as c1> is touching <color as c2>) as {
        declare result as boolean;
        // ...
    } returns result

    // @Category "Sensing"
    define (distance to ) {
        declare result as boolean;
        // ...
    } returns result

}
