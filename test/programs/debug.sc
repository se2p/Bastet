program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
       declare x as int
       declare y as int
       declare z as int
       define x as 3
       define y as 0

       precision push x + y = 3
       precision push y > 0
       precision push y = 0
       precision push x < 3
       precision push y < 3
       precision push x = 3

       until x = 0 repeat begin
           define x as x - 1
           define y as y + 1
       end

       if not y = 3 then begin
            _RUNTIME_signalFailure()
       end
    end

end
