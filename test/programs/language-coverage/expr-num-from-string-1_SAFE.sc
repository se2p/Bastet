program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare s as string
        define s as "41"
        declare x as int
        define x as (cast s to int) + 1
        if x = 42 then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end

