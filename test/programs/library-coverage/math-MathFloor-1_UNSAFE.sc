program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare num as number
        define num as 5.5

        declare result as number
        define result as mathFloor(num)

        if result = 5 then begin
            _RUNTIME_signalFailure()
        end
    end

end

