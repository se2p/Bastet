program Mini1Program

actor ActorA is ScratchSprite begin

    script on bootstrap do begin
        define x as 0
        define y as 0
    end

end

actor ActorB is ScratchSprite begin

    script on bootstrap do begin
        define x as 0
        define y as 10
    end

    script on startup do begin
        declare actorA as actor
        define actorA as locate actor "ActorA"
        pointTowards(actorA)

        if not (direction = 0) then begin
            _RUNTIME_signalFailure()
        end
    end

end

