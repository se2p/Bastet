program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare s as string
        define s as "41"
        declare x as number
        define x as (cast s to number) + 1
        if x = 42 then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

