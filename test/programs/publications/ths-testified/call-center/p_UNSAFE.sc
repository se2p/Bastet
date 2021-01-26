program P1_CallCenter

actor Phone is ScratchSprite begin

    image phone "phone.svg"
    image legalSupport "legalSupport.svg"
    image linuxSupport "linuxSupport.svg"
    image windowsSupport "windowsSupport.svg"
    image ceo "ceo.svg"

    script on bootstrap do begin
        changeCostumeTo("phone")
    end

    script on startup do begin
        declare done as boolean
        define done as false
        declare representativeId as int
        define representativeId as 11

        until (done) repeat begin
            if representativeId = 11 then begin
                askAndWait("Press 1 for techsupport, 2 for legal support")

                if answer() = "1" then begin
                    define representativeId as 0
                end else if answer() = "2" then begin
                    define representativeId as 3
                end
            end else if representativeId = 0 then begin
                askAndWait("Press 1 for linux support, 2 for windows support")

                if answer() = "1" then begin
                    define representativeId as 2
                end else if answer() = "2" then begin
                    define representativeId as 1
                end else if answer() = "9" then begin
                    define representativeId as 4
                end
            end else if representativeId = 1 then begin
                changeCostumeTo("windowsSupport")
                sayTextFor("Hello, this is the windows support", 1)
                define done as true
            end else if representativeId = 2 then begin
                changeCostumeTo("linuxSupport")
                sayTextFor("Hello, this is the linux support", 1)
                define done as true
            end else if representativeId = 3 then begin
                changeCostumeTo("legalSupport")
                sayTextFor("Hello, this is the legal support", 1)
                define done as true
            end else if representativeId = 4 then begin
                changeCostumeTo("ceo")
                sayTextFor("How did you get my number?", 1)
                define done as true
            end
        end
    end
end
