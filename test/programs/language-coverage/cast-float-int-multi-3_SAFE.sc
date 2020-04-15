program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare f as float
        declare foo as float
        declare result as float
        declare range as float
        declare i as int

        define f as 395.0
        define foo as f
        define range as 360.0

        if not f = 395.0 then begin
            _RUNTIME_signalFailure("Value of f")
        end

        if not foo = 395.0 then begin
            _RUNTIME_signalFailure("Value of foo")
        end

        if not range = 360.0 then begin
            _RUNTIME_signalFailure("Value of range")
        end

        define f as (f / range)

        if not (f > 1.0 and f < 1.1) then begin
            _RUNTIME_signalFailure("Division")
        end

        define i as cast f to int

        if not i = 1 then begin
            _RUNTIME_signalFailure("Cast 1")
        end

        define result as cast i to float
        define result as result * range

        define result as (foo - result)

        if result = 35.0 then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end
