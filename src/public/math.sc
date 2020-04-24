role MathActor begin

    // @Category "Sensing"
    // This is the old version of touchingObject
    // The idea here is to approximate Sprites with Circles around them, and test if they intersect.
    // They intersect if the sum of their radius is bigger than the distance between their middle points
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

        declare squares as float
        define squares as leg_a * leg_a + leg_b * leg_b

        declare radius as float
        define radius as 0.5 * mathSqrt(mathAbsF(squares))

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

end
