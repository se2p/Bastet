program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare num as int
        define num as 395

        declare result as int
        define result as wrapClamp(num,0,359)

        if result = 35 then begin
            _RUNTIME_signalFailure()
        end
    end

end

