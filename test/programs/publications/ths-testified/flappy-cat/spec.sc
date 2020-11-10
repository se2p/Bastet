program FlappyCatSpec

actor BuildingsObserver is Observer begin
    declare buildings as actor

    define atomic checkBehaviorSatisfied () begin
        declare score as int
        define score as cast (attribute "score" of buildings) to int

        if score = 2 then begin
            _RUNTIME_signalFailure("Game should stop after the first building")
        end
    end

    script on bootstrap finished do begin
        define buildings as locate actor "Buildings"

        checkBehaviorSatisfied() // First specification check (base condition)
    end

    script on statement finished do begin
        checkBehaviorSatisfied() // The actual specification check
    end
end