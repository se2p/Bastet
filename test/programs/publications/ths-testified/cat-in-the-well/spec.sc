program CatInTheWellSpec

actor CatObserver is Observer begin
    declare cat as actor

    define atomic checkBehaviorSatisfied () begin
        declare catX as int
        declare catY as int
        define catX as cast attribute "x" of cat to int
        define catY as cast attribute "y" of cat to int

        if catX = 31 and catY = 29 then begin
            _RUNTIME_signalFailure("Cat may not fall in the well!")
        end
    end

    script on bootstrap finished do begin
        define cat as locate actor "Cat"

        checkBehaviorSatisfied() // First specification check (base condition)
    end

    script on statement finished do begin
        checkBehaviorSatisfied() // The actual specification check
    end
end