program Mini1Program

actor ActorA is RuntimeEntity begin

    script on startup do begin
        declare x as int
        define x as 0
        declare dx as float
        define dx as mathCos(90.0) // values between -1 and 1
        declare tmpx as int
        define tmpx as cast dx to int
        define x as x + tmpx
        if not (tmpx = 10000000) then begin
            _RUNTIME_signalFailure("moveSteps Test")
        end
    end

end