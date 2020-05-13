program Mini1Program

actor ActorB is ScratchSprite begin

    script on startup do begin
        define x as 0
        define y as 100

        pointTowardsPos(0,0)

        if (direction < 185 or direction > 175)  then begin
            _RUNTIME_signalFailure("pointTowardsTest")
        end else begin
        end
    end

end

