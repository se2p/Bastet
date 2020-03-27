program Task7Program

actor Buhne is ScratchStage begin
    image Buhnenbild1 "7.png"
    image HintergrundManegeKlein "8.svg"

end

actor Elefant1 is ScratchSprite begin
    image Elefant1 "1.svg"
    image Elefant2 "2.svg"
    image Elefant3 "3.svg"
    image Elefant4 "4.svg"
    image Elefant5 "5.svg"
    image Elefant6 "6.svg"

    script on startup do begin
        repeat forever begin
            changeCostumeTo("Elefant1")
            wait 1 seconds
            changeCostumeTo("Elefant2")
            wait 1 seconds
            changeCostumeTo("Elefant3")
            wait 1 seconds
            changeCostumeTo("Elefant4")
            wait 1 seconds
            changeCostumeTo("Elefant5")
            wait 1 seconds
            changeCostumeTo("Elefant6")
            wait 1 seconds
        end
    end

end

