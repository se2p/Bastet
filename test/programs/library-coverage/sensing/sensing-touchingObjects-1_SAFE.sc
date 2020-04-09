program Mini1Program

actor ActorA is ScratchSprite begin
    image Elefant "1.svg"

    script on bootstrap do begin
        define x as 0
        define y as 0
        changeActiveGraphicTo("Elefant")
    end

end

actor ActorB is ScratchSprite begin
    image Elefant "1.svg"

    script on bootstrap do begin
        define x as 0
        define y as 0
        changeActiveGraphicTo("Elefant")
    end
end

actor KatzenObserver is Observer begin

    declare actor_1_id as actor
    declare actor_2_id as actor

    script on bootstrap finished do begin
        define actor_1_id as locate actor "ActorA"
        define actor_2_id as locate actor "ActorB"

        if not touchingObjects(actor_1_id, actor_2_id) then begin
            _RUNTIME_signalFailure()
         end
    end
end

