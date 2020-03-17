program Mini1Program

actor DirexObserver is Observer begin

    declare direx as actor

    declare last_x as number
    declare last_x_change as number

    define last_x as (0-1)

    define atomic storeRelevantStateInfosForNext () begin
        define last_x as cast attribute "x" of direx to number
    end

    define atomic isBehaviorSatisfied () begin
        define result as true

        declare curr as number
        define curr as cast attribute "x" of direx to number

        if (not last_x = curr) then begin
            define last_x_change as _RUNTIME_millis()
        end

        if _RUNTIME_millis() - last_x_change > 100 then begin
            define result as false
        end
    end returns result: boolean

    script on bootstrap finished do begin
        define direx as locate actor "Direx"
        define last_x_change as _RUNTIME_millis()

        assert(isBehaviorSatisfied())
        storeRelevantStateInfosForNext()
    end

    script on statement finished do begin
        assert(isBehaviorSatisfied())
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

