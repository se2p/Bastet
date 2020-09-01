program Task7Spec

/**
 * ## Task "Fruit Catching Game“
 *
 *
 */

actor GameObserver is Observer begin

    define atomic isBehaviorSatisfied () begin
    end

    define atomic storeRelevantStateInfosForNext () begin
    end

    script on startup do begin

    end

    script on bootstrap finished do begin
        // First specification check (base condition)
        checkBehaviorSatisfied()

        // Store the relevant attributes
        storeRelevantStateInfosForNext()
    end

    script on statement finished do begin
        // The actual specification check
        checkBehaviorSatisfied()

        // Store the relevant attributes
        storeRelevantStateInfosForNext()
    end

end

