program P3CatAndMouseSpec

actor CatObserver is Observer begin
    declare cat as actor
    declare mouse as actor

    declare lastTimeMouseCaught as int

    declare prevCatX as int
    declare prevCatY as int
    declare catX as int
    declare catY as int

    define atomic checkBehaviorSatisfied () begin
        define catY as cast (attribute "y" of cat) to int
        define catX as cast (attribute "x" of cat) to int

        declare waitTimeOver as boolean
        define waitTimeOver as _RUNTIME_micros() - lastTimeMouseCaught > 5000

        declare catMoved as boolean
        define catMoved as (not catX = prevCatX) or (not catY = prevCatY)

        if waitTimeOver then begin
            if touchingObjects(cat, mouse) then begin
                define lastTimeMouseCaught as _RUNTIME_micros()
            end
        end else if catMoved then begin
            _RUNTIME_signalFailure("Cat should stand still for 5 seconds after catching the mouse")
        end
    end

    define atomic storeRelevantStateInfosForNext () begin
        define prevCatX as catX
        define prevCatY as catY
    end

    script on bootstrap finished do begin
        define cat as locate actor "Cat"
        define mouse as locate actor "Mouse"
        define lastTimeMouseCaught as 0-5001
        define prevCatY as cast (attribute "y" of cat) to int
        define prevCatX as cast (attribute "x" of cat) to int

        checkBehaviorSatisfied()
        storeRelevantStateInfosForNext()
    end

    script on statement finished do begin
        checkBehaviorSatisfied()
        storeRelevantStateInfosForNext()
    end
end
