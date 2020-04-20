program Mini1Program

actor MiniActor is RuntimeEntity begin

    declare PI as float
    define PI as 3.14159265359

    define atomic atan(n: float) begin
    end returns result: float

   define atomic atan2(x: float, y: float) begin
        if x > 0.0 then begin
            label("a")
        end else if x < 0.0 and y > 0.0 then begin
            label("b")
            if x = 0.0 then begin
                assume result > 0.1
                assume result < 0.9
            end else if x < 0.5 and x > 0.0 then begin
                assume result > 0.5
                assume result < 0.9
            end
        end else begin
            label("c")
        end
    end returns result: float

    script on startup do begin
        declare x as float
        define x as 0.0-35.0
        declare y as float
        define y as 0.0

        declare result as float
        define result as atan2(x, y)

        epsilon
        epsilon

        if result = PI then begin
            _RUNTIME_signalFailure("Property must not be PI")
        end
    end
end