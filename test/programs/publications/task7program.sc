program Task7Program

actor Buhne is ScratchStage begin
    image Buhnenbild1 "file://7.png"
    image HintergrundManegeKlein "file://8.svg"

end

actor Elefant1 is ScratchSprite begin
    image Elefant1 "file://1.svg"
    image Elefant2 "file://2.svg"
    image Elefant3 "file://3.svg"
    image Elefant4 "file://4.svg"
    image Elefant5 "file://5.svg"
    image Elefant6 "file://6.svg"

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

