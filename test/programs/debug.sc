program Mini1Program

actor ActorA is ScratchSprite begin

    script on startup do begin
        define x as 0
        define y as 0
        define direction as 90

        declare n as int
        define n as 10

        declare nf as float
        declare dx as float
        declare dy as float
        declare ndir as float
        declare input as float
        declare radians as float

        define nf as cast n to float

        define ndir as cast direction to float
        define radians as 0.0
        define dx as nf * mathCos(radians)
        define dy as nf * mathSin(radians)

        define input as radians

        declare tmpx as int
        declare tmpy as int
        define tmpx as cast dx to int
        define tmpy as cast dy to int

        define x as x + tmpx
        define y as y + tmpy


        if not (x >= 9 and x <= 11) then begin
            _RUNTIME_signalFailure("moveSteps Test")
        end
    end

end
