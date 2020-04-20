program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare x as float
        define x as 0.0-35.0

        declare y as float
        define y as 0.0

        declare result as float
        define result as mathAtan2(x, y)

        declare PI as float
        define PI as 3.14159265359

        if result = PI or result = 0.0 - PI then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

