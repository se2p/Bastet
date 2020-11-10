program Task7

actor Stage is RuntimeEntity begin

    declare countdown as int

    script on startup do begin
        define countdown as 4
        until (countdown = 0) repeat begin
            define countdown as countdown - 1
        end
    end

end

actor Bowl is ScratchSprite begin

    define atomic cos (input: float) begin
        if input >= 0.0 and input < 0.3142 then begin
            assume result > 0.951
            assume result <= 1.0
        end else if input >= 0.3142 and input < 0.4713 then begin
            assume result > 0.891
            assume result <= 0.951
        end else if input >= 0.4713 and input < 0.6284 then begin
            assume result > 0.809
            assume result <= 0.891
        end else if input >= 0.6284 and input < 0.7855 then begin
            assume result > 0.707
            assume result <= 0.809
        end else if input >= 0.7855 and input < 0.9426 then begin
            assume result > 0.5877
            assume result <= 0.707
        end else if input >= 0.9426 and input < 1.0997 then begin
            assume result > 0.4539
            assume result <= 0.5877
        end else if input >= 1.0997 and input < 1.2568 then begin
            assume result > 0.3089
            assume result <= 0.4539
        end else if input >= 1.2568 and input < 1.4139 then begin
            assume result > 0.1563
            assume result <= 0.3089
        end else if input >= 1.4139 and input < 1.571 then begin
            assume result > 0.0 - 0.0002
            assume result <= 0.1563
        end else if input >= 1.571 and input < 1.7281 then begin
            assume result > 0.0 - 0.1567
            assume result <= 0.0 - 0.0002
        end else if input >= 1.7281 and input < 1.8852 then begin
            assume result > 0.0 - 0.3092
            assume result <= 0.0 - 0.1567
        end else if input >= 1.8852 and input < 2.0423 then begin
            assume result > 0.0 - 0.4542
            assume result <= 0.0 - 0.3092
        end
    end returns result: float

    define atomic move (n: float) begin
        declare dx as float
        define dx as cos(n)
    end

    define foo () begin
    end returns result: boolean

    script on startup do begin
        until (Stage.countdown = 0) repeat begin
            epsilon
            if foo() then begin
                move(1.1)
            end
        end
        _RUNTIME_signalFailure("Bowl must move left when corresponding arrow key is pressed")
    end

end


