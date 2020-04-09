program Mini1Program
actor ActorA is ScratchSprite begin
    script on startup do begin
        define x as 0
        define direction as 90
        declare n as int
        define n as 10
        declare nf as float
        declare dx as float
        declare ndir as float
        define nf as cast n to float
        define ndir as cast direction to float
        define dx as nf * mathCos(90.0 - ndir) // values between -1 and 1
        declare tmpx as int
        define tmpx as cast dx to int
        define x as x + tmpx
        if not (x = 10000000) then begin
            _RUNTIME_signalFailure("moveSteps Test")
        end
    end
end