grammar Scratch;

import ScratchCore;

event :
    coreEvent # InCoreEvent
 |  'value' 'of' variable 'above' numExpr # VariableValueEvent
 |  'backdrop' 'switched' 'to' Ident # BackdropChangeEvent
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
 |  'say' stringExpr ('for' numExpr  'secs')? # SayForStatement
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
 |  'change' 'pen' stringExpr 'by' numExpr # ChangePenAttributeByStement
 ;

stringExpr  :
    coreStringExpr
 |  'username' ;

boolExpr  :
    coreBoolExpr
 |  'touching'  touchable
 |  'color'  color  'touches'  color
 |  'key'  key  'pressed'
 |  'mouse' 'down' ;

numExpr  :
 coreNumExpr
 |  'timer'
 |  'days' 'since' 'milenium'
 |  'current' timeComp
 |  'distanceto' position
 |  'mousex'
 |  'mousey'
 |  'loudness';

touchable :
 'mousepointer'  |  'edge'  |  'sprite' stringExpr | color ;

elementChoice :
   'next'
 | 'prev'
 | 'random'
 | 'with_number' numExpr
 | 'with_name' stringExpr
 ;

timeComp :
    'year'
 |  'month'
 |  'date'
 |  'day' 'of' 'week'
 |  'hour'
 |  'minute'
 |  'second'
 ;

position  :
    'pivot_of' stringExpr
 |  'random_pos'
 |  'mouse_pos'
 |  '('  numExpr ',' numExpr  ')'
 ;

