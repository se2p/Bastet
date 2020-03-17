program Task9Program

actor Stage is ScratchStage begin
      sound  Plopp "83a9787d4cb6f3b7632b4ddfebf74367.wav"
      image  Buhnenbild1 "78d212878a6f0a2b3067aa2c8bca28e1.png"
      image  HintergrundManegeklein "d6aca145c741a1b12309267dcecdbd49.svg"

      declare volume as number
      declare layerOrder as number
      declare tempo as number
      declare videoTransparency as number
      declare videoState as string

      define volume as 100.0
      define layerOrder as 0.0
      define tempo as 60.0
      define videoTransparency as 50.0
      define videoState as "off"
  end

actor Pferd is ScratchSprite begin
      sound  Plopp "83a9787d4cb6f3b7632b4ddfebf74367.wav"
      image  Pferd "8b75453ccca4324df1d5aebb3b2191ee.svg"

      declare volume as number
      declare layerOrder as number
      declare visible as boolean
      declare x as number
      declare y as number
      declare size as number
      declare direction as number
      declare draggable as boolean
      declare rotationStyle as string

      define volume as 100.0
      define layerOrder as 1.0
      define visible as true
      define x as (0-23.0)
      define y as (0-30.0)
      define size as 50.0
      define direction as 90.0
      define draggable as false
      define rotationStyle as "all around"

      script on startup do begin
          repeat forever begin
              if touchingMousePointer() then begin
                      declare i as number
                      define i as 0
                      until i = 10 repeat begin
                          turnRight(36.0)
                      end
                  end
              else begin
                  define color as (62.0 + color)
              end
              wait 1 seconds
          end
      end
  end
