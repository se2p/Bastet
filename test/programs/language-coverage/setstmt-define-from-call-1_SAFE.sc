program Mini1Program

actor MiniActor is RuntimeEntity begin

    declare x as int

    define increment (par: int) begin
        define result as par + 1
    end returns result: int

    script on startup do begin
        define x as 1
        define x as increment(x)
        if (x < 2) then begin
            _RUNTIME_signalFailure()
        end
    end

end

