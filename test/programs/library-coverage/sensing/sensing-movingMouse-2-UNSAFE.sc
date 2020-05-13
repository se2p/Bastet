program TestProgram

actor Beetle is ScratchSprite begin

    declare state as int

    script on startup do begin
        hide()
        define state as 0
        repeat forever begin
            if state = 0 then begin
                wait 1 seconds
                declare mx as int
                define mx as mouseX()
                if mx > 0-200 and mx < 0-100 then begin
                    define state as 1
                end else begin
                    define state as 0
                end
            end else if state = 1 then begin
                wait 1 seconds
                declare mx as int
                define mx as mouseX()
                if mx > 0-100 and mx < 0 then begin
                    define state as 2
                end else begin
                    define state as 0
                end
            end else if state = 2 then begin
                wait 1 seconds
                declare mx as int
                define mx as mouseX()
                if mx > 0 and mx < 100 then begin
                    _RUNTIME_signalFailure("Bug revealed!")
                end else begin
                    define state as 0
                end
            end
        end
    end

end



