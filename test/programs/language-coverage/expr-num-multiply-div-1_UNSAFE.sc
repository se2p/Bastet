program Mini1Program

actor MiniActor is RuntimeEntity begin

    declare PI_SQR_TIMES_FIVE as float
    declare TWO_PI as float
    declare PI as float

    define PI_SQR_TIMES_FIVE as 49.34802200545329
    define PI as 3.14159265359
    define TWO_PI as 6.28318530718

    define modulo (a: int, b: int) begin
        declare intDiv as int
        define intDiv as a / b
        define result as a - (b * intDiv)
    end returns result: int

    script on startup do begin
        declare alpha as float
        define alpha as 35.0

        declare alphaRad as float
        define alphaRad as (alpha * PI) / 180.0 // 0.61...

        declare input as float
        define input as alphaRad

        // input == 0.61...
        declare asDeg as float
        define asDeg as (input * 180.0) / PI
        declare asDegMod as int
        define asDegMod as modulo (cast asDeg to int, 180)
        define asDeg as cast asDegMod to float // 35

        //if not (asDeg = 35.0) then begin
        //     _RUNTIME_signalFailure("Fail input")
        //end

        define input as (asDeg * PI) / 180.0

        declare result as float
        define result as ((16.0*input)*(PI-input))/ (PI_SQR_TIMES_FIVE - 4.0*input*(PI-input))
        if result <= 0.60 and result > 0.50  then begin
        end else begin
            _RUNTIME_signalFailure("Sin Test")
        end
    end
end
