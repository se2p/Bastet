program CatInTheWellSpec

actor CatObserver is Observer begin

    declare glass as actor
    declare cat as actor
    declare stage as actor
    declare io as actor

    declare lastPosXGlass as integer
    declare lastPosYGlass as integer

    declare lastPosXCat as integer
    declare lastPosYCat as integer

    declare lastKeyPressed as integer

    declare initDone as boolean

    declare remainingSteps as integer

    declare stateFailing as integer
    declare stateFailingEnterTime as integer

    declare expectedCatX as integer
    declare expectedCatY as integer

    declare reachedOrFailed as boolean

    define atomic check () begin
        declare catX as integer
        declare catY as integer
        define catX as cast attribute "x" of cat to integer
        define catY as cast attribute "y" of cat to integer

        declare glassX as integer
        declare glassY as integer
        define glassX as cast attribute "x" of glass to integer
        define glassY as cast attribute "y" of glass to integer

        declare dxCat as integer
        declare dyCat as integer
        define dxCat as mathAbs(lastPosXCat - catX)
        define dyCat as mathAbs(lastPosYCat - catY)

        declare pressed as integer
        define pressed as keyPressed()

        if initDone then begin
            declare posChanged as boolean
            define posChanged as not (catX = lastPosXCat) or not (catY = lastPosYCat)

            declare touchingGlass as boolean
            define touchingGlass as touchingObjects(cat, glass)

            if posChanged then begin
                if remainingSteps <= 0 then begin
                    _RUNTIME_signalFailure("The cat must not be movable after reaching the bowl or failing.")
                end
                define remainingSteps as remainingSteps - 1
            end

            if stateFailing = 0 then begin
                if remainingSteps <= 0 then begin
                    if touchingGlass then begin
                        define reachedOrFailed as true
                        define stateFailing as 2
                    end else begin
                        define stateFailing as 1
                        define stateFailingEnterTime as _RUNTIME_micros()
                    end
                end
            end else if stateFailing = 1 then begin
                define stateFailing as 0
                declare msgShow as boolean

                if msgShow then begin
                    define stateFailing as 2
                end else if _RUNTIME_micros() - stateFailingEnterTime > 200000 then begin
                    _RUNTIME_signalFailure("The cat must fail with a message if the glass is not reached with 12 steps.")
                end
            end

            define lastPosXCat as catX
            define lastPosYCat as catY
            define lastPosXGlass as glassX
            define lastPosYGlass as glassY
        end else begin
            // We assume the cat to be shown after its position was initialized
            declare catShown as boolean
            define catShown as cast attribute "visible" of cat to boolean

            if catShown then begin
                define expectedCatX as cast attribute "x" of cat to integer
                define expectedCatY as cast attribute "y" of cat to integer
                define initDone as true
            end
        end
    end

    script on bootstrap finished do begin
        define cat as locate "Cat"
        define glass as locate "Fishbowl"
        define stage as locate "Stage"
        define io as locate "IOActor"

        define lastPosXCat as cast attribute "x" of cat to integer
        define lastPosYCat as cast attribute "y" of cat to integer
        define lastPosXGlass as cast attribute "x" of glass to integer
        define lastPosYGlass as cast attribute "y" of glass to integer

        define lastKeyPressed as keyPressed()

        define initDone as false
        define reachedOrFailed as false
        define remainingSteps as 12
        define stateFailing as 0
        define stateFailingEnterTime as _RUNTIME_micros()

        check() // First specification check (base condition)
    end

    script on statement finished do begin
        check() // The actual specification check
    end
end