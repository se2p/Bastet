program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare x as float
        define x as 0.0

        declare y as float
        define y as 0.0-100.0

        declare result as float
        define result as mathAtan2(y, x)

        if (result > 3.13 and result < 3.15) or (result < 0.0-3.13 and result > 0.0-3.15) then begin
            _RUNTIME_signalFailure()
        end
    end

end


