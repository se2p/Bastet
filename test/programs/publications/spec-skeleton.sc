actor ThingObserver is Observer begin

    define atomic checkBehaviorSatisfied () begin
        ...
        if ... then begin
            failure("The thing must not ...")
        end
    end

    define atomic storeRelevantStateInfosForNext () begin
        ...
    end

    script on bootstrap finished do begin
        ...
        checkBehaviorSatisfied() // First specification check (base condition)
        storeRelevantStateInfosForNext() // Store relevant attributes for the next step
    end

    script on statement finished do begin
        checkBehaviorSatisfied() // The actual specification check
        storeRelevantStateInfosForNext() // Store relevant attributes for the next step
    end

end

