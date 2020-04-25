program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare alpha as float
        define alpha as 4.399

        declare result as float
        define result as mathSin(alpha)

        if (result > 0.0-0.9877) and result <= (0.0-0.951)  then begin
            _RUNTIME_signalFailure()
        end
    end

end

