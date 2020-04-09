program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare num as float
        define num as 5.5

        declare result as float
        define result as mathFloor(num)

        if result = 5.0 then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

