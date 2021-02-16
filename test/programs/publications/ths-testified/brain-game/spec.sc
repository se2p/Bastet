program Spec

actor ProgramObserver is Observer begin

    declare io as actor
    declare game as actor
    declare yes as actor
    declare no as actor

    declare lastScore as integer
    declare correct as integer
    declare questions as integer
    declare lastAskActive as boolean

    declare initDone as boolean

    declare state as integer
    declare stateEntered as integer

    declare lastYesVisible as boolean
    declare lastNoVisible as boolean

    define atomic checkBehaviorSatisfied () begin
        declare score as integer
        define score as cast attribute "score" of game to integer

        declare askActive as boolean
        define askActive as cast attribute "askActive" of io to boolean

        declare yesVisible as boolean
        define yesVisible as cast attribute "visible" of yes to boolean
        declare noVisible as boolean
        define noVisible as cast attribute "visible" of no to boolean

        if state = 0 then begin
            declare questionAsked as boolean
            define questionAsked as not lastAskActive and askActive

            if questionAsked then begin
                define initDone as true
                define questions as questions + 1

                // If the first question is asked, the score must be zero
                if questions = 1 then begin
                    if not (score = 0) then begin
                        _RUNTIME_signalFailure("The score must have been initialized with 0")
                    end
                end

                define state as 1
                define stateEntered as _RUNTIME_micros()
            end
        end else if state = 1 then begin
            // The question was asked. Waiting for the answer and checking it
            declare answerToQuestionGiven as boolean
            define answerToQuestionGiven as not askActive and lastAskActive

            if answerToQuestionGiven then begin
                declare x as integer
                declare y as integer
                define x as cast attribute "a" of game to integer
                define y as cast attribute "b" of game to integer

                declare expected as integer
                define expected as x + y

                declare entered as integer
                define entered as cast attribute "integerAnswer" of io to integer

                if expected = entered then begin
                    define correct as correct + 1
                    if correct = 3 then begin
                        define state as 2
                        define stateEntered as _RUNTIME_micros()
                    end
                end else begin
                    define state as 3
                    define stateEntered as _RUNTIME_micros()
                end
            end
        end else if state = 2 then begin
            // Reaction after ALL questions were answered correctly, expected within the next 100msec
            declare noShown as boolean
            define noShown as noVisible and not lastNoVisible

            declare yesShown as boolean
            define yesShown as yesVisible and not lastYesVisible

            if _RUNTIME_micros() - stateEntered > 200000 then begin
                _RUNTIME_signalFailure("Expected the sprite for the CORRECT answer to be shown within 200msec.")
            end else begin
                if yesShown then begin
                    define state as 0
                    define stateEntered as _RUNTIME_micros()
                end else if noShown then begin
                    _RUNTIME_signalFailure("Expected the sprite for the CORRECT answer to be shown---not the sprite for the wrong answer.")
                end
            end
        end else if state = 3 then begin
            // Reaction to the WRONG answer expected within the next 200msec
            declare noShown as boolean
            define noShown as noVisible and not lastNoVisible

            declare yesShown as boolean
            define yesShown as yesVisible and not lastYesVisible

            if _RUNTIME_micros() - stateEntered > 200000 then begin
                _RUNTIME_signalFailure("Expected the sprite for the WRONG answer to be shown within 200msec.")
            end else begin
                if noShown then begin
                    define state as 0
                    define stateEntered as _RUNTIME_micros()
                end else if yesShown then begin
                    _RUNTIME_signalFailure("Expected the sprite for the WRONG answer to be shown---not the sprite for the correct answer.")
                end
            end
        end

        declare correctAnswerGiven as boolean
        declare wrongAnswerGiven as boolean

        if initDone then begin
            if score < lastScore then begin
                _RUNTIME_signalFailure("The score must not decrease")
            end
        end

        define lastScore as score
        define lastAskActive as askActive
        define lastYesVisible as yesVisible
        define lastNoVisible as noVisible
    end

    script on bootstrap finished do begin
        define game as locate actor "Game"
        define yes as locate actor "CheckMark"
        define no as locate actor "Cross"
        define io as locate actor "IOActor"

        define initDone as false

        define lastNoVisible as false
        define lastYesVisible as false
        define lastAskActive as false
        define lastScore as cast attribute "score" of game to int

        define correct as 0
        define questions as 0
        define state as 0
        define stateEntered as _RUNTIME_micros()

        checkBehaviorSatisfied() // First specification check (base condition)
    end

    script on statement finished do begin
        checkBehaviorSatisfied() // The actual specification check
    end
end