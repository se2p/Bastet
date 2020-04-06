program Mini1Program

actor MiniActor is RuntimeEntity begin

    define atomic check () begin
        declare a as int
        declare b as int

        define a as 1
        define b as 2

        define result as a < b
    end returns result: boolean

    define atomic assert (cond: boolean) begin
        if not cond then begin
            _RUNTIME_signalFailure("This must not happen!")
        end
    end returns result: int

    script on startup do begin
        assert(check())
    end

end
