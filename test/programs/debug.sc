program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
       declare x as int
       declare y as int
       define x as 7
       define y as 0
       precision push x + y = 7
       precision push y >= 0
       precision push x <= 7
       until x = 0 repeat begin
           define x as x - 1
           define y as y + 1
       end
       if not y = 7 then begin
            _RUNTIME_signalFailure()
        end
    end

end
