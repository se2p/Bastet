program Mini1Program

actor ActorA begin

    extern _RUNTIME_signalFailure ()

    define atomic mathCos(alpha: float) begin
        define alpha as wrapClamp(alpha, 0.0, 360.0)

        if (alpha > (0.0-1.0) and alpha < 36.0) then begin
            assume result < 1.0
            assume result > 0.0-0.127
        end else if (alpha > 35.0 and alpha < 72.0) then begin
            assume result < 0.0-0.128
            assume result > 0.0-0.967
        end else if (alpha > 71.0 and alpha < 108.0) then begin
            assume result < 0.376
            assume result > 0.0-0.967
        end else begin
            // got invalid input
            _RUNTIME_signalFailure("mathCos")
        end
    end returns result: float

    define atomic wrapClamp(value: float, min: float, max: float) begin
        declare range as float
        define range as ((max - min) + 1.0)
        define result as (value - (mathFloor((value - min) / range) * range))
    end returns result : float

    define atomic mathFloor (n: float) begin
        declare d as float
        define d as cast (cast n to int mod 1) to float
        define result as n - d
    end returns result : float

    script on startup do begin
        declare x as int
        define x as 0
        declare dx as float
        define dx as mathCos(90.0)
        declare tmpx as int
        define tmpx as cast dx to int
        define x as x + tmpx
        if not (tmpx = 10000000) then begin
            _RUNTIME_signalFailure("moveSteps Test")
        end
    end

end