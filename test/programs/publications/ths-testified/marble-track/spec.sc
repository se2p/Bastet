program P7Spec

// Marble must be within the two tracks
// Vertical track: -144 < marbleX < 138 and -153 < marbleY < 157
// Horizontal track: -144 < marbleX < 53 and 59 < marbleY < 65
// Works with revision: 6ca80583
actor MarbleObserver is Observer begin
    declare marble as actor

    define atomic checkBehaviorSatisfied () begin
        declare marbleX as int
        declare marbleY as int
        define marbleX as cast attribute "x" of marble to int
        define marbleY as cast attribute "y" of marble to int

        declare inVerticalTrack as boolean
        define inVerticalTrack as marbleX > 0-144 and marbleX < 0-138
        declare inHorizontalTrack as boolean
        define inHorizontalTrack as marbleY < 65 and marbleY > 59 and marbleX > 0-144 and marbleX < 53

        if not (inVerticalTrack or inHorizontalTrack) then begin
            _RUNTIME_signalFailure("Marble not inside the track")
        end
    end

    script on bootstrap finished do begin
        define marble as locate actor "Marble"

        checkBehaviorSatisfied() // First specification check (base condition)
    end

    script on statement finished do begin
        checkBehaviorSatisfied() // The actual specification check
    end

end

