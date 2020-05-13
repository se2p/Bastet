program TestProgram

actor Ball1 is ScratchSprite begin

    script on startup do begin
        goto(0-50,0)
        repeat forever begin
            if distanceToMousePointer() < 10 then begin
                broadcast "Inc"
            end
        end
    end

end

actor Ball2 is ScratchSprite begin

    declare signaled as boolean
    define signaled as false

    script on startup do begin
        goto(50,0)
        repeat forever begin
            if distanceToMousePointer() < 10 then begin
                if signaled then begin
                    sayTextFor("OK", 1)
                end else begin
                    _RUNTIME_signalFailure("Ball 1 must be touched first!")
                end
            end
        end
    end

    script on message "Inc" () in "USER" do begin
        define signaled as true
    end

end


