program P1CallCenterSpec

actor PhoneCostumeObserver is Observer begin
    declare phone as actor

    define atomic checkBehaviorSatisfied () begin
        declare currentCostume as string
        define currentCostume as attribute "active_graphic_name" of phone

        declare ceoVisible as boolean
        define ceoVisible as currentCostume = "ceo"

        if ceoVisible then begin
            _RUNTIME_signalFailure("CEO should not be reachable")
        end
    end

    script on bootstrap finished do begin
        define phone as locate actor "Phone"

        checkBehaviorSatisfied()
    end

    script on statement finished do begin
        checkBehaviorSatisfied()
    end
end
