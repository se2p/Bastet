program WhacAMole

actor Mole is ScratchSprite begin
    image mole "mole.svg"
    declare score as int

    script on bootstrap do begin
        changeCostumeTo("mole")
        define score as 0
        goTo(0-140, 0-100)
    end

    script on message "SPRITE_CLICK" () do begin
        define score as score + 1
        define x as ((x + 100) mod 500) - 250
    end
end
