program CatInTheWell

actor Cat is ScratchSprite begin

    image cat "cat.svg"

    declare stepsLeft as int

    script on bootstrap finished do begin
        goTo(0-209, 149)
        changeCostumeTo("cat")
    end

    script on startup do begin
        define stepsLeft as 6
        until stepsLeft = 0 repeat begin
            if keyPressedByCodeNondet(KEY_UP) and not y = 149 then begin
                define y as y + 60
                define stepsLeft as stepsLeft - 1
                wait 1 seconds
            end else if keyPressedByCodeNondet(KEY_DOWN) and not y = 0-151 then begin
                define y as y - 60
                define stepsLeft as stepsLeft - 1
                wait 1 seconds
            end else if keyPressedByCodeNondet(KEY_RIGHT) and not x = 211 then begin
                define x as x + 60
                define stepsLeft as stepsLeft - 1
                wait 1 seconds
            end else if keyPressedByCodeNondet(KEY_LEFT) and not x = 0-209 then begin
                define x as x - 60
                define stepsLeft as stepsLeft - 1
                wait 1 seconds
            end
        end
    end
end