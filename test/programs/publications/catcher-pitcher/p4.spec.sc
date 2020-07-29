program P4_PitcherAndCatcherSpec

actor CatcherObserver is Observer begin

    declare catcher as actor
    declare caught as boolean
    declare prevX as int
    declare prevY as int
    declare x as int
    declare y as int

    /**
    * Informal specification: The actor "catcher" should move
    * from left to right until it is clicked.
    *
    * In particular, the specification is violated if
    * (1) the actor does not move at all (independent of clicks),
    * (2) if the actor moves from right to left if there was no click to it before.
    *
    * Note that a 'move' can be done in different ways and
    * with different speeds. One step (part of a move) might,
    * for example, be done only every second.
    *
    * Question: What happens if the sprite reaches the border?
    */
    define atomic checkBehaviorSatisfied () begin
        define y as cast (attribute "y" of catcher) to int
        define x as cast (attribute "x" of catcher) to int

        declare moved as boolean
        define moved as (not x = prevX) or (not y = prevY)

        if moved and caught then begin
            _RUNTIME_signalFailure("Catcher needs to stop moving after catching the ball")
        end
    end

    define atomic storeRelevantStateInfosForNext () begin
        define prevX as x
        define prevY as y
    end

    script on bootstrap finished do begin
        define caught as false
        define catcher as locate actor "Catcher"
        define prevY as cast (attribute "y" of catcher) to int
        define prevX as cast (attribute "x" of catcher) to int

        checkBehaviorSatisfied()
        storeRelevantStateInfosForNext()
    end

    script on statement finished do begin
        checkBehaviorSatisfied()
        storeRelevantStateInfosForNext()
    end

    script on message "CLICK" () in "SYSTEM" do begin
        define caught as true
    end
end
