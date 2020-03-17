program Mini1Program

actor MiniActor is RuntimeEntity begin

    define atomic inc (n: number) begin
        define result as n + 1
    end returns result: number

    script on startup do begin
        declare y as number
        define y as 0

        define y as inc(y)
        define y as inc(y)
        define y as inc(y)
        define y as inc(y)

        define y as inc(y)
        define y as inc(y)
        define y as inc(y)
        define y as inc(y)

        if not (y = 8) then begin
            _RUNTIME_signalFailure("This must not happen!")
        end
    end


end

