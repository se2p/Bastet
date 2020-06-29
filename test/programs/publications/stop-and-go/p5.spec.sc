program P5Spec

actor CarObserver is Observer begin

    declare reachedStopSign as boolean

    declare distance as int
    declare prevDistance as int

    declare car as actor
    declare stopSign as actor

    define atomic checkBehaviorSatisfied () begin
        define distance as calcDistance()

        if reachedStopSign then begin
            if prevDistance > distance then begin
                _RUNTIME_signalFailure("Car not moving away from stop sign after reaching it")
            end
        end else begin
            if prevDistance < distance then begin
                _RUNTIME_signalFailure("Car not moving towards stop sign")
            end

            define reachedStopSign as touchingObjects(stopSign, car)
        end
    end

    define atomic calcDistance () begin
        declare carX as int
        declare carY as int
        define carX as cast (attribute "x" of car) to int
        define carY as cast (attribute "y" of car) to int

        declare stopSignX as int
        declare stopSignY as int
        define stopSignX as cast (attribute "x" of stopSign) to int
        define stopSignY as cast (attribute "y" of stopSign) to int

        declare dx as int
        declare dy as int
        define dx as mathAbs(carX - stopSignX)
        define dy as mathAbs(carY - stopSignY)

        define result as dx + dy
    end returns result : int

    define atomic storeRelevantStateInfosForNext () begin
        define prevDistance as distance
    end

    script on bootstrap finished do begin
        define car as locate actor "Car"
        define stopSign as locate actor "StopSign"
        define reachedStopSign as false
        define prevDistance as calcDistance()

        checkBehaviorSatisfied()
        storeRelevantStateInfosForNext()
    end

    script on statement finished do begin
        checkBehaviorSatisfied()
        storeRelevantStateInfosForNext()
    end

end

