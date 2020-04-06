program Mini1Program

actor MiniActor is RuntimeEntity begin

    define inc (par: int) begin
        define result as par + 1
    end returns result: int

    script on startup do begin
        declare x as int
        define x as 41
        if inc (x) = 42 then begin
            _RUNTIME_signalFailure()
        end
    end

end

