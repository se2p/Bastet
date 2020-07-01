program App

actor Mouse is RuntimeEntity begin

    script on startup do begin
        declare b1 as boolean
        declare catMoved as boolean
        define catMoved as b1 or b1

        if catMoved then begin
            _RUNTIME_signalFailure("Foo")
        end
    end
end

