program Mini1Program

actor DirexObserver is Observer begin

    define atomic isBehaviorSatisfied () begin
        define result as true
        if _RUNTIME_millis() > 1000 then begin
            define result as false
        end
    end returns result: boolean

    script on bootstrap finished do begin
        assert(isBehaviorSatisfied())
    end

    script on statement finished do begin
        assert(isBehaviorSatisfied())
    end

end

actor Direx is RuntimeEntity begin

    script on startup do begin
        epsilon
    end

end

