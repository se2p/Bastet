program Mini1Program

actor MiniActor is RuntimeEntity begin

    define atomic inc (n: int) begin
        define result as n + 1
    end returns result: int

    script on startup do begin
        declare x as int
        define x as 42
        if not (x = 42) then begin
            _RUNTIME_signalFailure("This must not happen!")
        end
    end

end

