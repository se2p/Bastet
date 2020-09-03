program Task9Program

actor Stage is ScratchStage begin
      image  Buhnenbild1 "2.png"
      image  HintergrundManegeklein "3.svg"
end

actor Pferd is ScratchSprite begin
      image  Pferd "1.svg"

      define x as (0-23)
      define y as (0-30)
      define size as 50
      define direction as 90

      script on startup do begin
          repeat forever begin
              if touchingMousePointer() then begin
                  declare i as int
                  define i as 0
                  until i = 10 repeat begin
                      turnRight(36.0)
                      define i as i + 1
                  end
              end else begin
                  define color_effect_value as (62.0 + color_effect_value)
              end
              wait 1 seconds
          end
      end
  end
