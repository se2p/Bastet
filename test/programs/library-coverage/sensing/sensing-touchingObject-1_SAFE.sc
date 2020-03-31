program Mini1Program

actor ActorA is ScratchSprite begin

end

actor ActorB is ScratchSprite begin

    script on bootstrap do begin
        define x as 0
        define y as 0
    end

    script on startup do begin
        declare leg_a as number
        declare leg_b as number

        define leg_a as 100
        define leg_b as 100

        declare radius as number
        define radius as 0.5 * mathSqrt(leg_a * leg_a + leg_b * leg_b)

        declare leg_a_other as number
        declare leg_b_other as number
        define leg_a_other as 100
        define leg_b_other as 100

        declare radius_other as number
        define radius_other as 0.5 * mathSqrt(leg_a_other * leg_a_other + leg_b_other * leg_b_other)

        declare x_other as number
        define x_other as 0
//        define x_other as cast attribute "x" of obj to number
        declare y_other as number
        define y_other as 0
//        define y_other as cast attribute "y" of obj to number

        declare result as boolean
        define result as ((mathSqrt((x + x_other)*(x + x_other) + (y + y_other) * (y + y_other)) - (radius + radius_other)) < 0)

        if not result then begin
            _RUNTIME_signalFailure()
        end

    end

end
