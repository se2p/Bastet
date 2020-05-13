grammar Scratch;

import Leila;

event :
    coreEvent # InCoreEvent
 |  'value' 'of' variable 'above' numExpr # VariableValueEvent
 |  'backdrop' 'switched' 'to' ident # BackdropChangeEvent
 |  key 'pressed' # KeyEvent
 |  'clicked' # ClickEvent
 ;

nonCtrlStmt :
  coreNonCtrlStmt
 |  spriteMotionStmt
 |  actorLookStmt
 |  spriteLookStmt
 |  actorSoundStmt
 |  penStmt ;

spriteMotionStmt  :
    'move'  numExpr  'steps' # MoveNumStepsStatement
 |  'turn' 'right'  numExpr 'degrees' # TurnRightDegreeStatement
 |  'turn' 'left'  numExpr 'degrees' # TurnLeftDegreeStatement
 |  'go' 'to'  position # GoToPositionStatement
 |  'glide'  numExpr  'secs' 'to' position # GlideNumSecsToStatement
 |  'point' 'in' 'direction' numExpr # PointInDirStatement
 |  'point' 'towards'  position # PointTowardsPosStatement
 |  'change' 'x' 'by'  numExpr # ChangeXbyStatement
 |  'change' 'y' 'by'  numExpr # ChangeYbyStatement
 |  'set' 'x' 'to'  numExpr # SetXtoStatement
 |  'set' 'y' 'to'  numExpr # SetYtoStatement
 |  'if' 'on' 'edge' 'bounce' # IfOnEdgeBounceStatement
 ;

actorLookStmt :
    'ask'  stringExpr  'and' 'wait' # AskAndWaitStatement
 |  'switch' 'backdrop' 'to'  elementChoice # SwitchBackdropToStatement
 |  'switch' 'backdrop' 'to'  elementChoice  'and' 'wait' # SwitchBackdropAndWaitStatement
 |  'clear' 'graphic' 'effects' # ClearGraphicEffectsStatement
 |  'change' 'graphic' 'effect' stringExpr 'by' numExpr # ChagenGraphicEffectsByStatement
 |  'set' 'graphic' 'effect' stringExpr 'to' numExpr # SetGraphicEffectToStatement
 |  'show' 'variable'  variable # ShowVariableStatement
 |  'hide' 'variable'  variable # HideVariableStatement
 ;

spriteLookStmt  :
    'show' # ShowSpriteStatement
 |  'hide' # HideSpriteStatement
 |  'say' stringExpr ('for' numExpr  'secs')? # SayTextForStatement
 |  'think' stringExpr ('for' numExpr  'secs')? # ThinkForStatement
 |  'switch' 'costume' 'to' elementChoice # SwitchCostumeStatement
 |  'change' 'size' 'by'  numExpr # ChagenSizeByStatement
 |  'set' 'size' 'to'  numExpr  'percent' # SetSizeToPercStatement
 |  'change' 'layer' 'by'  numExpr # ChagenLayerByStatement
 |  'go' 'to' 'layer'  numExpr # GotoLayerStatement
 |  'go' 'to' 'front' 'layer' # GotoFrontLayerStatement
 |  'go' 'to' 'back' 'layer' # GotoBackLayerStatement
 ;



actorSoundStmt  :
    'play' 'sound'  elementChoice  'until' 'done' # PlaySoundUntilStatement
 |  'start' 'sound'  elementChoice # StartSoundStatement
 |  'change' 'sound' 'effect' stringExpr 'by' numExpr # ChangeSoundEffectStatement
 |  'set' 'sound' 'effect' stringExpr 'to' numExpr # SetSoundEffectStatement
 |  'clear' 'sound' 'effects' # CleareSoundEffectsStatement
 |  'stop' 'all' 'sounds' # StopAllSoundsStatement
 ;

penStmt :
    'erase' 'all' # EraseAllStatement
 |  'stamp' # StampStatement
 |  'pen down' # PenDownStatement
 |  'pen up' # PenUpStatement
 |  'set' 'pen' 'color' color # SetPenColorStatement
 |  'set' 'pen' stringExpr 'to' numExpr # SetPenAttributeStatement
 |  'change' 'pen' stringExpr 'by' numExpr # ChangePenAttributeByStatement
 ;

stringExpr  :
    coreStringExpr # CoreStringExpression
 |  'username' # UsernameExpression
 ;

boolExpr  :
    coreBoolExpr # CoreBoolExpression
 |  'touching'  touchable # TouchingBoolExpression
 |  'color'  color  'touches'  color # ColorTouchesColorExpression
 |  'key'  key  'pressed' # KeyPressedExpression
 |  'mouse' 'down' # MouseDownExpression
 ;

numExpr  :
 coreNumExpr # CoreNumExpression
 |  'days' 'since' 'milenium' # DaysSinceMileniumExpression
 |  'current' timeComp # CurrentTimeCompExpression
 |  'distanceto' position # DistanceToExpression
 |  'mousex' # MouseXExpression
 |  'mousey' # MouseYExpression
 |  'loudness' # LoudnessExpression
 ;

touchable :
    'mousepointer' # TouchableMousePointer
 |  'edge' # TouchableEdge
 |  'sprite' stringExpr # TouchableSprite
 | color # TouchableColor
 ;

elementChoice :
   'next' # NextElement
 | 'prev' # PrevElement
 | 'random' # RandomElement
 | 'with_number' numExpr # NumberedElement
 | 'with_name' stringExpr # NamedElement
 ;

timeComp :
    'year' # YearComp
 |  'month' # MonthComp
 |  'date' # DateComp
 |  'day' 'of' 'week' # WeekdayComp
 |  'hour' # HourComp
 |  'minute' # MinuteComp
 |  'second' # SecondComp
 ;

position  :
    'pivot_of' stringExpr # PivotPosition
 |  'random_pos' # RandomPosition
 |  'mouse_pos' # MousePosition
 |  '('  numExpr ',' numExpr  ')' # ExplicitPosition
 ;

