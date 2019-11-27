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

        looks_show,            //   "show"
        looks_hide,            //   |  "hide"
        looks_sayforsecs,      //   |  "say" StringExpr "for" NumExpr  "secs"
        looks_say,             //   |  "say" StringExpr
        looks_thinkforsecs,    //   |  "think" StringExpr "for" NumExpr  "secs"
        looks_think,           //   |  "think" StringExpr
        looks_switchcostumeto,    //   |  "switch" "costume" "to" ElementChoice
        looks_nextcostume,        //   |  "switch" "costume" "to" ElementChoice
        looks_changesizeby,       //   |  "change" "size" "by"  NumExpr
        looks_setsizeto,          //   |  "set" "size" "to"  NumExpr  "percent"
        looks_gotofrontback,      //   |  "go" "to" "layer"  NumExpr
        looks_goforwardbackwardlayers;    //   |  "change" "layer" "by"  NumExpr


        motion_movesteps,       // "move"  NumExpr  "steps"
        motion_turnright,       // |  "turn" "right"  NumExpr "degrees"
        motion_turnleft,        // |  "turn" "left"  NumExpr "degrees"
        motion_gotoxy,
        motion_goto,            // |  "go" "to"  Position
        motion_glideto,
        motion_glidesecstoxy,   // |  "glide"  NumExpr  "secs" "to" Position
        motion_pointindirection,// |  "point" "in" "direction" NumExpr
        motion_pointtowards,    // |  "point" "towards"  Position
        motion_changexby,       // |  "change" "x" "by"  NumExpr
        motion_changeyby,       // |  "change" "y" "by"  NumExpr
        motion_setx,            // |  "set" "x" "to"  NumExpr
        motion_sety,            // |  "set" "y" "to"  NumExpr
        motion_ifonedgebounce;  // |  "if" "on" "edge" "bounce"


}
