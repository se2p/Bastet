program TestProgram

actor DirexObserver is Observer begin

    declare direx as actor
    declare last_x as int

    declare last_change as int
    define last_change as 0

    define atomic storeRelevantStateInfosForNext () begin
        define last_x as cast attribute "x" of direx to int
    end

    define atomic isBehaviorSatisfied () begin
        declare curr as int
        define curr as cast attribute "x" of direx to int
        define result as (last_x < curr) and (curr < 3)
    end returns result: boolean

    script on bootstrap finished do begin
        define direx as locate actor "Direx"
        define last_x as (0-1)

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

    declare x as int
    define x as 0

    script on startup do begin
        define x as x + 1
        define x as x + 1
    end

end

