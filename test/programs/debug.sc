 program Small
 actor Stage is ScratchStage begin 
     declare Punkte as int
     declare Zeit as int
     define volume as 100
     define layerOrder as 0
     define tempo as 60
     define videoTransparency as 50
     define videoState as "on"
     define Stage.Punkte as 0
     define Stage.Zeit as 29
     script on startup do begin 
         define Stage.Zeit as 30
         define Stage.Punkte as 0
         until (cast Stage.Zeit to string  = 0) repeat begin 
             waitSeconds(1)
             define Stage.Zeit as Stage.Zeit + (0-1)
         end 
     end 
 end 
 actor Bowl is ScratchSprite begin 
     define volume as 100
     define layerOrder as 1
     define visible as true 
     define x as 0
     define y as (0-145)
     define size as 125
     define direction as 90
     define draggable as false 
     define rotationStyle as "all around"
     script on startup do begin 
         goTo(0, (0-145))
         wait until (cast Stage.Zeit to string  = 30)
         until (cast Stage.Zeit to string  = 0) repeat begin 
             if keyPressedByCode(39) then begin 
                 moveSteps(10)
             end 
             if keyPressedByCode(37) then begin 
                 moveSteps((0-10))
             end 
         end 
         sayTextFor("Ende!", 1)
         stop all 
     end 
 end 
 actor Apple is ScratchSprite begin 
     define volume as 100
     define layerOrder as 2
     define visible as true 
     define x as (0-124)
     define y as (0-60)
     define size as 50
     define direction as 90
     define draggable as false 
     define rotationStyle as "all around"
     script on startup do begin 
         define size as 50
         goToRandomPosition() 
         define y as 170
         until (cast Stage.Zeit to string  = 0) repeat begin 
             define y as y + (0-5)
             if touchingObject(locate actor "Bowl") then begin 
                 define Stage.Punkte as Stage.Punkte + 5
                 hide()
                 goToRandomPosition() 
                 define y as 170
                 show()
             end 
             if touchingColor(rgb(255, 0, 0)) then begin 
                 sayTextFor("Game over!", 1)
                 stop all 
             end 
         end 
     end 
 end 
 actor Bananas is ScratchSprite begin 
     define volume as 100
     define layerOrder as 3
     define visible as true 
     define x as 173
     define y as 58
     define size as 50
     define direction as 90
     define draggable as false 
     define rotationStyle as "all around"
     script on startup do begin 
         hide()
         define size as 50
         goToRandomPosition() 
         define y as 170
         waitSeconds(1)
         until (cast Stage.Zeit to string  = 0) repeat begin 
             show()
             define y as y + (0-7)
             if touchingObject(locate actor "Bowl") then begin 
                 define Stage.Punkte as Stage.Punkte + 8
                 hide()
                 goToRandomPosition() 
                 define y as 170
                 show()
             end 
             if touchingColor(rgb(255, 0, 0)) then begin 
                 define Stage.Punkte as Stage.Punkte + (0-8)
                 sayTextFor("-8", 1)
                 hide()
                 goToRandomPosition() 
                 define y as 170
                 waitSeconds(1)
                 show()
             end 
         end 
     end 
 end 