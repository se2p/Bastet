program MarbleGame

actor Pole is ScratchSprite begin
    image flag "flag.svg"

    script on bootstrap do begin
        goTo(74, 90)
        changeCostumeTo("flag")
    end
end

actor Marble is ScratchSprite begin
    image marble "Ball-b.svg"

    script on bootstrap do begin
        goTo(0-143, 0-150)
        changeCostumeTo("marble")
    end

    script on startup do begin
        declare pole as actor
        define pole as locate actor "Pole"
        declare ySet as boolean
        define ySet as false
        declare xSet as boolean
        define xSet as false
        declare firstMouseDown as boolean
        define firstMouseDown as true

        until xSet and ySet repeat begin
            if mouseDown() and not ySet then begin
                define y as getMouseY()
                define firstMouseDown as false
            end else begin
                if not firstMouseDown then begin
                    define ySet as true
                end

                if ySet then begin
                    define x as getMouseX()
                    if keyPressedByCode(KEY_SPACE) then begin
                        define xSet as true
                    end
                end
            end
        end

        if touchingObject(pole) then begin
            sayText("Yes :)")
        end else begin
            sayText("No :(")
        end
    end
end
