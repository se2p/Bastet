program Mini1Program

actor MiniActor is RuntimeEntity begin

    define gz (par: int) begin
        define result as par > 0
    end returns result: boolean

    script on startup do begin
        declare x as int
        define x as 42
        if gz (x) then begin
            _RUNTIME_signalFailure()
        end
    end

end

