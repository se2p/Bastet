program Mini1Program

actor ActorA is ScratchSprite begin

    script on startup do begin
        define x as 0
        define y as 0
    end

end

actor ActorB is ScratchSprite begin

    script on startup do begin
        define x as 0
        define y as 100

        declare actorA as actor
        define actorA as locate actor "ActorA"
        pointTowards(actorA)

        if (direction < 185 or direction > 175)  then begin
        end else begin
            _RUNTIME_signalFailure("pointTowardsTest")
        end
    end

end

