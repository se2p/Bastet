program ExampleProgram

actor Stage is ScratchStage begin
    set attribute "x" to 10

    script on startup do begin
        if true then begin
            say "Hello World"
        end
    end
end
