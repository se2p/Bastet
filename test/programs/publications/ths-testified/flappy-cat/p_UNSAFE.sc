program FlappyCat

actor Cat is ScratchSprite begin
    image cat "cat.svg"
    declare building as actor

    script on bootstrap do begin
        changeCostumeTo("cat")
    end

    script on startup do begin
        goTo(0-140, 0)
        define building as locate actor "Buildings"

        until touchingObject(building) repeat begin
            if keyPressedByCode(KEY_SPACE) then begin
                define y as 100
                wait 1 seconds
                define y as 0-100
            end
        end
    end
end


actor Buildings is ScratchSprite begin
    image buildings "building.svg"
    declare score as int

    script on bootstrap do begin
        define score as 0
        changeCostumeTo("buildings")
    end

    script on startup do begin
        goTo(260, 0)
        repeat forever begin
            if x < 0-260 then begin
               define score as score + 1
               goTo(260, 0)
            end else begin
                define x as x - 10
            end
        end
    end
end

