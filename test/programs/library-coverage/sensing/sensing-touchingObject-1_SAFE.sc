program Mini1Program

actor ActorA is ScratchSprite begin

end

actor ActorB is ScratchSprite begin


    script on startup do begin

        declare tmp as float
        define tmp as (100.0*100.0)
        define tmp as ((100.0 * 100.0) + (100.0 * 100.0))
        define tmp as 0.5 * mathSqrt(tmp)

        declare result as boolean
        define result as tmp > 0.0

        if not result then begin
           _RUNTIME_signalFailure()
        end

    end

end
