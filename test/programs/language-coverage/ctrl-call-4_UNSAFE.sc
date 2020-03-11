program Mini1Program

actor MiniActor is RuntimeEntity begin

    define atomic inc (n: number) begin
        define result as n + 1
    end returns result: number

    define atomic dec (n: number) begin
        define result as n - 1
    end returns result: number

    define atomic foo (n: number) begin
        define result as n
        define result as inc(result)
        define result as inc(result)
        define result as inc(result)

        define result as dec(result)
        define result as dec(result)
    end returns result: number

    script on startup do begin
        declare y as number
        define y as 0

        define y as inc(y)
        define y as inc(y)
        define y as inc(y)
        define y as inc(y)

        define y as dec(y)
        define y as dec(y)
        define y as dec(y)
        define y as dec(y)

        define y as foo(y)
        define y as foo(y)
        define y as foo(y)
        define y as foo(y)

        if (y = 4) then begin
            _RUNTIME_signalFailure("This must not happen!")
        end
    end


end

