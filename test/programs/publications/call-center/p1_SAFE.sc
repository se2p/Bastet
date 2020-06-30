program P1_CallCenter

actor Phone is ScratchSprite begin
    declare representativeId as int
    define representativeId as -1

    script on startup do begin
        declare done as boolean
        define done as false

        until done repeat begin
            if representativeId == -1 then begin
                askAndWait("Press 1 for techsupport, 2 for legal support")

                if IOActor.answer == 1 then begin
                    define representativeId as 0
                end else if IOActor.answer == 2 then begin
                    define representativeId as 3
                end
            end else if representativeId == 0 then begin
                askAndWait("Press 1 for linux support, 2 for windows support")

                if IOActor.answer == 1 then begin
                    define representativeId as 2
                end else if IOActor.answer == 2 then begin
                    define representativeId as 1
                end
            end else if representativeId == 1 begin
                sayTextFor("Hello, this is the windows support", 1)
                define done as true
            end else if representativeId == 2 begin
                sayTextFor("Hello, this is the linux support", 1)
                define done as true
            end else if representativeId == 3 begin
                sayTextFor("Hello, this is the legal support", 1)
                define done as true
            end else if representativeId == 4 begin
                sayTextFor("How did you get my number?", 1)
                define done as true
            end
        end
    end
end

// Representative 0
actor TechSupport is ScratchSprite begin
    script on startup do begin
        repeat forever begin
            if Phone.representativeId == 0 then begin
                show()
            end else begin
                hide()
            end
        end
    end
end

// Representative 1
actor WindowsSupport is ScratchSprite begin
    script on startup do begin
        repeat forever begin
            if Phone.representativeId == 1 then begin
                show()
            end else begin
                hide()
            end
        end
    end
end

// Representative 2
actor LinuxSupport is ScratchSprite begin
    script on startup do begin
        repeat forever begin
            if Phone.representativeId == 2 then begin
                show()
            end else begin
                hide()
            end
        end
    end
end

// Representative 3
actor LegalSupport is ScratchSprite begin
    script on startup do begin
        repeat forever begin
            if Phone.representativeId == 3 then begin
                show()
            end else begin
                hide()
            end
        end
    end
end

// Representative 4
actor CEO is ScratchSprite begin
    script on startup do begin
        repeat forever begin
            if Phone.representativeId == 4 then begin
                show()
            end else begin
                hide()
            end
        end
    end
end