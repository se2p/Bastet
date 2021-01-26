program WhacAMoleSpec

actor MoleObserver is Observer begin
    declare mole as actor

    define atomic checkBehaviorSatisfied () begin
        declare score as int
        define score as cast attribute "score" of mole to int
        declare bubbleText as string
        define bubbleText as attribute "bubbleText" of mole

        if score = 2 and not bubbleText = "Still here" then begin
            _RUNTIME_signalFailure("Mole should say 'Still here' when score = 2")
        end
    end

    script on bootstrap finished do begin
        define mole as locate actor "Mole"

        checkBehaviorSatisfied() // First specification check (base condition)
    end

    script on statement finished do begin
        checkBehaviorSatisfied() // The actual specification check
    end
end