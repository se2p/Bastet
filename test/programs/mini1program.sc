program Mini1Program

actor MiniActor is RuntimeEntity begin

    define inc (n: number) begin
        define result as n + 1
    end returns result: number

    script on startup do begin
        declare x as number
        define x as inc(41)
        if not (x = 42) then begin
            _RUNTIME_signalFailure("This must not happen!")
        end
    end

end

