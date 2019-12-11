program ExampleProgram

actor Stage is ScratchStage begin
    set attribute "x" to 10

    script on startup do begin
        if true then begin
            say "Hello"
        end else begin 
            say "Bye"
            if false then begin
                say "Foo"
            end
        end
        until 1 = 2 repeat begin
            say "Loop"
        end
        say "End"
    end
end
