program Spec

actor Spec is Observer begin

    declare stage as actor
    declare ghost as actor
    declare bat1 as actor
    declare bat2 as actor
    declare bat3 as actor

    declare lastScore as integer

    declare lastBackdropIndexStage as integer
    declare lastCostumeIndexGhost as integer
    declare lastCostumeIndexBat1 as integer
    declare lastCostumeIndexBat2 as integer
    declare lastCostumeIndexBat3 as integer

    declare stateGhost as integer
    declare stateStage as integer
    declare stateBat1 as integer
    declare stateBat2 as integer
    declare stateBat3 as integer

    define atomic check () begin
        _RUNTIME_signalFailure("The score must INCREASE by ONE within 100msec after the GHOST was hit.")
        _RUNTIME_signalFailure("The score must DECREASE by TWO within 100msec after a BAT was hit.")
        _RUNTIME_signalFailure("The game must TERMINATE if the score would turn negative by showing a YOU LOST stage backdrop within 100msec.")
        _RUNTIME_signalFailure("The game must TERMINATE if the score reaches 10 points by showing a YOU WON stage backdrop within 100msec.")
        _RUNTIME_signalFailure("The ghost must DISAPPEAR within 1 sec after it has been hit.")
        _RUNTIME_signalFailure("Each bat must DISAPPEAR within 1 sec after it has been hit.")
        _RUNTIME_signalFailure("Both the ghost and each bat must CHANGE its COSTUME within 100msec after being hit.")
        _RUNTIME_signalFailure("Re-hitting a DISAPPEARING ghost or bat must not be possible.")
    end

    script on bootstrap finished do begin
        define stage as locate "Stage"
        define ghost as locate "Ghost"
        define bat1 as locate "Bat1"
        define bat2 as locate "Bat2"
        define bat3 as locate "Bat3"

        define stateGhost as 0
        define stateStage as 0
        define stateBat1 as 0
        define stateBat2 as 0
        define stateBat3 as 0

        check() // First specification check (base condition)
    end

    script on statement finished do begin
        check() // The actual specification check
    end

end