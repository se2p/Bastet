program Mini1Program

actor ActorA begin

    extern _RUNTIME_signalFailure ()

    define atomic mathSin (input: float) begin
        if input >= 0.0 and input < 0.3142 then begin
            assume result > 0.0
            assume result <= 0.3091
        end else if input >= 0.3142 and input < 0.4713 then begin
            assume result > 0.3091
            assume result <= 0.454
        end else if input >= 0.4713 and input < 0.6284 then begin
            assume result > 0.454
            assume result <= 0.5879
        end else if input >= 0.6284 and input < 0.7855 then begin
            assume result > 0.5879
            assume result <= 0.7072
        end else if input >= 0.7855 and input < 0.9426 then begin
            assume result > 0.7072
            assume result <= 0.8091
        end else if input >= 0.9426 and input < 1.0997 then begin
            assume result > 0.8091
            assume result <= 0.8911
        end else if input >= 1.0997 and input < 1.2568 then begin
            assume result > 0.8911
            assume result <= 0.9511
        end else if input >= 1.2568 and input < 1.4139 then begin
            assume result > 0.9511
            assume result <= 0.9877
        end else if input >= 1.4139 and input < 1.571 then begin
            assume result > 0.9877
            assume result <= 1.0
        end
    end returns result: float


    script on startup do begin
        declare dx as float
        declare dy as float
        declare radians as float
        define radians as 0.0
        define dx as mathSin(radians)
        define dy as mathSin(radians)

        if true then begin
            _RUNTIME_signalFailure("moveSteps Test")
        end
    end

end
