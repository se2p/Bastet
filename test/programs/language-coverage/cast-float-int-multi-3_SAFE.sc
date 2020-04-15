program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare num as float
        declare input as float
        declare result as float
        declare range as float
        declare numi as int

        define num as 395.0
        define input as num
        define range as 360.0

        define num as (num / range)
        define numi as cast num to int
        define result as cast numi to float
        define result as result * range

        define result as (input - result)

        if result = 35.0 then begin
        end else begin
            _RUNTIME_signalFailure()
        end
    end

end
