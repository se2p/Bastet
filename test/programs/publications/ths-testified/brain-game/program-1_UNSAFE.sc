program BrainGame

actor Game is ScratchSprite begin

    declare score as integer
    declare max as integer          // Upper bound for the randomly generated number
    declare a as integer            // First randomly generated summand
    declare b as integer            // Second randomly generated summand

    define myAskAndWait (a: integer, b: integer) begin
        declare exercise as string
        define exercise as (join (join (cast a to string) " + ") (cast b to string))
        askAndWait (join ("Please enter the result of adding the two numbers? ") exercise)
    end

    script on startup do begin
        // define score as 0  // <--not using this line makes the program UNSAFE
        define max as 100
        repeat 5 times begin
            define a as randomBetween(1, max)
            define b as randomBetween(1, max)
            myAskAndWait(a, b)
            declare c as integer
            define c as cast answer() to integer
            if not (c = a + b) then begin
                broadcast "Game Over"
                stop all
            end else begin
                define score as score + 1
            end
        end
        broadcast "Success"
    end
end

actor CheckMark is ScratchSprite begin

    script on startup do begin
        hide()
    end

    script on message "Success" () in "USER" do begin
        show()
        say("Great!")
    end

end

actor Cross is ScratchSprite begin

    script on startup do begin
        hide()
    end

    script on message "Game Over" () in "USER" do begin
        show()
        say("You lost. Sorry")
    end

end