program Mini1Program

actor MiniActor is RuntimeEntity begin

    define inc (par: number) begin
        define result as par + 1
    end returns result: number

    script on startup do begin
        declare x as number
        define x as 41
        if inc (x) = 41 then begin
            _RUNTIME_signalFailure()
        end
    end

end

