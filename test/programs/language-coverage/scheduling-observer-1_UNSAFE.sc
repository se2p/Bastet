program Mini1Program

actor DirexObserver is Observer begin

    declare direx as actor
    declare last_x as number

    define last_x as (0-1)

    define atomic storeRelevantStateInfosForNext () begin
        define last_x as cast attribute "x" of direx to number
    end

    define atomic isBehaviorSatisfied () begin
        declare curr as number
        define curr as cast attribute "x" of direx to number
        define result as (last_x < curr) and (curr < 7)
    end returns result: boolean

    script on bootstrap finished do begin
        define direx as locate actor "Direx"

        // First specification check (base condition)
        assert(isBehaviorSatisfied())

        // Store the relevant attributes
        storeRelevantStateInfosForNext()
    end

    script on statement finished do begin
        // The actual specification check
        assert(isBehaviorSatisfied())

        // Store the relevant attributes
        storeRelevantStateInfosForNext()
    end

end

actor Direx is RuntimeEntity begin

    declare x as number
    define x as 0

    script on startup do begin
        define x as x + 1
        define x as x + 1
        define x as x + 1
        define x as x + 1

        define x as x + 1
        define x as x + 1
        define x as x + 1
        define x as x + 1
    end

end

