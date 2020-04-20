program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare x as float
        define x as 35.0

        declare y as float
        define y as 1.0

        declare result as float
        define result as mathAtan2(x, y)

        if result > 84.290 and result < 90.0 then begin
            _RUNTIME_signalFailure()
        end
    end

end


