program P5Spec

actor CarObserver is Observer begin

    declare reachedStopSign as boolean

    declare distance as int
    declare prevDistance as int

    declare car as actor
    declare stopSign as actor

    define atomic checkBehaviorSatisfied () begin
        define distance as calcDistance()

        if distance > prevDistance then begin

                _RUNTIME_signalFailure("Car not moving away from stop sign after reaching it")
            end

        define prevDistance as distance
    end

    define atomic calcDistance () begin
        declare carX as int
        define carX as cast (attribute "x" of car) to int
        declare stopSignX as int
        define stopSignX as cast (attribute "x" of stopSign) to int
        declare dx as int
        define dx as mathAbs(carX - stopSignX)

        define result as dx
    end returns result : int

    script on bootstrap finished do begin
        define car as locate actor "Car"
        define stopSign as locate actor "StopSign"
        define reachedStopSign as false
        define prevDistance as calcDistance()
    end

    script on statement finished do begin
        checkBehaviorSatisfied()
    end

end

